defmodule Backend.Assets.AssetsTest do
  use Backend.DataCase, async: true

  alias Backend.Assets.{Assets, Asset}

  import Backend.Factory

  setup do
    vehicle = insert(:vehicle)

    {:ok, tmp} = Briefly.create()
    File.write!(tmp, "test file content")

    params = %{
      file_path: tmp,
      filename: "uploads/test.png",
      vehicle_id: vehicle.id
    }

    %{vehicle: vehicle, params: params}
  end

  describe "upload_and_save/1" do
    test "create Asset when picture is successfully uploaded in aws", %{
      params: params,
      vehicle: vehicle
    } do
      assert {:ok, %Asset{} = asset} = Assets.upload_and_save(params)

      assert asset.vehicle_id == vehicle.id
      assert is_binary(asset.url)
    end
  end
end
