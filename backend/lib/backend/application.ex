defmodule Backend.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  alias Backend.Assets.Assets

  @impl true
  def start(_type, _args) do
    # Load .env file in dev/test environments
    load_dotenv()

    Assets.ensure_bucket_exists()

    children = [
      BackendWeb.Telemetry,
      Backend.Repo,
      {DNSCluster, query: Application.get_env(:backend, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Backend.PubSub},
      {Oban, Application.fetch_env!(:backend, Oban)},
      # Start the Finch HTTP client for sending emails
      {Finch, name: Backend.Finch},
      Backend.ConnectionTracker,
      # Start a worker by calling: Backend.Worker.start_link(arg)
      # {Backend.Worker, arg},
      # Start to serve requests, typically the last entry
      BackendWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Backend.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    BackendWeb.Endpoint.config_change(changed, removed)
    :ok
  end

  defp load_dotenv do
    if Code.ensure_loaded?(Mix) and Mix.env() in [:dev, :test] do
      case Code.ensure_loaded(Dotenv) do
        {:module, Dotenv} ->
          if File.exists?(".env") do
            Dotenv.load!()
          end

        _ ->
          :ok
      end
    end
  end
end
