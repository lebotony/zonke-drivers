type VehicleDriver = {
  id: string;
  first_name: string;
  last_name: string;
  driver: Driver;
  payments: Payment[]
};

type Payment = {
  id: string;
  paid_at: string;
  price_fixed: PriceFixed;
};