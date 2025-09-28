defmodule BackendWeb.Messenger.MessageJSON do
  def index(%{messages: messages}) do
    for(message <- messages, do: show(%{message: message}))
  end

  def show(%{message: message}) do
    # IO.inspect(message)

    Map.take(message, [
      :id,
      :content,
      :recipient_id,
      :author_id,
      :thread_id,
      :seen,
      :visible,
      :sent_at,
      :created_at,
      :metadata
    ])
    |> Map.merge(%{sent_at: date_time(message.inserted_at)})
  end

  defp date_time(date) do
    current_date = Date.utc_today()

    case current_date == NaiveDateTime.to_date(date) do
      true ->
        date
        |> NaiveDateTime.to_time()
        |> Time.to_string()
        |> String.slice(0, 5)

      false ->
        date
        |> Calendar.strftime("%-d %b")
    end
  end
end
