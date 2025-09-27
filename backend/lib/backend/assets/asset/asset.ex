defmodule Backend.Assets.Asset do
  use Backend, :model

  alias Backend.Accounts.BusinessProfile
  alias Backend.Vehicles.Vehicle
  alias Backend.Posts.Post

  @required_fields [:url]
  @optional_fields [:copied, :meta, :filename, :vehicle_id, :business_profile_id, :post_id]
  @all_fields @required_fields ++ @optional_fields

  schema "assets" do
    field(:copied, :boolean)
    field(:meta, :map)
    field(:filename, :string, virtual: true)
    field(:url, :string)

    belongs_to(:vehicle, Vehicle)
    belongs_to(:post, Post)
    belongs_to(:business_profile, BusinessProfile)

    timestamps()
  end

  def changeset(asset, attrs) do
    asset
    |> cast(attrs, @all_fields)
    |> validate_required(@required_fields)
    |> validate_vehicle_or_business()
  end

  defp validate_vehicle_or_business(changeset) do
    vehicle_id = get_field(changeset, :vehicle_id)
    business_profile_id = get_field(changeset, :business_profile_id)
    post_id = get_field(changeset, :post_id)

    if is_nil(vehicle_id) and is_nil(business_profile_id) and is_nil(post_id) do
      add_error(changeset, :base, "Either vehicle_id, post_id or business_profile_id must be present")
    else
      changeset
    end
  end
end
