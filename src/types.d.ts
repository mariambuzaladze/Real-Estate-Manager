interface ICity {
  id: number;
  name: string;
  region_id: number;
  region: IRegion;
}

interface IRealEstate {
  id: number;
  address: string;
  zip_code: string;
  price: number;
  description: string;
  area: number;
  bedrooms: number;
  image: string;
  is_rental: number;
  city_id: number;
  city: ICity;
  agent_id: number;
}
