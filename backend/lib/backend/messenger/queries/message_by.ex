defmodule Backend.Messenger.Queries.MessageBy do
  alias Backend.Messenger.Schemas.Message

  import Ecto.Query

  def base_query() do
    from(m in Message,
      as: :message
    )
  end
end
