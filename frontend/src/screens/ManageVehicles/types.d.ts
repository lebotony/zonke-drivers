type VehicleDriver = {
  id: string;
  first_name: string;
  last_name: string;
  driver: Driver;
  payments: Payment[],
  total_payments: number,
  last_payment: number,
  payment_count: number,
  comments?: CommentType[]
};

type Payment = {
  id: string;
  paid_at: string;
  price_fixed: PriceFixed;
};