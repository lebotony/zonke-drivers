defmodule Backend.Reviews.Review do
  use Backend, :model

  alias Backend.Services.Service
  alias Backend.Accounts.User

  @required_fields [:user_id, :comment, :service_id]
  @optional_fields [:likes, :users_liked]
  @all_fields @required_fields ++ @optional_fields

  schema "reviews" do
    field(:comment, :string)
    field(:likes, :integer, default: 0)
    field(:users_liked, {:array, :string}, default: [])

    belongs_to(:user, User)
    belongs_to(:service, Service)

    timestamps()
  end

  def changeset(struct, params) do
    struct
    |> cast(params, @all_fields)
    |> validate_required(@required_fields)
  end
end
