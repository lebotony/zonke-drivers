import Config

# config/runtime.exs is executed at runtime, after compilation.
# Use it for loading secrets and environment-specific config.

# Enable Phoenix server if PHX_SERVER=true
if System.get_env("PHX_SERVER") do
  config :backend, BackendWeb.Endpoint, server: true
end

# Load common secrets
config :backend, :geoapify_api_key, System.get_env("GEOAPIFY_API_KEY")

if config_env() == :prod do
  # --- Database config ---
  database_url =
    System.get_env("DATABASE_URL") ||
      raise """
      environment variable DATABASE_URL is missing.
      Example: ecto://USER:PASS@HOST/DATABASE
      """

  maybe_ipv6 = if System.get_env("ECTO_IPV6") in ~w(true 1), do: [:inet6], else: []

  config :backend, Backend.Repo,
    url: database_url,
    pool_size: String.to_integer(System.get_env("POOL_SIZE", "10")),
    socket_options: maybe_ipv6

  # --- Secret key base ---
  secret_key_base =
    System.get_env("SECRET_KEY_BASE") ||
      raise """
      environment variable SECRET_KEY_BASE is missing.
      Generate with: mix phx.gen.secret
      """

  # --- Endpoint config ---
  host = System.get_env("PHX_HOST", "zonkedrivers.com")
  port = String.to_integer(System.get_env("PORT", "4000"))

  config :backend, BackendWeb.Endpoint,
    url: [host: host, port: 443, scheme: "https"],
    force_ssl: [rewrite_on: [:x_forwarded_proto]],
    http: [port: port],
    secret_key_base: secret_key_base

  # Optional: DNS cluster query
  config :backend, :dns_cluster_query, System.get_env("DNS_CLUSTER_QUERY")
  
  # --- AWS / LocalStack Configuration ---

  use_localstack = System.get_env("USE_LOCALSTACK") == "true"
  
  config :backend, :use_localstack, use_localstack

  config :ex_aws,
    access_key_id: System.get_env("AWS_ACCESS_KEY_ID") || "test",
    secret_access_key: System.get_env("AWS_SECRET_ACCESS_KEY") || "test",
    region: "us-east-1"

  # Add this to prevent it from hitting real Amazon servers, but should remove it in p>
  if use_localstack do
    config :ex_aws, :s3,
      scheme: "http://",
      host: System.get_env("LOCALSTACK_HOST") || "102.207.63.87",
      port: String.to_integer(System.get_env("LOCALSTACK_PORT") || "4566")
  end
end
