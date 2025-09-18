defmodule Backend.Accounts.BusinessProfile do
  use Backend, :model

  alias Backend.Accounts.User
  alias Backend.Services.Service

  @required_fields [:name, :description, :location, :user_id]
  @optional_fields [:tags, :email, :phone, :active]
  @all_fields @required_fields ++ @optional_fields

  schema "business_profiles" do
    field(:name, :string)
    field(:email, :string)
    field(:phone, :string)
    field(:description, :string)
    field(:location, :map)
    field(:tags, :string)
    field(:active, :boolean)
    field(:disabled, :boolean, default: false)
    field(:searchable_document, Backend.Ecto.EctoTypes.Tsvector)

    field(:rank_value, :decimal, virtual: true)

    has_many(:services, Service)
    belongs_to(:user, User)

    timestamps()
  end

  def changeset(struct, params) do
    struct
    |> cast(params, @all_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:name)
    |> assoc_constraint(:user)
  end

  def disable_profile(struct, disabled) do
    change(struct, %{disabled: disabled})
  end
end
