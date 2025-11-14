type VehicleDriver = {
  id: string;
  first_name: string;
  last_name: string;
  driver: Driver;
  payments: Payment[];
  total_payments: number;
  last_payment: number;
  payment_count: number;
  comments?: CommentType[];
};

type VehicleApplication = {
  id: string;
  driver: Driver;
  seen: boolean;
  status?: "pending" | "accepted" | "rejected";
};

type Payment = {
  id: string;
  paid_at: string;
  price_fixed: PriceFixed;
};
