defmodule Backend.Factory do
  use ExMachina.Ecto, repo: Backend.Repo
  use Backend.BusinessProfileFactory
  use Backend.ServiceFactory
  use Backend.UserFactory
  use Backend.ReviewFactory
  use Backend.BookingFactory
  use Backend.TagFactory
  use Backend.ThreadFactory
  use Backend.MessageFactory
  use Backend.ParticipantFactory
  use Backend.VehicleFactory
  use Backend.PaymentFactory
  use Backend.DriverFactory

  def uuid(), do: Ecto.UUID.generate()
end
