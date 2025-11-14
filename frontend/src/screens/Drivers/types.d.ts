type Driver = {
  id: string;
  description: string;
  paused_at: string;
  price_fixed: PriceFixed;
  dob: string;
  location: LocationType;
  experience: number;
  rating: number;
  booking_count: number;
  platforms: string[];
  inserted_at: string;
  updated_at: string;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  location: string;
  asset_url: string;
  comments: CommentType[];
};

type Filters = {
  search_term?: string;
  platforms?: string[];
  licences?: string[];
  age_range?: number[];
  experience_range?: number[];
  rating?: number;
};
