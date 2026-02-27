defmodule Backend.Release do
  @app :backend

  def migrate do
    prepare()

    for repo <- repos() do
      {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :up, all: true))
    end
  end

  def seed do
    prepare()

    for repo <- repos() do
      {:ok, _, _} = Ecto.Migrator.with_repo(repo, fn _repo ->
        Code.eval_file("priv/repo/seeds_base.exs")
      end)
    end
  end

  defp prepare do
    # Load the application so we can read the config
    Application.load(@app)
    
    # Ensure the database driver and Ecto support apps are running
    Application.ensure_all_started(:postgrex)
    Application.ensure_all_started(:ecto_sql)
  end

  defp repos do
    Application.fetch_env!(@app, :ecto_repos)
  end
end
