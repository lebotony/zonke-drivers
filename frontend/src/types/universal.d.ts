type Page = {
  data: Record<string, any>[];
  pagination: { after: string; total: number };
};

type CachedObject = {
  pages: Page[];
  pageParams: Array;
};

type UpdatePaginatedObjectType = (
  queryKey: string,
  objToUpdateId: string,
  updatedParams: any,
) => void;

type GetUpdatedObjectSnapshot = (
  queryKey: string,
  objToUpdateId: string,
) => any;

type Paginate = {
  page: number;
  per_page: number;
  max_page: number;
  total_count: number;
};

type LocationType = {
  address: string;
  lat: string;
  lon: string;
};

type Licence = {
  slug: string;
  name: string;
};

type PriceRange = {
  currency: string;
  min: number;
  max: number;
};

type PriceFixed = {
  currency: string;
  value: number;
};

type Asset = {
  id: string;
  copied: boolean;
  meta: Record<string, any>;
  url: string;
  vehicle_id?: string,
  user_id?: string
};
