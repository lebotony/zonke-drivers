defmodule Backend.Drivers.DriversTest do
  use Backend.DataCase, async: true
  use Backend.MoxCase

  alias Backend.Drivers.{Driver, Drivers}
  alias Backend.Vehicles.Payments

  import Backend.Factory

  setup do
    user = insert(:user, first_name: "Tony", last_name: "Stark")

    session = %{user_id: user.id}

    params = %{
      location: %{address: "Bulawayo, Zimbabwe", lat: -20.1457, lon: 28.5873},
      active: true
    }

    %{
      user: user,
      params: params,
      user: user,
      session: session
    }
  end

  describe "create/2" do
    test "successfully creates a driver", %{params: params, session: session} do
      assert {:ok, %Driver{} = driver} = Drivers.create(params, session)

      preloaded_driver = Repo.preload(driver, :user)

      assert preloaded_driver.user.first_name == "Tony"
    end
  end

  describe "update/2" do
    test "successfully updates a driver", %{params: params, session: session} do
      {:ok, driver} = Drivers.create(params, session)

      updated_params = %{description: "I drive big trucks"}

      assert {:ok, %Driver{} = updated_payment} =
               Drivers.update_or_create(updated_params, session.user_id)

      assert updated_payment.description == "I drive big trucks"
    end
  end

  describe "delete/1" do
    test "successfully deletes a driver", %{params: params, session: session} do
      {:ok, driver} = Drivers.create(params, session)

      assert {:ok, _} = Drivers.delete(driver)
      assert {:error, :not_found} = Drivers.get_driver(driver.id)
    end
  end

  # TESTING RATING GENERATION
  describe "get_driver/2" do
    test "returns driver with correct multi-period payment rating", %{
      user: driver_user,
      session: session,
      params: params
    } do
      {:ok, driver} = Drivers.create(params, session)

      vd_1_base_time = NaiveDateTime.add(NaiveDateTime.utc_now(), -150 * 86400)
      vd_1_updated_at = NaiveDateTime.add(NaiveDateTime.utc_now(), -56 * 86400)
      vd_2_base_time = NaiveDateTime.add(NaiveDateTime.utc_now(), -53 * 86400)

      owner = insert(:user, first_name: "Owner", last_name: "Test")

      vehicle_1 = insert(:vehicle, user: owner, active: true, payments_per_month: 4)
      vehicle_2 = insert(:vehicle, user: owner, active: true, payments_per_month: 2)

      vehicle_driver_1 =
        insert(:vehicle_driver,
          driver: driver,
          vehicle: vehicle_1,
          active: false,
          inserted_at: vd_1_base_time,
          updated_at: vd_1_updated_at
        )

      vehicle_driver_2 =
        insert(:vehicle_driver,
          driver: driver,
          vehicle: vehicle_2,
          active: true,
          inserted_at: vd_2_base_time
        )

      # PAYMENTS FOR VEHICLE_DRIVER_1
      # Period 1 (0-27: Expected 4 payments, made 3 → rating 3.8
      Enum.each([1, 7, 17], fn offset ->
        Payments.create(%{
          vehicle_driver_id: vehicle_driver_1.id,
          price_fixed: %{currency: "ZAR", value: 100},
          inserted_at: NaiveDateTime.add(vd_1_base_time, offset * 86400)
        })
      end)

      # Period 2 (28-55): Expected 4 payments, made 4 → rating 5.0
      Enum.each([30, 37, 45, 52], fn offset ->
        Payments.create(%{
          vehicle_driver_id: vehicle_driver_1.id,
          price_fixed: %{currency: "ZAR", value: 100},
          inserted_at: NaiveDateTime.add(vd_1_base_time, offset * 86400)
        })
      end)

      # Period 3 (56-83): Expected 4 payments, made 2 → rating 2.5
      Enum.each([56, 70], fn offset ->
        Payments.create(%{
          vehicle_driver_id: vehicle_driver_1.id,
          price_fixed: %{currency: "ZAR", value: 100},
          inserted_at: NaiveDateTime.add(vd_1_base_time, offset * 86400)
        })
      end)

      # Period 4 (8 days remaining): Expected (4 * 8/28) = 1.14 = 1, made 0 → rating 0.0
      # Days 84-91 (we'll test only up to day 92 total)
      # No payments in this period

      # PAYMENTS FOR VEHICLE_DRIVER_2
      # Period 1 (0-27): Expected 2 payments, made 2 → rating 5
      Enum.each([13, 26], fn offset ->
        Payments.create(%{
          vehicle_driver_id: vehicle_driver_2.id,
          price_fixed: %{currency: "ZAR", value: 100},
          inserted_at: NaiveDateTime.add(vd_2_base_time, offset * 86400)
        })
      end)

      # Period 2 (25 days remaining): Expected (2 * 25/28) = 1.79 ≈ 2, made 1 → rating 2.5
      Enum.each([42], fn offset ->
        Payments.create(%{
          vehicle_driver_id: vehicle_driver_2.id,
          price_fixed: %{currency: "ZAR", value: 100},
          inserted_at: NaiveDateTime.add(vd_2_base_time, offset * 86400)
        })
      end)

      #### Expected rating for vd_2: (5 + 2.5) / 2 = 3.625 ≈ 3.6

      # Expected rating for vd_1: (3.75 + 5.0 + 2.5 + 0.0) / 4 = 2.8125 ≈ 2.8
      # Expected rating for vd_2: (5 + 2.5) / 2 = 3.75
      # Expected rating for driver: (2.8 + 3.75) / 2 = 3.275 ≈ 3.3

      {:ok, fetched_driver} = Drivers.get_driver(driver.id, :public)

      # IO.inspect(fetched_driver)

      assert fetched_driver.rating == 3.3
    end

  # describe "get_drivers/1" do
  #   test "returns business_profile drivers if found", %{
  #     params: params,
  #     business_profile: business_profile,
  #     session: session
  #   } do
  #     insert_list(10, :driver, active: true)

  #     {:ok, _driver_1} = Drivers.create(params, session)
  #     {:ok, _driver_2} = Drivers.create(params, session)

  #     {:ok, _drivers, %{total_count: total_count}} = Drivers.get_drivers(params)

  #     assert total_count == 2
  #   end
  # end

  describe "get_drivers/2" do
    test "returns drivers if found" do
      insert_list(10, :driver, active: true)

      {:ok, _drivers, %{total_count: total_count}} = Drivers.get_drivers(%{}, :public)

      assert total_count == 10
    end
  end
end
