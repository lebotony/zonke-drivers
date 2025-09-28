defmodule BackendWeb.Assets.AssetJSON do
  def index(%{assets: assets, paginate: paginate}) do
    %{
      paginate: paginate,
      data: for(asset <- assets, do: show(%{asset: asset}))
    }
  end

  def index(%{assets: assets}) do
    for(asset <- assets, do: show(%{asset: asset}))
  end

  def show(%{asset: asset}) do
    Map.take(asset, [
      :id,
      :copied,
      :meta,
      :url,
      :inserted_at,
      :updated_at
    ])
  end
end
