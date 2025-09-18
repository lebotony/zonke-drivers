defmodule Backend.Accounts.User do
  use Backend, :model

  @required_fields [:first_name, :last_name, :email]
  @optional_fields [:location, :username]
  @all_fields @required_fields ++ @optional_fields

  schema "users" do
    field(:first_name, :string)
    field(:last_name, :string)
    field(:email, :string)
    field(:username, :string)
    field(:location, :map)
    field(:password_hash, :string)

    field(:password, :string, virtual: true)

    timestamps()
  end

  def changeset(struct, params) do
    struct
    |> cast(params, @all_fields)
    |> validate_required(@required_fields)
    # TODO: change to 20
    |> validate_length(:username, min: 1, max: 250)
    |> unique_constraint(:email, message: "user email already taken")
    |> unique_constraint(:username, message: "username already taken")
  end

  def registration_changeset(params) do
    %__MODULE__{}
    |> changeset(params)
    |> cast(params, @all_fields ++ [:password])
    |> validate_required(@required_fields ++ [:password])
    |> validate_length(:password, min: 6, max: 100)
    |> put_pass_hash()
  end

  defp put_pass_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Bcrypt.hash_pwd_salt(pass))

      _ ->
        changeset
    end
  end
end
