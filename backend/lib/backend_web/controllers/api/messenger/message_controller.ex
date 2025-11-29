defmodule BackendWeb.Messenger.MessageController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController

  alias Backend.Messenger.Schemas.Message
  alias Backend.Messenger.Messages

  def create(conn, params, session) do
    with {:ok, %Message{} = message} <- Messages.create(params, session) do
      render(conn, :show, %{message: message})
    end
  end

  def delete(conn, %{"id" => id}, _session) do
    message = Messages.get_message(id)

    with {:ok, %Message{}} <- Messages.delete(message) do
      json(conn, :ok)
    end
  end

  def get_thread_messages(conn, params, _session) do
    with {:ok, messages, paginate} <- Messages.get_thread_messages(params) do
      render(conn, :index, %{messages: messages, paginate: paginate})
    end
  end
end
