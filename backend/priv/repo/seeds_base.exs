require Logger

alias Backend.Repo
alias Backend.Accounts.{User, BusinessProfile, Membership}
alias Faker.{Person, Company, Internet, Address}
alias Backend.Messenger.Schemas.{ThreadParticipant, Message}
alias Backend.Messenger.Threads
alias Backend.Services.Service
alias Backend.Bookings.Booking
alias Backend.Reviews.Review
alias Backend.Tags.Tag
alias Backend.TestExample.Participant
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

# Create client users without business profiles
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

{service_providers, customers} = Enum.split(users, 20)

Logger.info("Creating business profiles")

professions_with_tags = [
  {"Hair Dresser", "hair, saloon, haircut, makeup, nails, beauty"},
  {"Plumber", "plumbing, pipes, drainage, installation, repair, maintenance"},
  {"Electrician", "wiring, electrical, installation, repair, circuits, safety"},
  {"Carpenter", "woodworking, furniture, construction, repair, custom, installation"},
  {"Personal Trainer", "fitness, workout, nutrition, coaching, health, motivation"},
  {"Photographer", "photography, portraits, events, editing, creative, sessions"},
  {"Graphic Designer", "design, branding, digital, print, creative, logos"},
  {"Web Developer", "coding, websites, apps, programming, responsive, SEO"},
  {"Tutor", "education, homework, teaching, academic, test prep, learning"},
  {"Massage Therapist", "massage, relaxation, therapy, wellness, spa, recovery"},
  {"Landscaper", "gardening, lawn care, design, maintenance, planting, irrigation"},
  {"Chef/Caterer", "cooking, meals, catering, events, recipes, gourmet"},
  {"House Cleaner", "cleaning, organizing, deep clean, sanitizing, maintenance"},
  {"Pet Groomer", "grooming, pets, bathing, trimming, care, styling"},
  {"Mechanic", "auto repair, maintenance, diagnostics, oil change, brakes"},
  {"Interior Designer", "decor, space planning, furniture, color schemes, renovation"},
  {"Yoga Instructor", "yoga, meditation, flexibility, wellness, breathing, classes"},
  {"Accountant", "taxes, bookkeeping, financial, consulting, payroll, advice"},
  {"Event Planner", "events, coordination, weddings, parties, logistics, decor"},
  {"Makeup Artist", "makeup, beauty, bridal, special effects, glam, application"},
  {"Personal Assistant", "organization, scheduling, errands, administrative, support"}
]

business_profiles =
  Enum.map(Enum.zip(service_providers, professions_with_tags), fn {user, {_, services}} ->
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
        tags: services,
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

    profile
  end)

# Create services
Logger.info("Creating services")

services =
  Enum.flat_map(Enum.zip(service_providers, professions_with_tags), fn {user, {_, services}} ->
    profile = Enum.find(business_profiles, fn bp -> bp.user_id == user.id end)
    services_list = services |> String.split(", ") |> Enum.map(&String.trim/1)

    Enum.map(services_list, fn service ->
      capitalized_service =
        service |> String.split() |> Enum.map(&String.capitalize/1) |> Enum.join(" ")

      {:ok, service} =
        %Service{
          name: capitalized_service,
          user_id: user.id, # Service owner
          location: %{"lat" => 0.0, "lng" => 0.0},
          business_profile_id: profile.id,
          description: "I love #{capitalized_service}",
          location_options: ["Nketa, Magwegwe, Selbourne, Killarny"],
          price_range: %{currency: "dollars", min: 20, max: 25},
          price_fixed: %{currency: "dollars", value: 25},
        }
        |> Repo.insert()

      service
    end)
  end)

# Create bookings
Logger.info("Creating bookings")

services_chunks = Enum.chunk_every(services, 6)

bookings =
  Enum.flat_map(customers, fn user ->
    Enum.map(services_chunks, fn service_chunk ->
      [service | _rest] = service_chunk

      {:ok, booking} =
        %Booking{
          status: "pending",
          booked_date: Date.utc_today(),
          booked_time: Time.utc_now() |> Time.truncate(:second),
          # User who booked service
          user_id: user.id,
          service_id: service.id
        }
        |> Repo.insert()

      booking
    end)
  end)

# Create reviews
Logger.info("Creating reviews")

first_three_customers = Enum.take(customers, 3)

reviews =
  Enum.flat_map(first_three_customers, fn user ->
    Enum.map(services, fn service ->
      {:ok, review} =
        %Review{
          comment: "Great service from #{service.name}",
          user_id: user.id,
          service_id: service.id
        }
        |> Repo.insert()

      review
    end)
  end)

# Create tags between users
Logger.info("Creating tags")

tags =
  Enum.map(Enum.zip(customers, service_providers), fn {customer, provider} ->
    {:ok, tag} =
      %Tag{
        tagged_id: customer.id,
        tagger_id: provider.id
      }
      |> Repo.insert()

    tag
  end)

# Create participants
# participants =
#   Enum.map(users, fn user ->
#     {:ok, participant} =
#       %Participant{
#         id: user.id,  # Using same ID as user
#         first_name: user.first_name,
#         last_name: user.last_name,
#         email: user.email,
#         username: user.username,
#         location: user.location
#       }
#       |> Repo.insert()

#     participant
#   end)

# Create threads
Logger.info("Creating threads")

threads =
  Enum.map(customers, fn customer ->
    {:ok, thread} = Threads.initialize_thread(customer.id, List.first(service_providers).id)

    thread
  end)

# Create messages
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
Logger.info("Created: #{length(services)} services, #{length(bookings)} bookings")
Logger.info("Created: #{length(reviews)} reviews, #{length(tags)} tags")
Logger.info("Created: #{length(threads)} threads")
Logger.info("Created: #{length(threads)} threads, #{length(messages)} messages")
