type Vehicle = {
  id: string;
  active: boolean;
  description: string;
  fuel_type: string;
  engine_capacity: number;
  manual: boolean;
  mileage: number;
  passengers: number;
  type: VehileType;
  brand: string;
  model: string;
  model_year: number;
  price_fixed: PriceFixed;
  price_range: PriceRange;
  user: { id: string; asset_url: string };
  asset: Asset;
  vehicle_drivers?: VehicleDriver[];
  applications: Driver[];
  rating: number;
  unseen_applications_count?: number;
};

type VehileType = "bike" | "passenger" | "taxi" | "truck" | "lorry";

type Brand = {
  id: string;
  label: string;
  icon: string;
};
