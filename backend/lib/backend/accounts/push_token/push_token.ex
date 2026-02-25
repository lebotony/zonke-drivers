defmodule Backend.Accounts.PushToken do
  use Backend, :model

  alias Backend.Accounts.User

  @required_fields [:user_id, :expo_push_token]
  @optional_fields [:device_id, :platform, :active]
  @all_fields @required_fields ++ @optional_fields

  schema "push_tokens" do
    field(:expo_push_token, :string)
    field(:device_id, :string)
    field(:platform, :string)
    field(:active, :boolean, default: true)

    belongs_to(:user, User)

    timestamps()
  end

  def changeset(struct, params) do
    struct
    |> cast(params, @all_fields)
    |> validate_required(@required_fields)
    |> validate_format(:expo_push_token, ~r/^ExponentPushToken\[[^\]]+\]$/)
    |> assoc_constraint(:user)
    |> unique_constraint(:expo_push_token)
  end
end
