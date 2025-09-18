defmodule BackendWeb.Services.ServiceController do
  use BackendWeb, :controller
  use BackendWeb.AuthenticatedController

  alias Backend.Services.Services

  # TODO: add rate limiting

  def index_public(conn, params, _session) do
    with {:ok, data} <- Services.get_services(:public, params) do
      render(conn, :index, services: data.data, pagination: data.pagination)
    end
  end

  def index(conn, %{business_profile_id: profile_id} = params, session) do
    # with :ok <- Bodyguard.permit(Services, :get_services, %{id: profile_id}, session),
    with services <- Services.get_services(params) do
      render(conn, :index, services: services)
    end
  end

  def create(conn, %{business_profile_id: profile_id} = params, session) do
    with :ok <- Bodyguard.permit(Services, :create, %{id: profile_id}, session),
         {:ok, service} <- Services.create(params, session) do
      render(conn, :show, service: service)
    end
  end

  def show_public(conn, %{id: id}, _session) do
    with {:ok, service} <- Services.get_service(id, :public),
         :ok <- Bodyguard.permit(Services, :show_public, service, nil) do
      render(conn, :show, service: service)
    end
  end

  def show(conn, %{id: id}, session) do
    with {:ok, service} <- Services.get_service(id),
         :ok <- Bodyguard.permit(Services, :show, service, session) do
      render(conn, :show, service: service)
    end
  end

  def update(conn, %{id: id} = params, session) do
    with {:ok, service} <- Services.get_service(id),
         :ok <- Bodyguard.permit(Services, :update, service, session),
         {:ok, service} <- Services.update(service, params) do
      render(conn, :show, service: service)
    end
  end

  def delete(conn, %{id: id}, session) do
    with {:ok, service} <- Services.get_service(id),
         :ok <- Bodyguard.permit(Services, :delete, service, session),
         {:ok, _service} <- Services.delete(service) do
      json(conn, :ok)
    end
  end
end
