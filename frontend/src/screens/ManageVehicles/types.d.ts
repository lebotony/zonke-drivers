type VehicleDriver = {
  id: string;
  first_name: string;
  last_name: string;
  driver: Driver;
  payments: Payment[],
  comments?: CommentType[]
};

type Payment = {
  id: string;
  paid_at: string;
  price_fixed: PriceFixed;
};