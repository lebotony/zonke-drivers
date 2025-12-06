# lib/backend/workers/test_worker.ex
defmodule Backend.Workers.TestWorker do
  use Oban.Worker, queue: :default, max_attempts: 20

  @impl Oban.Worker
  def perform(%Oban.Job{args: args}) do
    IO.inspect(args, label: "TestWorker received args")
    :ok
  end
end
