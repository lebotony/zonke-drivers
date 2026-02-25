# Backend Architecture Specification

**Purpose**: This document defines strict backend architecture and coding methodology conventions for future Phoenix/Elixir projects. It is NOT tied to any specific business domain.

**Critical Constraint**: All examples use generic placeholder names (e.g., `Banana`, `Apple`) and contain NO real schema names, modules, or business logic from any actual project.

---

## Table of Contents

1. [Folder & Module Structure](#1-folder--module-structure)
2. [Schema Conventions (Short UUID IDs)](#2-schema-conventions-short-uuid-ids)
3. [Custom Schema Module (Mandatory)](#3-custom-schema-module-mandatory)
4. [Indexing Strategy (Intentional Optimization Only)](#4-indexing-strategy-intentional-optimization-only)
5. [Param Transformation (Authentication Controller)](#5-param-transformation-authentication-controller)
6. [Search & Filtering Logic (Enum.reduce Rule)](#6-search--filtering-logic-enumreduce-rule)
7. [Business Formatting Functions (Mandatory Pattern)](#7-business-formatting-functions-mandatory-pattern)
8. [Pagination (Dedicated Helper Only)](#8-pagination-dedicated-helper-only)
9. [Rendering & Response Flow](#9-rendering--response-flow)
10. [Controllers](#10-controllers)
11. [Early-Stage Imports](#11-early-stage-imports)
12. [Router Structure](#12-router-structure)
13. [Channels](#13-channels)
14. [with vs case](#14-with-vs-case)
15. [Error Handling](#15-error-handling)

---

## 1. Folder & Module Structure

### 1.1 Core Principle

**Separation of Concerns**: Business logic, schemas, queries, and JSON rendering are strictly separated into dedicated files and folders.

### 1.2 Structure Pattern

Using `Banana` as a generic example:

```
backend/
  lib/
    backend/
      bananas/
        banana/
          banana.ex              # Schema definition
        queries/
          banana_by.ex           # Query composition functions
        bananas.ex               # Business context module
    backend_web/
      controllers/
        api/
          bananas/
            banana_controller.ex # Controller (thin layer)
      json/
        bananas/
          banana_json.ex         # JSON rendering
```

### 1.3 Module Responsibilities

| Module | Responsibility |
|--------|----------------|
| `Banana` (schema) | Defines struct, fields, associations, changeset validation |
| `BananaBy` (queries) | Provides reusable query composition functions (`base_query/0`, `by_id/2`, `by_active_status/1`) |
| `Bananas` (context) | Business logic, orchestration, calls to Repo, formatting |
| `BananaController` | Thin layer: authorization, `with` chains, delegates to context, calls `render/3` |
| `BananaJSON` | Transforms structs into JSON-serializable maps |

### 1.4 Example: Banana Schema

```elixir
# backend/lib/backend/bananas/banana/banana.ex
defmodule Backend.Bananas.Banana do
  use Backend, :model

  alias Backend.Accounts.User

  @required_fields [:user_id]
  @optional_fields [:colour, :ripeness, :weight, :active]
  @all_fields @required_fields ++ @optional_fields

  schema "bananas" do
    field(:colour, :string)
    field(:ripeness, :integer)
    field(:weight, :float)
    field(:active, :boolean, default: false)

    # Virtual fields for computed data
    field(:rank_value, :decimal, virtual: true)
    field(:owner_name, :string, virtual: true)

    belongs_to(:user, User)

    timestamps()
  end

  def changeset(struct, params) do
    struct
    |> cast(params, @all_fields)
    |> validate_required(@required_fields)
    |> assoc_constraint(:user)
  end
end
```

### 1.5 Example: BananaBy Queries Module

```elixir
# backend/lib/backend/bananas/queries/banana_by.ex
defmodule Backend.Bananas.Queries.BananaBy do
  alias Backend.Bananas.Banana
  import Ecto.Query

  def base_query do
    from(b in Banana, as: :banana)
  end

  def by_id(query, id) do
    where(query, [banana: b], b.id == ^id)
  end

  def by_user(query, user_id) do
    where(query, [banana: b], b.user_id == ^user_id)
  end

  def by_active_status(query) do
    where(query, [banana: b], b.active == true)
  end
end
```

### 1.6 Example: Bananas Context Module

```elixir
# backend/lib/backend/bananas/bananas.ex
defmodule Backend.Bananas.Bananas do
  alias Backend.{Repo, PaginateHelper}
  alias Backend.Bananas.{Banana, Queries.BananaBy}
  alias Backend.Accounts.User

  import Ecto.Query

  def create(params, %{user_id: user_id}) do
    params = Map.put(params, :user_id, user_id)

    %Banana{}
    |> Banana.changeset(params)
    |> Repo.insert()
  end

  def get_banana(id) do
    BananaBy.base_query()
    |> BananaBy.by_id(id)
    |> Repo.one()
    |> format_banana()
  end

  def get_bananas(params, %{user_id: user_id}, :public) do
    data =
      BananaBy.base_query()
      |> BananaBy.by_active_status()
      |> add_extra_fields()
      |> build_search(params)
      |> build_sort(params)
      |> Repo.paginate(PaginateHelper.prep_params(params))

    {:ok, data, PaginateHelper.prep_paginate(data)}
  end

  defp build_search(query, params) do
    filters = Map.get(params, :filters, %{})

    Enum.reduce(filters, query, fn
      {:colour, value}, query when is_binary(value) and value != "" ->
        where(query, [banana: b], b.colour == ^value)

      {:ripeness_range, [min, max]}, query ->
        min = String.to_integer(min)
        max = String.to_integer(max)
        where(query, [banana: b], b.ripeness >= ^min and b.ripeness <= ^max)

      _, query ->
        query
    end)
  end

  defp build_sort(query, params) do
    order_by_param = Map.get(params, :order_by, %{by: :inserted_at, direction: :desc})
    criteria = Map.get(order_by_param, :by)
    direction = Map.get(order_by_param, :direction)

    case criteria do
      :ripeness ->
        order_by(query, [banana: b], [{^direction, b.ripeness}, {:asc, b.id}])

      _ ->
        order_by(query, [banana: b], [{^direction, b.inserted_at}, {:asc, b.id}])
    end
  end

  defp add_extra_fields(query) do
    query
    |> join(:inner, [banana: b], u in assoc(b, :user), as: :user)
    |> select_merge([banana: b, user: u], %{
      b | owner_name: u.first_name
    })
  end

  # MANDATORY: Format function at bottom of file
  defp format_banana(%Banana{} = banana), do: {:ok, banana}
  defp format_banana(nil), do: {:error, :not_found}
end
```

---

## 2. Schema Conventions (Short UUID IDs)

### 2.1 Core Principle

**All schemas MUST use Short UUID as primary keys**, not auto-incrementing integers.

### 2.2 Short UUID Rationale

- **Security**: Non-sequential IDs prevent enumeration attacks
- **Distribution**: Works across distributed systems
- **Readability**: Shorter than standard UUIDs (22 chars vs 36 chars)

### 2.3 Schema Pattern

All schemas use a custom `Backend.Schema` module:

```elixir
# backend/lib/backend/bananas/banana/banana.ex
defmodule Backend.Bananas.Banana do
  use Backend, :model  # This invokes the custom schema module

  schema "bananas" do
    # fields...
  end
end
```

**NEVER** use `use Ecto.Schema` directly in domain schemas.

---

## 3. Custom Schema Module (Mandatory)

### 3.1 Core Principle

**Direct use of `Ecto.Schema` is forbidden.** All schemas MUST use the custom `Backend.Schema` module.

### 3.2 Custom Schema Implementation

```elixir
# backend/lib/backend/schema.ex
defmodule Backend.Schema do
  defmacro __using__(_) do
    quote do
      use Ecto.Schema
      @primary_key {:id, Ecto.ShortUUID, autogenerate: true}
      @foreign_key_type Ecto.ShortUUID
    end
  end
end
```

### 3.3 Backend Module Integration

```elixir
# backend/lib/backend.ex
defmodule Backend do
  def model do
    quote do
      use Backend.Schema
      import Ecto.Changeset
      import Ecto.Query
    end
  end

  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
```

### 3.4 Usage in Schemas

```elixir
defmodule Backend.Bananas.Banana do
  use Backend, :model  # Invokes Backend.model/0, which uses Backend.Schema

  schema "bananas" do
    # Schema automatically has:
    # @primary_key {:id, Ecto.ShortUUID, autogenerate: true}
    # @foreign_key_type Ecto.ShortUUID
  end
end
```

### 3.5 Why This Matters

- **Consistency**: All schemas use the same ID strategy
- **Enforcement**: Direct Ecto.Schema usage is prevented by convention
- **Maintainability**: Changing ID strategy requires updating only one file

---

## 4. Indexing Strategy (Intentional Optimization Only)

### 4.1 Core Principle

**Do NOT create indexes automatically.** Indexes are added ONLY when justified by real query patterns and measured performance issues.

### 4.2 Anti-Patterns

❌ **DO NOT** do this:

```elixir
# WRONG: Adding indexes "just in case"
create index(:bananas, [:inserted_at])
create index(:bananas, [:active])
create index(:bananas, [:colour])
```

### 4.3 Correct Approach

✅ **DO** this:

1. **Measure first**: Identify slow queries
2. **Analyze query patterns**: Understand which fields are used in WHERE, JOIN, ORDER BY
3. **Evaluate trade-offs**: Consider RAM usage, write performance impact
4. **Add targeted indexes**: Create indexes for proven bottlenecks only

```elixir
# CORRECT: Index based on measured query pattern
# Query: WHERE user_id = ? AND active = true ORDER BY inserted_at DESC
create index(:bananas, [:user_id, :active])
```

### 4.4 Guidelines

- **Avoid indexing low-cardinality fields** (e.g., boolean flags) unless paired with high-cardinality fields
- **Avoid indexing rarely queried fields** (e.g., `inserted_at` unless it's frequently in ORDER BY with WHERE filters)
- **Understand the cost**: Each index consumes RAM and slows down writes
- **Composite indexes**: Order matters! Place high-selectivity fields first

### 4.5 Example Decision Process

**Scenario**: Query logs show slow performance on:
```sql
SELECT * FROM bananas WHERE user_id = ? AND active = true ORDER BY ripeness DESC
```

**Analysis**:
- `user_id`: High cardinality, used in WHERE
- `active`: Low cardinality (boolean), but used in WHERE
- `ripeness`: Used in ORDER BY

**Decision**: Create composite index `(user_id, active, ripeness)` because the query filters on both fields and orders by the third.

**Implementation**:
```elixir
create index(:bananas, [:user_id, :active, :ripeness])
```

---

## 5. Param Transformation (Authentication Controller)

### 5.1 Core Principle

**String keys from the router are automatically converted to atom keys by a plug BEFORE reaching business logic.** All downstream functions (`build_search`, context modules) expect and use atom keys.

### 5.2 Transformation Mechanism

The transformation occurs via the `BetterParams` plug configured in the controller definition:

```elixir
# backend/lib/backend_web.ex
defmodule BackendWeb do
  def controller do
    quote do
      use Phoenix.Controller,
        formats: [:html, :json],
        layouts: [html: BackendWeb.Layouts]

      import Plug.Conn
      import BackendWeb.Gettext

      # THIS PLUG CONVERTS STRING KEYS TO ATOM KEYS
      plug(BetterParams, drop_string_keys: true)

      unquote(verified_routes())
    end
  end
end
```

### 5.3 What BetterParams Does

- **Converts all string keys to atoms**: `"colour"` becomes `:colour`
- **Drops original string keys**: `drop_string_keys: true` ensures only atom keys remain
- **Runs before controller actions**: Transformation is complete before business logic executes

### 5.4 Impact on Downstream Code

Because the transformation happens at the controller layer:

✅ **Context functions expect atom keys**:
```elixir
def build_search(query, params) do
  filters = Map.get(params, :filters, %{})  # :filters, not "filters"

  Enum.reduce(filters, query, fn
    {:colour, value}, query -> ...  # :colour, not "colour"
    {:ripeness_range, [min, max]}, query -> ...
    _, query -> query
  end)
end
```

✅ **Controllers pass transformed params**:
```elixir
def index(conn, params, session) do
  # params already has atom keys here
  with {:ok, bananas, paginate} <- Bananas.get_bananas(params, session) do
    render(conn, :index, %{bananas: bananas, paginate: paginate})
  end
end
```

### 5.5 Manual Transformation (Rare Cases)

In WebSocket channels or other non-controller contexts, you may need to manually transform params:

```elixir
# backend/lib/backend/helpers/atom_keys_helper.ex
defmodule Backend.AtomKeysHelper do
  def string_keys_to_atoms(map) do
    for {k, v} <- map, into: %{} do
      {String.to_existing_atom(k), v}
    end
  end
end
```

**Usage in channels**:
```elixir
def handle_in("create_banana", %{"params" => params}, socket) do
  atomized_params = AtomKeysHelper.string_keys_to_atoms(params)
  # Now atomized_params has atom keys
end
```

### 5.6 Critical Takeaway

- **String-to-atom conversion happens ONCE at the entry point** (controller or channel)
- **All business logic assumes atom keys**
- **Never mix string and atom keys in the same map**

---

## 6. Search & Filtering Logic (Enum.reduce Rule)

### 6.1 Core Principle

**All dynamic filtering MUST use `Enum.reduce`.** This pattern ensures composability, predictability, and avoids branching explosion.

### 6.2 Anti-Patterns

❌ **DO NOT** use nested conditionals:

```elixir
# WRONG: Nested if/cond creates branching complexity
defp build_search(query, params) do
  filters = Map.get(params, :filters, %{})

  query =
    if Map.has_key?(filters, :colour) do
      where(query, [banana: b], b.colour == ^filters.colour)
    else
      query
    end

  query =
    if Map.has_key?(filters, :ripeness_range) do
      [min, max] = filters.ripeness_range
      where(query, [banana: b], b.ripeness >= ^min and b.ripeness <= ^max)
    else
      query
    end

  query
end
```

❌ **DO NOT** use repetitive if chains:

```elixir
# WRONG: Repetitive and hard to maintain
if filters.colour, do: query |> where(...), else: query
if filters.ripeness, do: query |> where(...), else: query
if filters.weight, do: query |> where(...), else: query
```

### 6.3 Correct Pattern: Enum.reduce

✅ **DO** use `Enum.reduce` for all filtering:

```elixir
defp build_search(query, params) do
  filters = Map.get(params, :filters, %{})

  Enum.reduce(filters, query, fn
    {:colour, value}, query when is_binary(value) and value != "" ->
      where(query, [banana: b], b.colour == ^value)

    {:ripeness_range, [min, max]}, query when min != "0" or max != "100" ->
      min = String.to_integer(min)
      max = String.to_integer(max)
      where(query, [banana: b], b.ripeness >= ^min and b.ripeness <= ^max)

    {:weight_min, value}, query when is_integer(value) and value > 0 ->
      where(query, [banana: b], b.weight >= ^value)

    {:tags, values}, query when is_list(values) ->
      where(query, [banana: b], fragment("? && ?", b.tags, ^values))

    # Catch-all: ignore unrecognized or empty filters
    _, query ->
      query
  end)
end
```

### 6.4 Why Enum.reduce?

| Benefit | Explanation |
|---------|-------------|
| **Composability** | Each filter independently transforms the query |
| **Predictability** | Order doesn't matter; all filters are applied |
| **Maintainability** | Adding a new filter = adding a new clause |
| **No branching explosion** | Flat structure, no nested ifs |
| **Guard clauses** | Each clause validates its own input |

### 6.5 Pattern Structure

```elixir
Enum.reduce(filters, initial_query, fn
  {filter_key, filter_value}, accumulated_query when guard_condition ->
    # Apply filter to accumulated_query
    where(accumulated_query, ...)

  _, accumulated_query ->
    # Ignore unrecognized filters
    accumulated_query
end)
```

### 6.6 Context-Level Filtering

The `build_search/2` pattern applies to **both**:
- Private functions in context modules (`defp build_search`)
- Public functions exposed for external use

Example:
```elixir
def get_public_bananas(params, session) do
  data =
    BananaBy.base_query()
    |> BananaBy.by_active_status()
    |> build_search(params)  # Uses Enum.reduce internally
    |> Repo.paginate(PaginateHelper.prep_params(params))

  {:ok, data, PaginateHelper.prep_paginate(data)}
end
```

### 6.7 Critical Takeaway

- **Always use `Enum.reduce` for dynamic filtering**
- **Never use nested conditionals or if chains**
- **Each filter clause is self-contained with guards**
- **Catch-all clause returns query unchanged**

---

## 7. Business Formatting Functions (Mandatory Pattern)

### 7.1 Core Principle

**Every business/context module MUST define a `format_<resource>/1` function at the bottom of the file.** This function standardizes return values for controllers.

### 7.2 Function Signature

```elixir
defp format_banana(%Banana{} = banana), do: {:ok, banana}
defp format_banana(nil), do: {:error, :not_found}
```

### 7.3 Purpose

The formatting function:
1. **Accepts the result** of a query or operation
2. **Returns standardized tuples**:
   - `{:ok, banana}` for successful results
   - `{:error, :not_found}` for missing data
3. **Ensures consistent controller behavior** (controllers rely on these tuples for `with` chains)

### 7.4 Example: Context Module with Formatting

```elixir
defmodule Backend.Bananas.Bananas do
  alias Backend.{Repo, PaginateHelper}
  alias Backend.Bananas.{Banana, Queries.BananaBy}

  import Ecto.Query

  def get_banana(id) do
    BananaBy.base_query()
    |> BananaBy.by_id(id)
    |> Repo.one()
    |> format_banana()  # <-- MANDATORY
  end

  def get_banana(id, :public) do
    BananaBy.base_query()
    |> BananaBy.by_id(id)
    |> BananaBy.by_active_status()
    |> Repo.one()
    |> format_banana()  # <-- MANDATORY
  end

  def create(params, %{user_id: user_id}) do
    %Banana{}
    |> Banana.changeset(Map.put(params, :user_id, user_id))
    |> Repo.insert()
    # Note: Repo.insert already returns {:ok, banana} | {:error, changeset}
    # No formatting needed here
  end

  # MANDATORY: Format function at bottom of file
  defp format_banana(%Banana{} = banana), do: {:ok, banana}
  defp format_banana(nil), do: {:error, :not_found}
end
```

### 7.5 Why This Matters

**Without formatting**:
```elixir
def show(conn, %{id: id}, session) do
  banana = Bananas.get_banana(id)  # Returns %Banana{} or nil

  # Controller must handle both cases manually
  case banana do
    %Banana{} = banana -> render(conn, :show, banana: banana)
    nil -> conn |> put_status(:not_found) |> json(%{error: "Not found"})
  end
end
```

**With formatting**:
```elixir
def show(conn, %{id: id}, session) do
  with {:ok, banana} <- Bananas.get_banana(id) do
    render(conn, :show, banana: banana)
  end
  # AuthenticatedController handles {:error, :not_found} automatically
end
```

### 7.6 Location Convention

- **Format functions ALWAYS live at the bottom of the business module**
- **Named consistently**: `format_<resource>/1`
- **Private**: Use `defp`, not `def`

### 7.7 Variations for Collections

For functions returning lists or paginated data, formatting may differ:

```elixir
def get_bananas(params, session) do
  data =
    BananaBy.base_query()
    |> Repo.paginate(PaginateHelper.prep_params(params))

  {:ok, data, PaginateHelper.prep_paginate(data)}
  # Returns tuple with pagination metadata
end
```

### 7.8 Critical Takeaway

- **ALL business modules MUST implement `format_<resource>/1`**
- **Controllers rely on formatted `{:ok, ...}` | `{:error, ...}` responses**
- **Format functions standardize error handling across the application**

---

## 8. Pagination (Dedicated Helper Only)

### 8.1 Core Principle

**Context functions NEVER calculate pagination logic directly.** All pagination logic lives in a dedicated helper module.

### 8.2 Helper Module Structure

```elixir
# backend/lib/backend/helpers/paginate_helper.ex
defmodule Backend.PaginateHelper do
  @doc """
  Prepare parameters for scrivener_ecto pagination library.
  Converts params to atom keys and validates values.
  """
  def prep_params(params) do
    per_page = Map.get(params, :per_page, Map.get(params, "per_page", 5))
    final_per_page = if is_binary(per_page), do: String.to_integer(per_page), else: per_page

    %{
      page: Map.get(params, :page, Map.get(params, "page", 1)),
      page_size: Kernel.min(final_per_page, 100)  # Cap at 100
    }
  end

  @doc """
  Prepare standardized pagination response from scrivener_ecto result.
  """
  def prep_paginate(data) do
    %{
      page: data.page_number,
      per_page: data.page_size,
      max_page: data.total_pages,
      total_count: data.total_entries
    }
  end
end
```

### 8.3 Usage in Context Modules

```elixir
defmodule Backend.Bananas.Bananas do
  alias Backend.{Repo, PaginateHelper}

  def get_bananas(params, session) do
    data =
      BananaBy.base_query()
      |> BananaBy.by_user(session.user_id)
      |> Repo.paginate(PaginateHelper.prep_params(params))  # <-- Helper

    {:ok, data, PaginateHelper.prep_paginate(data)}  # <-- Helper
  end
end
```

### 8.4 Why Delegation?

| Benefit | Explanation |
|---------|-------------|
| **Centralized logic** | Pagination calculation in one place |
| **Consistency** | All endpoints use same pagination format |
| **Testing** | Test pagination logic once, reuse everywhere |
| **Context simplicity** | Contexts focus on business logic, not pagination math |

### 8.5 Response Format

The helper produces a standardized pagination response:

```json
{
  "data": [...],
  "paginate": {
    "page": 1,
    "per_page": 10,
    "max_page": 5,
    "total_count": 47
  }
}
```

### 8.6 Critical Takeaway

- **Never calculate `limit`, `offset`, or `total` manually in context functions**
- **Always delegate to `PaginateHelper.prep_params/1` and `PaginateHelper.prep_paginate/1`**
- **Context modules return `{:ok, data, paginate_map}` for paginated results**

---

## 9. Rendering & Response Flow

### 9.1 Core Principle

The rendering flow is **strictly linear** and **explicitly separated** across layers.

### 9.2 Flow Diagram

```
┌─────────────┐
│   Context   │  Returns {:ok, %Banana{}} or {:error, :not_found}
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ format_*    │  Standardizes return tuples
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Controller  │  Calls render(conn, :show, banana: banana)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ render/3    │  Phoenix resolves JSON module from controller name
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ JSON Module │  Transforms struct to map
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Response   │  JSON sent to client
└─────────────┘
```

### 9.3 Example: Full Flow

#### Step 1: Context Returns Formatted Result

```elixir
# backend/lib/backend/bananas/bananas.ex
def get_banana(id) do
  BananaBy.base_query()
  |> BananaBy.by_id(id)
  |> Repo.one()
  |> format_banana()  # Returns {:ok, %Banana{}} or {:error, :not_found}
end

defp format_banana(%Banana{} = banana), do: {:ok, banana}
defp format_banana(nil), do: {:error, :not_found}
```

#### Step 2: Controller Uses render/3

```elixir
# backend/lib/backend_web/controllers/api/bananas/banana_controller.ex
defmodule BackendWeb.Bananas.BananaController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController

  alias Backend.Bananas.Bananas

  def show(conn, %{id: id}, session) do
    with {:ok, banana} <- Bananas.get_banana(id) do
      # NO aliasing of JSON module needed!
      render(conn, :show, banana: banana)
    end
  end
end
```

#### Step 3: Phoenix Resolves JSON Module

Phoenix automatically resolves `BackendWeb.Bananas.BananaJSON` from the controller name:
- Controller: `BackendWeb.Bananas.BananaController`
- JSON module: `BackendWeb.Bananas.BananaJSON`
- Function: `show/1`

#### Step 4: JSON Module Transforms Data

```elixir
# backend/lib/backend_web/json/bananas/banana_json.ex
defmodule BackendWeb.Bananas.BananaJSON do
  def show(%{banana: banana}) do
    %{
      id: banana.id,
      colour: banana.colour,
      ripeness: banana.ripeness,
      weight: banana.weight,
      active: banana.active,
      inserted_at: banana.inserted_at,
      updated_at: banana.updated_at
    }
  end
end
```

### 9.4 Key Points

- **Controllers call `render(conn, :show, banana: banana)`**
- **NO explicit JSON module aliasing required**
- **Phoenix resolves the JSON module automatically based on controller name**
- **JSON modules define `show/1`, `index/1`, etc. functions**

### 9.5 For Collections

```elixir
# Controller
def index(conn, params, session) do
  with {:ok, bananas, paginate} <- Bananas.get_bananas(params, session) do
    render(conn, :index, %{bananas: bananas, paginate: paginate})
  end
end

# JSON module
def index(%{bananas: bananas, paginate: paginate}) do
  %{
    paginate: paginate,
    data: for(banana <- bananas, do: show(%{banana: banana}))
  }
end
```

### 9.6 Critical Takeaway

- **Flow is strictly linear: Context → Controller → render/3 → JSON → Response**
- **Controllers NEVER manipulate data structures; they delegate to context and JSON**
- **JSON modules handle ALL serialization logic**

---

## 10. Controllers

### 10.1 Core Principle

**Controllers are thin.** They handle:
1. Authentication/authorization
2. `with` chains for success paths
3. Delegation to context functions
4. Calling `render/3` or `json/2`

### 10.2 Controller Structure

```elixir
defmodule BackendWeb.Bananas.BananaController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController  # Injects session into actions

  alias Backend.Bananas.Bananas

  def index(conn, params, session) do
    with {:ok, bananas, paginate} <- Bananas.get_bananas(params, session) do
      render(conn, :index, %{bananas: bananas, paginate: paginate})
    end
  end

  def show(conn, %{id: id}, session) do
    with {:ok, banana} <- Bananas.get_banana(id) do
      render(conn, :show, banana: banana)
    end
  end

  def create(conn, params, session) do
    with {:ok, banana} <- Bananas.create(params, session) do
      render(conn, :show, banana: banana)
    end
  end

  def update(conn, %{id: id} = params, session) do
    with {:ok, banana} <- Bananas.get_banana(id),
         {:ok, banana} <- Bananas.update(banana, params) do
      render(conn, :show, banana: banana)
    end
  end

  def delete(conn, %{id: id}, session) do
    with {:ok, banana} <- Bananas.get_banana(id),
         {:ok, _banana} <- Bananas.delete(banana) do
      json(conn, :ok)
    end
  end
end
```

### 10.3 AuthenticatedController Pattern

The `AuthenticatedController` injects the session into controller actions:

```elixir
# backend/lib/backend_web/controllers/authenticated_controller.ex
defmodule BackendWeb.AuthenticatedController do
  alias BackendWeb.AuthenticatedController, as: Controller

  defmacro __using__(_) do
    quote do
      def action(conn, _), do: Controller.__action__(__MODULE__, conn)
      defoverridable action: 2
    end
  end

  def __action__(controller, %{params: params} = conn) do
    # Extracts session from Guardian.Plug and passes it as third argument
    args = [conn, params, Guardian.Plug.current_resource(conn)]
    apply(controller, Phoenix.Controller.action_name(conn), args)
  end
end
```

**Result**: All controller actions receive `session` as the third argument automatically.

### 10.4 with vs case in Controllers

✅ **Use `with` for linear success paths**:
```elixir
def update(conn, %{id: id} = params, session) do
  with {:ok, banana} <- Bananas.get_banana(id),
       {:ok, banana} <- Bananas.update(banana, params) do
    render(conn, :show, banana: banana)
  end
end
```

❌ **DO NOT use `case` unless branching logic is required**:
```elixir
# WRONG: Unnecessary case nesting
def update(conn, %{id: id} = params, session) do
  case Bananas.get_banana(id) do
    {:ok, banana} ->
      case Bananas.update(banana, params) do
        {:ok, banana} -> render(conn, :show, banana: banana)
        {:error, error} -> {:error, error}
      end
    {:error, error} -> {:error, error}
  end
end
```

### 10.5 Error Handling

The `with` construct automatically propagates errors:
```elixir
with {:ok, banana} <- Bananas.get_banana(id),  # Returns {:error, :not_found}
     {:ok, banana} <- Bananas.update(banana, params) do
  render(conn, :show, banana: banana)
end
# If get_banana returns {:error, :not_found}, execution stops and error is returned
```

For custom error handling:
```elixir
def show(conn, %{id: id}, session) do
  with {:ok, banana} <- Bananas.get_banana(id) do
    render(conn, :show, banana: banana)
  else
    {:error, :not_found} ->
      conn
      |> put_status(:not_found)
      |> json(%{error: "Banana not found"})
  end
end
```

### 10.6 Critical Takeaway

- **Controllers are thin: authenticate, delegate, render**
- **Use `with` for linear success paths**
- **Use `AuthenticatedController` to inject session automatically**
- **Delegate ALL business logic to context modules**

---

## 11. Early-Stage Imports

### 11.1 Core Principle

**Import dependencies early at the top of context modules.** This avoids circular dependencies and makes the module structure clear.

### 11.2 Import Order

```elixir
defmodule Backend.Bananas.Bananas do
  # 1. Aliases for structs and modules
  alias Backend.{Repo, PaginateHelper}
  alias Backend.Bananas.{Banana, Queries.BananaBy}
  alias Backend.Accounts.User

  # 2. Import Ecto.Query for query composition
  import Ecto.Query

  # 3. Delegate authorization to policy module
  defdelegate authorize(action, resource, session), to: Policy

  # ... rest of module
end
```

### 11.3 Why Import Early?

| Benefit | Explanation |
|---------|-------------|
| **Prevents circular dependencies** | Early imports resolve before function definitions |
| **Clear dependencies** | Easy to see what the module depends on |
| **Convention** | All modules follow the same structure |

### 11.4 What to Import

- **Query modules**: `alias Backend.Bananas.Queries.BananaBy`
- **Pagination helper**: `alias Backend.PaginateHelper`
- **Ecto.Query**: `import Ecto.Query` (for `from`, `where`, `join`, etc.)
- **Policy modules**: `defdelegate authorize(...), to: Policy`

### 11.5 Critical Takeaway

- **Always import dependencies at the top of the module**
- **Follow consistent import order: alias, import, defdelegate**
- **This prevents circular dependency issues**

---

## 12. Router Structure

### 12.1 Core Principle

**Routes are organized by resource with scope grouping and pipelines.**

### 12.2 Example Router

```elixir
# backend/lib/backend_web/router.ex
defmodule BackendWeb.Router do
  use BackendWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :authorization do
    plug(Backend.Guardian.AuthAccessPipeline)
  end

  @except_path_actions [:new, :edit]  # No HTML actions in API

  scope "/api", BackendWeb do
    pipe_through(:api)

    # ===== Unauthenticated routes =====
    resources("/session/current_session", SessionController, only: [:create, :show, :delete])
    resources("/users/register_user", UserController, only: [:create])

    # ===== Authenticated routes =====
    scope "/" do
      pipe_through([:authorization])  # Requires JWT token

      scope("/bananas") do
        get("/public", Bananas.BananaController, :public_index)
        get("/user_banana", Bananas.BananaController, :fetch_user_banana)
      end

      resources("/bananas", Bananas.BananaController, except: @except_path_actions)
    end
  end
end
```

### 12.3 Pipeline Strategy

| Pipeline | Purpose |
|----------|---------|
| `:api` | Accepts JSON, base API configuration |
| `:authorization` | JWT authentication via Guardian |

### 12.4 Scope Grouping

```elixir
scope("/bananas") do
  get("/public", Bananas.BananaController, :public_index)
  post("/activate", Bananas.BananaController, :activate)
end

resources("/bananas", Bananas.BananaController, except: @except_path_actions)
```

**Result**:
- `GET /api/bananas/public` → `BananaController.public_index/3`
- `POST /api/bananas/activate` → `BananaController.activate/3`
- `GET /api/bananas` → `BananaController.index/3`
- `POST /api/bananas` → `BananaController.create/3`
- `GET /api/bananas/:id` → `BananaController.show/3`
- `PUT /api/bananas/:id` → `BananaController.update/3`
- `DELETE /api/bananas/:id` → `BananaController.delete/3`

### 12.5 Critical Takeaway

- **Use pipelines for cross-cutting concerns** (authentication, logging, etc.)
- **Use scope for resource grouping**
- **Use `resources` macro for RESTful routes**

---

## 13. Channels

### 13.1 Core Principle

**WebSocket channels follow a topic-based architecture with JWT authentication.**

### 13.2 Socket Configuration

```elixir
# backend/lib/backend_web/channels/user_socket.ex
defmodule BackendWeb.UserSocket do
  use Phoenix.Socket

  alias Backend.Guardian

  ## Channels
  channel("users:*", BackendWeb.UserChannel)
  channel("bananas:*", BackendWeb.BananaChannel)

  @impl true
  def connect(%{"token" => token}, socket, _connect_info) do
    with {:ok, claims} <- Guardian.decode_and_verify(token),
         {:ok, %{user_id: user_id}} <- Guardian.resource_from_claims(claims) do
      {:ok, assign(socket, :user_id, user_id)}
    else
      {:error, error} -> {:error, error}
      _ -> :error
    end
  end

  def connect(_params, _socket, _connect_info), do: :error

  @impl true
  def id(socket), do: "user_socket:#{socket.assigns.user_id}"
end
```

### 13.3 Channel Module

```elixir
# backend/lib/backend_web/channels/banana_channel.ex
defmodule BackendWeb.BananaChannel do
  use BackendWeb, :channel

  alias Backend.Bananas.Bananas
  alias BackendWeb.Bananas.BananaJSON

  def join("bananas:" <> banana_id, _params, socket) do
    user_id = socket.assigns.user_id

    with {:ok, banana} <- Bananas.get_banana(banana_id),
         :ok <- Bodyguard.permit(Bananas, :view, banana, %{user_id: user_id}) do
      {:ok, socket}
    else
      _ -> {:error, %{reason: "Unauthorized"}}
    end
  end

  def handle_in("update_banana", %{"params" => params}, socket) do
    user_id = socket.assigns.user_id
    atomized_params = AtomKeysHelper.string_keys_to_atoms(params)

    case Bananas.update_banana(atomized_params, user_id) do
      {:ok, banana} ->
        payload = BananaJSON.show(%{banana: banana})
        broadcast!(socket, "banana_updated", payload)
        {:reply, {:ok, payload}, socket}

      {:error, reason} ->
        {:reply, {:error, %{reason: reason}}, socket}
    end
  end
end
```

### 13.4 Topic Naming Convention

- `"users:#{user_id}"` - User-specific notifications
- `"bananas:#{banana_id}"` - Resource-specific updates
- `"bananas:public"` - Public broadcast channel

### 13.5 Authorization Flow

1. Client connects with JWT token
2. Socket extracts `user_id` from token
3. Channel `join/3` validates authorization
4. Socket assigns are available in `handle_in/3`

### 13.6 Critical Takeaway

- **All channels require JWT authentication in `connect/3`**
- **Topic naming follows `"resource:id"` pattern**
- **Authorization happens in `join/3` before allowing subscription**

---

## 14. with vs case

### 14.1 Core Principle

**Use `with` for linear success paths. Use `case` only for true branching logic.**

### 14.2 When to Use with

✅ **Linear success path**:
```elixir
def process_banana(id, params, session) do
  with {:ok, banana} <- Bananas.get_banana(id),
       :ok <- Bodyguard.permit(Bananas, :update, banana, session),
       {:ok, banana} <- Bananas.update(banana, params),
       {:ok, _notification} <- Notifications.notify_update(banana) do
    {:ok, banana}
  end
end
```

**Why `with`?**
- Each step depends on the previous success
- Execution stops at first error
- Clean, readable pipeline

### 14.3 When to Use case

✅ **True branching logic**:
```elixir
def get_banana_by_criteria(criteria) do
  case criteria do
    %{id: id} ->
      Bananas.get_banana_by_id(id)

    %{colour: colour, ripeness: ripeness} ->
      Bananas.get_banana_by_colour_and_ripeness(colour, ripeness)

    %{user_id: user_id} ->
      Bananas.get_user_bananas(user_id)

    _ ->
      {:error, :invalid_criteria}
  end
end
```

**Why `case`?**
- Multiple distinct paths based on input
- Not a linear success chain
- Each branch has different logic

### 14.4 Anti-Pattern: Nested case

❌ **DO NOT nest `case` statements**:
```elixir
# WRONG: Hard to read, deeply nested
def process_banana(id, params) do
  case Bananas.get_banana(id) do
    {:ok, banana} ->
      case Bananas.update(banana, params) do
        {:ok, banana} ->
          case Notifications.notify_update(banana) do
            {:ok, _} -> {:ok, banana}
            {:error, error} -> {:error, error}
          end
        {:error, error} -> {:error, error}
      end
    {:error, error} -> {:error, error}
  end
end
```

✅ **Use `with` instead**:
```elixir
def process_banana(id, params) do
  with {:ok, banana} <- Bananas.get_banana(id),
       {:ok, banana} <- Bananas.update(banana, params),
       {:ok, _notification} <- Notifications.notify_update(banana) do
    {:ok, banana}
  end
end
```

### 14.5 Critical Takeaway

- **`with` = linear success path (most common)**
- **`case` = branching logic (less common)**
- **Never nest `case` statements; use `with` instead**

---

## 15. Error Handling

### 15.1 Core Principle

**Error handling is standardized via tuples: `{:ok, result}` and `{:error, reason}`.**

### 15.2 Error Flow

```
┌─────────────┐
│   Context   │  Returns {:ok, data} or {:error, reason}
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Controller  │  Propagates errors via `with`
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Client    │  Receives JSON error response
└─────────────┘
```

### 15.3 Context Error Returns

```elixir
defmodule Backend.Bananas.Bananas do
  def get_banana(id) do
    BananaBy.base_query()
    |> BananaBy.by_id(id)
    |> Repo.one()
    |> format_banana()  # Returns {:ok, banana} or {:error, :not_found}
  end

  def create(params, session) do
    %Banana{}
    |> Banana.changeset(params)
    |> Repo.insert()  # Returns {:ok, banana} or {:error, changeset}
  end

  defp format_banana(%Banana{} = banana), do: {:ok, banana}
  defp format_banana(nil), do: {:error, :not_found}
end
```

### 15.4 Controller Error Handling

```elixir
defmodule BackendWeb.Bananas.BananaController do
  def show(conn, %{id: id}, session) do
    with {:ok, banana} <- Bananas.get_banana(id) do
      render(conn, :show, banana: banana)
    else
      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "Banana not found"})
    end
  end

  def create(conn, params, session) do
    with {:ok, banana} <- Bananas.create(params, session) do
      render(conn, :show, banana: banana)
    else
      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: translate_errors(changeset)})
    end
  end
end
```

### 15.5 JSON Error Responses

```elixir
# For simple errors
json(conn, %{error: "Resource not found"})

# For validation errors
json(conn, %{errors: %{
  colour: ["can't be blank"],
  ripeness: ["must be between 0 and 10"]
}})
```

### 15.6 Common Error Patterns

| Error | Context Return | HTTP Status | JSON Response |
|-------|----------------|-------------|---------------|
| Not found | `{:error, :not_found}` | 404 | `{"error": "Not found"}` |
| Validation failed | `{:error, %Changeset{}}` | 422 | `{"errors": {...}}` |
| Unauthorized | `{:error, :unauthorized}` | 403 | `{"error": "Unauthorized"}` |
| Server error | `{:error, reason}` | 500 | `{"error": "Internal server error"}` |

### 15.7 Changeset Error Translation

```elixir
defp translate_errors(changeset) do
  Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
    Enum.reduce(opts, msg, fn {key, value}, acc ->
      String.replace(acc, "%{#{key}}", to_string(value))
    end)
  end)
end
```

### 15.8 Critical Takeaway

- **All context functions return `{:ok, result}` or `{:error, reason}`**
- **Controllers use `with` to handle success path**
- **Errors are translated to HTTP status codes + JSON responses**
- **Standardization ensures predictable error handling across the app**

---

## Final Checklist

Before implementing backend code, verify:

- [ ] Folder structure follows `context/schema/schema.ex` + `context/queries/schema_by.ex` + `context/contexts.ex` pattern
- [ ] All schemas use `use Backend, :model` (NOT `use Ecto.Schema`)
- [ ] Custom Schema module enforces Short UUID for all primary keys
- [ ] No automatic indexes; indexes are added only for measured performance issues
- [ ] Param transformation via `BetterParams` plug converts string keys to atoms
- [ ] All filtering logic uses `Enum.reduce` (NO nested conditionals)
- [ ] Every context module has `format_<resource>/1` at the bottom
- [ ] Pagination uses `PaginateHelper.prep_params/1` and `PaginateHelper.prep_paginate/1`
- [ ] Rendering flow: Context → Controller → `render/3` → JSON module
- [ ] Controllers are thin; use `with` for success chains
- [ ] Early-stage imports at top of context modules
- [ ] Router uses pipelines and scope grouping
- [ ] Channels authenticate via JWT in `connect/3`
- [ ] Use `with` for linear paths, `case` for branching only
- [ ] Error handling via `{:ok, result}` | `{:error, reason}` tuples

---

**End of Backend Architecture Specification**
