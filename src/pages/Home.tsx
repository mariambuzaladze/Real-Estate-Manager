import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import Item from "../components/Item";
import RangeFilter from "../components/RangeFilter";
import BedroomsFilter from "../components/BedroomFilter";
import RegionFilter from "../components/RegionFilter";
import ChosenFilters from "../components/ChoosenFilters";

interface IRegion {
  id: string;
  name: string;
}

export default function Home() {
  const navigate = useNavigate();
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
          "https://api.real-estate-manager.redberryinternship.ge/api/regions"
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
      <div className="flex justify-between">
        <div className="flex gap-4 mb-10 rounded-[10px] border border-gray-300 w-fit p-1">
          <RegionFilter
            title="რეგიონი"
            options={regions.map((region) => region.name)}
            onFilterChange={(selected: string | string[] | null) => {
              if (Array.isArray(selected)) {
                setRegionFilter(selected);
              } else if (selected === null) {
                setRegionFilter([]);
              } else {
                setRegionFilter([selected]);
              }
            }}
            selected={regionFilter}
            isActive={activeFilter === "region"}
            onToggle={() => handleToggleFilter("region")}
            multiple
          />

          <RangeFilter
            title="საფასო კატეგორია"
            onFilterChange={(selected: { min: number; max: number } | null) =>
              setPriceFilter(selected)
            }
            selected={priceFilter}
            isActive={activeFilter === "price"}
            onToggle={() => handleToggleFilter("price")}
          />

          <RangeFilter
            title="ფართობი"
            onFilterChange={(selected: { min: number; max: number } | null) =>
              setAreaFilter(selected)
            }
            selected={areaFilter}
            isActive={activeFilter === "area"}
            onToggle={() => handleToggleFilter("area")}
          />

          <BedroomsFilter
            title="საძინებლების რაოდენობა"
            onFilterChange={(selected: number | null) =>
              setBedroomFilter(selected)
            }
            selected={bedroomFilter}
            isActive={activeFilter === "bedroom"}
            onToggle={() => handleToggleFilter("bedroom")}
          />
        </div>

        <div>
          <button
            onClick={() => {
              navigate("/addListing");
            }}
            className="text-white bg-[#F93B1D] rounded-[10px] px-4 py-3 hover:bg-[#DF3014]"
          >
            + ლისტინგის დამატება
          </button>
          <button className="text-[#F93B1D] border border-[1px] border-[#F93B1D] rounded-[10px] px-4 py-3 ml-4 hover:bg-[#F3F3F3]">
            + აგენტის დამატება
          </button>
        </div>
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
