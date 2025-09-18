defmodule Backend.Ecto.EctoEnums do
  import EctoEnum

  # Used in business profiles <-> user memberships
  defenum(RoleEnum,
    owner: 0,
    admin: 1,
    supervisor: 1,
    member: 3
  )

  defenum(BookingStatusEnum, :booking_status_enum, [
    :pending,
    :active,
    :delivered
  ])

  defenum(NotificationsEnum, :notifications_enum, [
    :booking,
    :review,
    :tag,
    :profile,
    :payments,
    :system
  ])
end
