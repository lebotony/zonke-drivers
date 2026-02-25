defmodule Mix.Tasks.Infra.Start do
  use Mix.Task

  @shortdoc "Start LocalStack Docker infrastructure and wait until ready"

  @compose_path Path.expand("../../../../docker/localstack", __DIR__)
  @health_url "http://localhost:4566/_localstack/health"
  @max_attempts 30
  @poll_interval_ms 1_000

  def run(_args) do
    Mix.shell().info("Starting LocalStack Docker container...")

    case System.cmd("docker", ["compose", "up", "-d"],
           cd: @compose_path,
           stderr_to_stdout: true
         ) do
      {output, 0} ->
        Mix.shell().info(output)
        wait_for_localstack()

      {output, code} ->
        Mix.shell().error("docker compose up failed (exit #{code}):\n#{output}")
        exit({:shutdown, 1})
    end
  end

  defp wait_for_localstack() do
    Mix.shell().info("Waiting for LocalStack to be ready...")
    poll(@max_attempts)
  end

  defp poll(0) do
    Mix.shell().error("LocalStack did not become ready in time.")
    exit({:shutdown, 1})
  end

  defp poll(attempts_left) do
    case System.cmd("curl", ["-sf", @health_url], stderr_to_stdout: true) do
      {_, 0} ->
        Mix.shell().info("LocalStack is ready.")

      _ ->
        Process.sleep(@poll_interval_ms)
        poll(attempts_left - 1)
    end
  end
end
