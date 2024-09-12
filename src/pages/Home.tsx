import { useContext, useState, useEffect } from "react";
import { MyContext } from "../App";
import Item from "../components/Item";
import RangeFilter from "../components/rangeFilter";
import BedroomsFilter from "../components/BedroomFilter";
import Filter from "../components/RegionFilter";
import ChosenFilters from "../components/ChoosenFilters";

interface IRegion {
  id: string;
  name: string;
}

export default function Home() {
  const { data } = useContext(MyContext);
  const [regionFilter, setRegionFilter] = useState<string[]>([]);
  const [areaFilter, setAreaFilter] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [bedroomFilter, setBedroomFilter] = useState<number | null>(null);
  const [priceFilter, setPriceFilter] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch(
          "https://api.real-estate-manager.redberryinternship.ge/api/regions",
          {
            headers: {
              Authorization: "Bearer 9cfd8995-371f-4210-8952-8ca1881b89be",
            },
          }
        );
        const data = await response.json();
        setRegions(data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    fetchRegions();
  }, []);

  const filteredData = (data ?? []).filter((e) => {
    const regionName = regions.find(
      (region) => Number(region.id) === Number(e.city.region_id)
    )?.name;

    const bedroomMatch =
      bedroomFilter !== null ? Number(e.bedrooms) === bedroomFilter : false;
    const regionMatch =
      regionFilter.length > 0 ? regionFilter.includes(regionName || "") : false;
    const areaMatch = areaFilter
      ? e.area >= areaFilter.min && e.area <= areaFilter.max
      : false;
    const priceMatch = priceFilter
      ? e.price >= priceFilter.min && e.price <= priceFilter.max
      : false;

    const filtersApplied =
      bedroomFilter !== null ||
      regionFilter.length > 0 ||
      areaFilter !== null ||
      priceFilter !== null;

    return filtersApplied
      ? bedroomMatch || regionMatch || areaMatch || priceMatch
      : true;
  });

  const itemsToDisplay = filteredData;

  const handleToggleFilter = (filter: string) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  const handleRemoveFilter = (filterType: string, value: any) => {
    switch (filterType) {
      case "region":
        setRegionFilter((prev) => prev.filter((item) => item !== value));
        break;
      case "price":
        setPriceFilter(null);
        break;
      case "area":
        setAreaFilter(null);
        break;
      case "bedroom":
        setBedroomFilter(null);
        break;
      default:
        break;
    }
  };

  const handleResetFilters = () => {
    setRegionFilter([]);
    setAreaFilter(null);
    setBedroomFilter(null);
    setPriceFilter(null);
    setActiveFilter(null);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-20 px-40 relative">
      <div className="flex gap-4 mb-10 rounded-[10px] border border-gray-300 w-fit">
        <Filter
          title="რეგიონი"
          options={regions.map((region) => region.name)}
          onFilterChange={(selected) => setRegionFilter(selected as string[])}
          multiple={true}
          selected={regionFilter}
          isActive={activeFilter === "region"}
          onToggle={() => handleToggleFilter("region")}
        />

        <RangeFilter
          title="ფასი"
          onFilterChange={(selected) =>
            setPriceFilter(selected as { min: number; max: number } | null)
          }
          selected={priceFilter}
          isActive={activeFilter === "price"}
          onToggle={() => handleToggleFilter("price")}
        />

        <RangeFilter
          title="ფართობი"
          onFilterChange={(selected) =>
            setAreaFilter(selected as { min: number; max: number } | null)
          }
          selected={areaFilter}
          isActive={activeFilter === "area"}
          onToggle={() => handleToggleFilter("area")}
        />

        <BedroomsFilter
          title="საძინებლების რაოდენობა"
          onFilterChange={(selected) =>
            setBedroomFilter(selected as number | null)
          }
          selected={bedroomFilter}
          isActive={activeFilter === "bedroom"}
          onToggle={() => handleToggleFilter("bedroom")}
        />
      </div>

      <ChosenFilters
        filters={{
          region: regionFilter,
          price: priceFilter,
          area: areaFilter,
          bedroom: bedroomFilter,
        }}
        onRemove={handleRemoveFilter}
        onReset={handleResetFilters}
      />

      <div className="grid grid-cols-4 gap-5">
        {itemsToDisplay.length > 0 ? (
          itemsToDisplay.map((e) => <Item key={e.zip_code} e={e} />)
        ) : (
          <p>No items match your filter criteria</p>
        )}
      </div>
    </div>
  );
}
