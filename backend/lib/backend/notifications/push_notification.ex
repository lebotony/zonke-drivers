defmodule Backend.Notifications.PushNotification do
  require Logger
  alias Backend.Accounts.PushTokens
  alias Backend.Workers.PushNotificationWorker

  @expo_push_url "https://exp.host/--/api/v2/push/send"

  @type notification_data :: %{
          recipient_id: String.t(),
          notifier_id: String.t(),
          title: String.t(),
          body: String.t(),
          data: map()
        }

  @doc """
  Queue push notification for async sending via Oban worker.
  Does not send if recipient is the notifier (don't notify yourself).
  """
  def enqueue_push(notification_data) do
    if notification_data.recipient_id != notification_data.notifier_id do
      try do
        %{
          recipient_id: notification_data.recipient_id,
          title: notification_data.title,
          body: notification_data.body,
          data: notification_data.data
        }
        |> PushNotificationWorker.new()
        |> Oban.insert()
      rescue
        e ->
          Logger.error("Failed to enqueue push notification: #{inspect(e)}")
          {:ok, :enqueue_failed}
      end
    else
      {:ok, :skipped_self_notification}
    end
  end

  @doc """
  Send push notifications to all user's devices.
  Returns {:ok, results} with array of Expo API responses.
  """
  def send_push(recipient_id, title, body, data \\ %{}) do
    tokens = PushTokens.get_user_tokens(recipient_id)

    if Enum.empty?(tokens) do
      Logger.info("No push tokens for user #{recipient_id}")
      {:ok, []}
    else
      messages =
        Enum.map(tokens, fn token ->
          %{
            to: token.expo_push_token,
            sound: "default",
            title: title,
            body: body,
            data: data
          }
        end)

      send_to_expo_api(messages, tokens)
    end
  end

  defp send_to_expo_api(messages, tokens) do
    headers = [
      {"Content-Type", "application/json"},
      {"Accept", "application/json"}
    ]

    body = Jason.encode!(messages)

    case HTTPoison.post(@expo_push_url, body, headers) do
      {:ok, %{status_code: 200, body: response_body}} ->
        handle_expo_response(response_body, tokens)

      {:error, error} ->
        Logger.error("Expo push API error: #{inspect(error)}")
        {:error, error}
    end
  end

  defp handle_expo_response(response_body, tokens) do
    case Jason.decode(response_body) do
      {:ok, %{"data" => results}} ->
        Enum.zip(results, tokens)
        |> Enum.each(fn {result, token} ->
          case result do
            %{"status" => "error", "details" => %{"error" => error_type}}
            when error_type in ["DeviceNotRegistered", "InvalidCredentials"] ->
              PushTokens.mark_token_inactive(token.expo_push_token)
              Logger.warning("Marked token inactive: #{error_type}")

            _ ->
              :ok
          end
        end)

        {:ok, results}

      {:error, decode_error} ->
        Logger.error("Failed to decode Expo response: #{inspect(decode_error)}")
        {:error, decode_error}
    end
  end
end
