type Driver = {
  id: string,
  description: string,
  location_options: LocationType[],
  paused_at: string,
  price_range: PriceRange,
  price_fixed: PriceFixed,
  age: number,
  experience: number,
  rating: number,
  booking_count: number,
  platforms: string[],
  inserted_at: string,
  updated_at: string,
  email: string,
  first_name: string,
  last_name: string,
  username: string,
  location: string
}

type Filters = {
  search_term?: string,
  platforms?: string[]
  licences?: string[],
  age_range?: number[],
  experience_range?: number[],
  rating?: number,
}