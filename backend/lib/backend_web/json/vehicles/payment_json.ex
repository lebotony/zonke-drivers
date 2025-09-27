defmodule BackendWeb.Vheicles.PaymentJSON do
  def index(%{payments: payments, paginate: paginate}) do
    %{
      paginate: paginate,
      data: for(payment <- payments, do: show(%{payment: payment}))
    }
  end

  def index(%{payments: payments}) do
    for(payment <- payments, do: show(%{payment: payment}))
  end

  def show(%{payment: payment}) do
    Map.take(payment, [
      :id,
      :price_fixed,
      :inserted_at,
      :updated_at
    ])
  end
end
