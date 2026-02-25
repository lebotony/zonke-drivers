defmodule Backend.Workers.PushNotificationWorker do
  use Oban.Worker, queue: :default, max_attempts: 3

  alias Backend.Notifications.PushNotification

  require Logger

  @impl Oban.Worker
  def perform(%Oban.Job{args: args}) do
    %{
      "recipient_id" => recipient_id,
      "title" => title,
      "body" => body,
      "data" => data
    } = args

    Logger.info("Sending push to user #{recipient_id}: #{title}")

    case PushNotification.send_push(recipient_id, title, body, data) do
      {:ok, _results} ->
        :ok

      {:error, reason} ->
        Logger.error("Push notification failed: #{inspect(reason)}")
        {:error, reason}
    end
  end
end
