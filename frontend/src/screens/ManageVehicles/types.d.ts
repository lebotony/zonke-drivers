type VehicleDriver = {
  id: string;
  driver: Driver;
  vehicle: Vehicle;
  rating: number;
  asset_url: string;
  first_name: string;
  last_name: string;
};

type Payment = {
  id: string;
  paid_at: string;
  price_fixed: PriceFixed;
};