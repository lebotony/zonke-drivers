require Logger

alias Backend.Repo
alias Backend.Accounts.{User, BusinessProfile, Membership}
alias Faker.{Person, Company, Internet, Address}
alias Backend.Messenger.Schemas.{ThreadParticipant, Message}
alias Backend.Messenger.Threads
alias Backend.Bookings.Booking
alias Backend.Reviews.Review
alias Backend.Tags.Tag
alias Backend.TestExample.Participant
alias Backend.Vehicles.{Vehicle, VehicleDriver, Payment}
alias Backend.Drivers.Driver
alias Backend.Bookings.{VehicleBooking, DriverBooking}
alias Backend.Assets.Assets
alias Backend.Posts.Post
alias Backend.Ecto.EctoEnums

# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds_base.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Backend.Repo.insert!(%Backend.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

ExAws.S3.put_bucket("zonke-drivers-bucket", "us-east-1")
|> ExAws.request!()

# Create client users without business profiles
#####################################################################################################

Logger.info("Creating users with profiles")

users =
  Enum.map(1..40, fn number ->
    params = %{
      first_name: Person.first_name(),
      last_name: Person.last_name(),
      username: Faker.Internet.user_name(),
      email: "user#{number}@gmail.com",
      password: "user123",
      location: %{address: "Bulawayo 1st street", lat: "20.1457", lng: "28.5873"}
    }

    {:ok, user} =
      User.registration_changeset(params)
      |> Repo.insert()

    user
  end)

{drivers_users, owners_users} = Enum.split(users, 20)

#####################################################################################################

Logger.info("Creating business profiles")

business_profiles =
  Enum.map(users, fn user ->
    {:ok, profile} =
      %BusinessProfile{
        user_id: user.id,
        active: true,
        description: Company.catch_phrase(),
        email: Internet.email(),
        name: Company.name(),
        location: %{
          address: Address.street_address(),
          lat: Address.latitude(),
          lng: Address.longitude()
        },
        phone: Faker.Phone.EnUs.phone()
      }
      |> Repo.insert()

    Logger.info("Creating business profiles user_id memberships")

    %Membership{
      user_id: user.id,
      business_profile_id: profile.id,
      role: EctoEnums.RoleEnum.__enum_map__()[:owner]
    }
    |> Repo.insert()

    # CREATE PROFILE ASSET
    asset_params = %{
      file_path: Path.expand("priv/person-test.jpg"),
      filename: "uploads/person-test.jpg",
      business_profile_id: profile.id
    }

    Assets.upload_and_save(asset_params)

    profile
  end)

######################################################################################################

Logger.info("Creating vehicles")

vehicles =
  Enum.map(owners_users, fn user ->
    profile = Enum.find(business_profiles, fn bp -> bp.user_id == user.id end)

      {:ok, vehicle} =
        %Vehicle{
          name: "Mercedes Benz G40",
          make: "SUV",
          model: "T21",
          description: "Has suspension problems",
          active: true,
          mileage: 60000,
          price_range: %{currency: "dollars", min: 20, max: 25},
          price_fixed: %{currency: "dollars", value: 25},
          user_id: user.id,
          business_profile_id: profile.id,
        }
        |> Repo.insert()

      # CREATE VEHICLE ASSET
      asset_params = %{
        file_path: Path.expand("priv/car-test.jpg"),
        filename: "uploads/car-test.jpg",
        vehicle_id: vehicle.id
      }

      Assets.upload_and_save(asset_params)

      vehicle
    end)

######################################################################################################

Logger.info("Creating drivers")

driver_previous_companies = [
  {"", "hair, saloon, haircut, makeup, nails, beauty"},
  {"Plumber", "plumbing, pipes, drainage, installation, repair, maintenance"},
]

drivers =
  Enum.map(drivers_users, fn user ->
    profile = Enum.find(business_profiles, fn bp -> bp.user_id == user.id end)

      {:ok, driver} =
        %Driver{
          location: %{"lat" => 0.0, "lng" => 0.0},
          description: "i drive trucks",
          licences: ["General", "Class 2", "Class 4"],
          active: true,
          experience: 12,
          age: 42,
          price_range: %{currency: "dollars", min: 20, max: 25},
          price_fixed: %{currency: "dollars", value: 25},
          user_id: user.id,
          business_profile_id: profile.id,
        }
        |> Repo.insert()

      driver
    end)

######################################################################################################

Logger.info("Creating posts")

posts =
  Enum.map(owners_users, fn user ->
    profile = Enum.find(business_profiles, fn bp -> bp.user_id == user.id end)

      {:ok, post} =
        %Post{
          location: %{"lat" => 0.0, "lng" => 0.0},
          description: "I am looking for a scooter driver",
          licences: ["General", "Class 2", "Class 4"],
          location_options: ["Pretoria", "Jozi", "Soweto"],
          business_profile_id: profile.id,
        }
        |> Repo.insert()

      # CREATE POST ASSET
      asset_params = %{
        file_path: Path.expand("priv/car-test.jpg"),
        filename: "uploads/car-test.jpg",
        post_id: post.id
      }

      Assets.upload_and_save(asset_params)

      post
    end)

######################################################################################################

Logger.info("Creating vehicle_bookings")

vehicle_bookings =
  Enum.map(Enum.zip(drivers_users, vehicles), fn {user, vehicle} ->
      {:ok, vehicle_booking} =
        %VehicleBooking{
          # booked_date: ,
          note: "can i book this car for the afternoon?",
          price_fixed: %{currency: "dollars", value: 25},
          user_id: user.id,
          vehicle_id: vehicle.id,
        }
        |> Repo.insert()

      vehicle_booking
    end)

######################################################################################################

Logger.info("Creating driver_bookings")

driver_bookings =
  Enum.map(Enum.zip(owners_users, drivers), fn {user, driver} ->
      {:ok, driver_booking} =
        %DriverBooking{
          # booked_date: ,
          note: "can you drive this truck?",
          price_fixed: %{currency: "dollars", value: 25},
          user_id: user.id,
          driver_id: driver.id,
        }
        |> Repo.insert()

      driver_booking
    end)

######################################################################################################

Logger.info("Creating vehicle_drivers")

vehicle_drivers =
  Enum.map(Enum.zip(drivers, vehicles), fn {driver, vehicle} ->
      {:ok, vehicle_driver} =
        %VehicleDriver{
          vehicle_id: vehicle.id,
          driver_id: driver.id,
        }
        |> Repo.insert()

      vehicle_driver
    end)

######################################################################################################

Logger.info("Creating payments")

payments =
  Enum.flat_map(Enum.zip(vehicle_drivers, 1..20), fn {vehicle_driver, price} ->
    Enum.map(1..10, fn v ->
      {:ok, payment} =
        %Payment{
          price_fixed: %{currency: "dollars", value: price * v},
          vehicle_driver_id: vehicle_driver.id,
        }
        |> Repo.insert()

      payment
    end)
  end)

######################################################################################################

# Logger.info("Creating reviews")

# first_three_customers = Enum.take(vehicle_owners, 3)

# reviews =
#   Enum.flat_map(first_three_customers, fn user ->
#     Enum.map(services, fn service ->
#       {:ok, review} =
#         %Review{
#           comment: "Great service from #{service.name}",
#           user_id: user.id,
#           service_id: service.id
#         }
#         |> Repo.insert()

#       review
#     end)
#   end)

######################################################################################################

# Logger.info("Creating tags")

# tags =
#   Enum.map(Enum.zip(vehicle_owners, drivers_users), fn {customer, provider} ->
#     {:ok, tag} =
#       %Tag{
#         tagged_id: customer.id,
#         tagger_id: provider.id
#       }
#       |> Repo.insert()

#     tag
#   end)

######################################################################################################

Logger.info("Creating threads")

threads =
  Enum.map(owners_users, fn user ->
    {:ok, thread} = Threads.initialize_thread(user.id, List.first(drivers_users).id)

    thread
  end)

######################################################################################################

Logger.info("Creating messages")

preloads = [:messages, [thread_participants: :participant]]

messages =
  Enum.flat_map(Enum.zip(threads, 1..length(threads)), fn {thread, thd_index} ->
    preloaded_thread = Repo.preload(thread, preloads)

    Enum.map(1..5, fn msg_number ->
      [
        %ThreadParticipant{participant_id: author_id},
        %ThreadParticipant{participant_id: recipient_id}
      ] = preloaded_thread.thread_participants

      shift_minutes_by = (thd_index * 10) + msg_number

      inserted_at =
        NaiveDateTime.utc_now()
        |> Timex.shift(minutes: -shift_minutes_by)
        |> NaiveDateTime.truncate(:second)

      {:ok, message} =
        %Message{
          content: "Message #{msg_number} in thread #{thread.id}",
          thread_id: thread.id,
          recipient_id: recipient_id,
          author_id: author_id,
          inserted_at: inserted_at
        }
        |> Repo.insert()

      message
    end)
  end)

Logger.info("Seed data population completed successfully!")
Logger.info("Created: #{length(users)} users, #{length(business_profiles)} business profiles")
Logger.info("Created: #{length(vehicle_bookings)} vehicle_bookings")
Logger.info("Created: #{length(driver_bookings)} driver_bookings")
Logger.info("Created: #{length(posts)} posts")
Logger.info("Created: #{length(vehicles)} vehicles")
Logger.info("Created: #{length(drivers)} drivers")
Logger.info("Created: #{length(vehicle_drivers)} vehicle_drivers")
Logger.info("Created: #{length(payments)} payments")

# Logger.info("Created: #{length(reviews)} reviews, #{length(tags)} tags")
Logger.info("Created: #{length(threads)} threads, #{length(messages)} messages")
