# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Audience: **LLM code assistants** (Claude Code, ChatGPT, etc.) working on this repo.

- Read and obey this file before changing any code.
- **Never** include `CLAUDE.md` in feature PRs.
- Update `CLAUDE.md` only in dedicated docs PRs (no mixed code+doc PRs).

---

## 1. Instruction Priority & Core Principles

### 1.1 Priority Order

If instructions conflict, follow this order:

1. Ticket / product requirements
2. This `CLAUDE.md`
3. Other docs (`README.md`, comments)

Do **not** rewrite other docs/code just to match `CLAUDE.md` without an explicit task.

### 1.2 Core Principles

- Match existing architecture, patterns, naming and folder structure.
- Reuse existing components, hooks, services, Ecto types, utilities.
- Prefer framework solutions (Ecto/Phoenix/ReactNative/TS) over custom code.
- Keep changes **small and local**; avoid cross-cutting refactors.
- No scope creep: only do what the ticket asks for.
- Trust framework guarantees (e.g. Ecto's concurrency handling); don't duplicate them.
- Use `{ :ok, value } | { :error, reason }` for control flow; **no marker values / virtual fields**.

### 1.3 Implementation Guardrails

- Respect layering: Controller → Context → Schema → Repo.
- Fetching functions fetch only; validation/business rules live above.
- Don't mix data fetching and business logic validation in the same function.
- Don't add error handling for scenarios that can't occur.
- Don't introduce helpers/abstractions for one-off use.
- Don't add DB indexes/locks "just in case"; only for measured problems.
- Keep functions small, with single, clear responsibility (SRP, SoC, KISS, YAGNI).

### 1.4 Output Style (Your Responses)

- **Planning**: ≤7 bullets, reference concrete files/modules.
- **Edits**: show **unified diffs** or clearly labeled file patches.
- **Code**: short, focused snippets; only minimal commentary to explain non-obvious choices.
- Avoid prose; optimize for tokens and precision.

### 1.5 Definition of Done (per change)

- 3–6 bullet research summary (what you read and what you found).
- Short plan with file paths.
- Minimal, targeted diffs.
- Tests added/updated when behavior changes.
- Conventional commit message: `type(scope): subject`

---

## 2. Project Overview

Zonke Drivers is a full-stack driver marketplace/logistics platform for managing drivers, vehicles, and ride-sharing operations. It consists of a React Native mobile app (with web support) and a Phoenix/Elixir backend API.

### 2.1 Repository Structure

```
/frontend    # Expo React Native app (iOS, Android, Web)
/backend     # Phoenix/Elixir REST API + WebSocket server
/docker      # LocalStack for S3 development
```

---

## 3. Dev Setup & Commands

### 3.1 Prerequisites

- Elixir/Erlang (via `asdf`)
- Node.js + npm
- PostgreSQL
- Docker + Docker Compose

### 3.2 Frontend Commands (from /frontend or root)
```bash
npm start               # Start Expo development server
npm run android         # Start on Android
npm run ios             # Start on iOS
npm run web             # Start web version
npm test                # Run Jest tests (watch mode)
```

### 3.3 Backend Commands (from /backend)
```bash
mix setup               # Install deps, create DB, run migrations, seed
mix phx.server          # Start Phoenix server (localhost:4000)
iex -S mix phx.server   # Start with interactive Elixir shell
mix test                # Run all tests
mix test path/to/file.exs:42  # Run single test
mix ecto.reset          # Drop and recreate database
mix ecto.migrate        # Run pending migrations
mix format              # Auto-format code
mix format --check-formatted  # Check formatting
```

### 3.4 LocalStack S3 (from /docker/localstack)
```bash
docker-compose up       # Start LocalStack S3 on port 4566
```

### 3.5 Environment

- Backend API: `localhost:4000`
- PostgreSQL: `localhost:5432`
- LocalStack S3: `localhost:4566`
- Frontend API URLs configured in `frontend/constants/srcConstants.ts` (platform-specific)

---

## 4. Project Structure

### 4.1 Frontend (`frontend/src/`)
```
src/
├── app/                    # Expo Router file-based routing
│   ├── (tabs)/             # Tab navigation (home, vehicle, manage, messages, settings)
│   ├── chats/[id].tsx      # Individual chat view
│   ├── drivers/[id].tsx    # Driver profile view
│   ├── vehicles/[id].tsx   # Vehicle detail view
│   └── _layout.tsx         # Root layout with providers
├── components/             # Reusable UI components
│   ├── form/fieldset/      # Form input components
│   ├── dropdown/           # Dropdown selector
│   ├── popup/              # Popup menu
│   ├── modal/              # Modal dialogs
│   ├── slider/             # Range slider (rail, thumb, label)
│   ├── elements/           # DatePicker, Spinner
│   └── shapes/             # Circle, Divider
├── screens/                # Full-screen views
│   ├── Home/               # Dashboard
│   ├── Drivers/            # Driver listing & filtering
│   ├── Vehicles/           # Vehicle listing
│   ├── Messages/Chat/      # Messaging interface
│   ├── AddVehicle/         # Vehicle creation form
│   └── ProfileSetUp/       # User profile creation
├── helpers/                # Utilities (calculateAge, locations, pickImage, platform)
├── types/                  # TypeScript definitions (universal.d.ts, user.d.ts, ui.d.ts)
├── authContext.tsx         # Authentication context & hooks
├── updateCacheProvider.tsx # React Query cache management
├── requests.ts             # HTTP client (Axios)
└── socket.ts               # Phoenix Socket connection
```

### 4.2 Backend (`backend/lib/backend/`)
```
lib/backend/
├── accounts/               # User & auth (user.ex, business_profile.ex, membership.ex)
├── drivers/                # Driver profiles & reviews
│   ├── driver/driver.ex
│   ├── reviews/            # review.ex, comment.ex, reply.ex
│   └── rating_module.ex
├── vehicles/               # Vehicle management
│   ├── vehicle/vehicle.ex
│   ├── vehicle_driver/     # Driver-vehicle assignments
│   └── payment/            # Payment records
├── applications/           # Vehicle applications & bookings
├── messenger/              # Messaging (thread.ex, message.ex, participant.ex)
├── posts/                  # Posts/jobs
├── assets/                 # File/image management
├── notifications/          # Notification system
├── tags/                   # Categorization
├── ecto/                   # Custom types & embeds
│   ├── embeds/             # price_fixed.ex, price_range_embed.ex, duration.ex
│   └── ecto_enums.ex       # Role, VehicleType, FuelType, etc.
├── guardian/               # JWT authentication config
└── workers/                # Oban background jobs
```

---

## 5. Data Architecture

### 5.1 Core Entities & Relationships

```
User (1) ──→ (1) Driver
         ──→ (1) BusinessProfile
         ──→ (*) Vehicle (as owner)
         ──→ (*) Review (as author)

Driver ⟷ Vehicle (through VehicleDriver)
       ──→ (*) Review (receives)

Vehicle ──→ (*) VehicleApplication
        ──→ (*) VehicleDriver ──→ (*) Payment

Thread ──→ (*) Message
       ──→ (*) ThreadParticipant
```

### 5.2 Ecto Enums
- **RoleEnum**: `:driver`, `:owner`, `:member`
- **VehicleTypeEnum**: `:bike`, `:passenger`, `:taxi`, `:truck`, `:lorry`
- **FuelTypeEnum**: `:diesel`, `:petrol`, `:electric`, `:hybrid`, `:hydrogen`
- **ApplicationStatusEnum**: `:pending`, `:accepted`, `:rejected`
- **NotificationsEnum**: `:application`, `:review`, `:tag`, `:profile`, `:payments`, `:system`

### 5.3 Embedded Schemas
- `PriceFixed` - currency + value (used in Vehicle, Payment)
- `PriceRangeEmbed` - currency + min + max
- `Duration`, `Licence` - structured data embeds

### 5.4 Frontend Types (`src/types/`)
- `Page` - Paginated response with cursor-based pagination
- `LocationType` - country, city, place, lat, lon
- `Asset` - File/image with URL and metadata
- `Session` - JWT + User data
- `PriceFixed`, `PriceRange`, `Licence`

### 5.5 UUID Handling
- DB uses native UUID primary keys
- External API uses ShortUUID (22-char base57) via `ecto_shortuuid`
- All schemas use `@primary_key {:id, :binary_id, autogenerate: true}` pattern

---

## 6. Styling System
- `elevation: 2` always use this shadow style for android
- **Maximum fontWeight**: Use `fontWeight: 600` as the maximum bold weight across all styles. Never use 700 or higher.

### 6.1 Color Palette (`frontend/constants/ui.ts`)

```typescript
// Primary
mrDBlue: "#76CBED"       // Main brand color
darkCharcoalGrey: "#1C1B1F"  // Dark backgrounds
bg: "#FAF9F6"                // Default background

// Semantic
lightGreen: "#22C55E"        // Success
lightRed: "#EB634B"          // Error/danger
yellow: "#FFD854"            // Warning
```

### 6.2 Theme Support
- `useColorScheme()` hook for light/dark mode detection
- Platform-specific implementations (`.ts` / `.web.ts`)
- `Themed.tsx` provides theme-aware Text and View components
- `appStyles.ts` for platform-specific styling (iOS padding differences)

### 6.3 UI Components
- **react-native-paper** - Material Design components
- Shadow utilities in `shadow.tsx` and `shadowStyles.ts`
- Each screen has its own `styles/` directory

---

## 7. Key Technologies

### 7.1 Frontend
- **Expo 53** with React 19, React Native 0.79
- **Expo Router** - File-based navigation
- **TanStack React Query** - Server state, caching, pagination
- **React Hook Form + Zod** - Form handling and validation
- **Axios** - HTTP client
- **Phoenix JS** - WebSocket client for real-time features
- **expo-secure-store** - Secure JWT storage
- **react-native-paper** - Material Design UI

### 7.2 Backend
- **Phoenix 1.7** with Bandit server
- **Ecto** - PostgreSQL ORM with UUID primary keys
- **Guardian** - JWT authentication
- **Bodyguard** - Policy-based authorization
- **Oban** - Background job processing
- **ExAWS S3** - File storage (LocalStack in dev)
- **Phoenix Channels** - Real-time WebSocket communication

---

## 8. Architecture Patterns

### 8.1 Frontend Patterns

**Provider Stack** (in `_layout.tsx`):
```
AuthProvider → MessagesProvider → PaginatedCacheProvider → UpdateCacheProvider
```

**HTTP Client** (`requests.ts`):
- Centralized `httpGet`, `httpPost`, `httpPut`, `httpDelete` functions
- Automatic JWT token injection via Bearer header

**Platform Detection** (`helpers/platform.ts`):
- `IS_IOS`, `IS_ANDROID`, `IS_WEB` constants for platform-specific code

**Component Structure**:
```
ComponentName/
  index.tsx        # Component logic
  styles/
    index.ts       # Styled components
```

### 8.2 Backend Patterns

**Data Flow**: Controller → Context → Schema → Repo

**Authentication Flow**:
1. User registers via `/api/users/register_user`
2. User logs in via `/api/session/current_session` (returns JWT)
3. JWT stored securely (expo-secure-store on mobile)
4. Token included in all authenticated requests
5. WebSocket connects with token for real-time features

**Key API Endpoints**:
- `POST /api/session/current_session` - Login (returns JWT)
- `POST /api/users/register_user` - Registration
- `GET /api/drivers/public` - List drivers with filtering
- `GET /api/vehicles/public` - List vehicles
- `POST /api/vehicle_applications` - Apply to drive a vehicle
- `GET/POST /api/threads` - Messaging threads
- `GET/POST /api/messages` - Messages with pagination

**WebSocket Channels**: `users:*`, `chats:*`, `reviews:*`

---

## 9. Backend Code Patterns (Elixir/Phoenix)

### 9.1 Ecto.Multi / Pipelines

Use early errors to stop pipelines:
```elixir
defp verify_condition(changes, content) do
  if should_skip?(changes, content) do
    {:error, :skipped}
  else
    {:ok, value}
  end
end
```

Do **not** propagate marker values through pipelines.

### 9.2 Custom Ecto Types

Check existing types before adding validations:
- `EctoShortUUID` - Handles ShortUUID ↔ UUID ↔ DB binary
- Custom types in `lib/backend/ecto/ecto_types/`

### 9.3 Anti-Patterns to Avoid

- Don't manipulate `__meta__` on Ecto schemas.
- Don't use virtual fields for control flow.
- Don't add changeset validations for simple type conversions.
- Don't scatter identical condition checks across multiple modules.
- Don't add `FOR UPDATE` locks without a proven concurrency issue.
- Don't mix fetching and validation logic.

### 9.4 Performance

- Avoid N+1 queries by using `preload` / proper query composition.
- Add indexes only for real, measured query patterns.
- Avoid indexes on rarely queried fields or low-cardinality flags.

---

## 10. Frontend Code Patterns (JS/React/TypeScript)

### 10.1 General Rules

- All new code must pass TypeScript type checking.
- Avoid `any`; prefer existing types from `src/types/`.
- No `console.log` in committed code.

### 10.2 Form Handling

Use React Hook Form + Zod for all forms:
```typescript
const schema = z.object({
  field: z.string().min(1),
});
const { control, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

### 10.3 State Management

- **Auth state**: Use `useAuth()` from `authContext.tsx`
- **Server state**: Use TanStack React Query
- **Cache updates**: Use `updateCacheProvider.tsx` utilities

### 10.4 Performance

- Use `React.memo` and `useMemo` for expensive computations or large lists.
- Respect existing pagination patterns with React Query.

### 10.5 Image Upload Requirements

**CRITICAL: All image uploads MUST be compressed before sending to the backend.**

- **Helper location**: `frontend/src/helpers/compressImage.ts`
- **Usage**: Call `compressImage({ uri })` on all image URIs before upload
- **Target size**: ~400 KB (automatic, best-effort compression)
- **Format**: JPEG with maximum dimension of 1600px (preserves aspect ratio)

**Integration points**:
- `pickImage` helper already integrates compression automatically
- Direct upload functions (`updateUserAsset`, `updateVehicleAsset`) compress images before FormData creation
- Never bypass compression unless explicitly required for a specific use case

**Example**:
```typescript
import { compressImage } from "@/src/helpers/compressImage";

const compressed = await compressImage({ uri: originalImageUri });
// Use compressed.uri for upload
```

---

## 11. Testing

### 11.1 Backend Tests

```bash
mix test                      # all tests
mix test path/to/file.exs     # specific file
mix test path/to/file.exs:42  # specific test
```

- Use factories: `insert(:user)` etc., never hardcoded data
- Mock external APIs via Mox
- Test helpers: `ConnCase` (controllers), `DataCase` (contexts)
- Backend does not need to be started separately; test runner handles it

### 11.2 Frontend Tests

```bash
npm test                              # all tests (watch mode)
npm test -- --testPathPattern="file"  # specific test
```

- Jest with jest-expo preset
- Test React components with react-test-renderer

---

## 12. Git Workflow

### 12.1 Branch Naming

- Features: `feat/description`
- Bugfixes: `fix/description`
- Main branch: `master`

### 12.2 Commit Messages

Angular style: `type(scope): subject`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(drivers): add driver rating display`
- `fix(vehicles): correct payment calculation`

---

## 13. Security

### 13.1 Authentication

- Guardian JWT tokens
- Stored in expo-secure-store (mobile) / localStorage (web)
- Include in Authorization header as Bearer token

### 13.2 Authorization

- Bodyguard policies per context
- Always validate ownership in policy checks

### 13.3 File Uploads

- Files stored in S3, **not** on the local filesystem
- Validate file types before upload

### 13.4 Never Do

- Never hardcode secrets; use environment variables
- Never skip authorization checks
- Never trust file extensions alone
- Never use string interpolation in DB queries (use bound parameters)
- Never commit secrets or API keys

---

## 14. Final Checklist (For You, the LLM)

Before proposing final code:

- [ ] I followed the instruction priority (ticket > CLAUDE.md).
- [ ] I reused existing patterns, types, components and context functions.
- [ ] I kept changes small, local and free of scope creep.
- [ ] I didn't add speculative indexes/locks/infrastructure.
- [ ] I added/updated tests when behavior changed.
- [ ] My response is minimal: short plan + diffs/snippets only.

**Remember:** the best code is often **no new code** — prefer using what already exists.
