import { useParams } from "react-router-dom";
import GoBack from "/images/Icon-left.svg";
import Location from "/images/location-marker.svg";
import Area from "/images/Area.svg";
import Bed from "/images/bed.svg";
import ZipCode from "/images/Zip-code.svg";
import Email from "/images/Shape.svg";
import Phone from "/images/Phone.svg";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";
import Item from "../components/Item";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function ListingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useContext(MyContext);

  const listing = data?.find((item) => item.id === Number(id));

  if (!listing) {
    return <p>Listing not found</p>;
  }

  const [agent, setAgent] = useState<Agent | null>(null);
  const [relatedItems, setRelatedItems] = useState<IRealEstate[]>([]);
  const [relatedRegions, setRelatedRegions] = useState<Region[]>([]);

  const fetchAgent = async () => {
    try {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/agents",
        {
          headers: {
            Authorization: "Bearer 9cfd8995-371f-4210-8952-8ca1881b89be",
          },
        }
      );

      const agentsData: Agent[] = await response.json();
      const foundAgent = agentsData.find((a) => a.id === listing.agent_id);
      setAgent(foundAgent || null);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const fetchRegions = async () => {
    try {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/regions"
      );
      const regionsData = await response.json();

      const filteredRegions = regionsData.filter(
        (region: Region) => region.id === listing.region_id
      );
      setRelatedRegions(filteredRegions);
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  const fetchRelatedItems = async () => {
    try {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer 9cfd8995-371f-4210-8952-8ca1881b89be",
          },
        }
      );
      const itemsData: IRealEstate[] = await response.json();

      const filteredItems = itemsData.filter(
        (item) => item.region_id === listing.region_id && item.id !== listing.id
      );
      setRelatedItems(filteredItems);
    } catch (error) {
      console.error("Error fetching related items:", error);
    }
  };

  const deleteListing = async () => {
    if (!listing) return;

    try {
      const response = await fetch(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${listing.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer 9cfd8995-371f-4210-8952-8ca1881b89be",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the listing");
      }

      navigate("/");
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  useEffect(() => {
    fetchAgent();
    fetchRelatedItems();
    fetchRegions();
  }, []);

  return (
    <div className="flex flex-col px-[160px] py-[60px] gap-6">
      <img
        src={GoBack}
        alt="go back arrow"
        onClick={() => navigate("/")}
        className="w-8 h-8 cursor-pointer"
      />
      <div className="flex gap-[68px]">
        <div className="w-[839px] h-[670px] flex justify-center relative">
          <img src={listing.image} alt="listing" />
          <div className="rounded-[15px] bg-[rgba(2,21,38,0.5)] p-1 w-fit absolute left-[50px] top-[50px]">
            {listing.is_rental === 0 ? (
              <span className="text-white font-bold tracking-[0.48px]">
                იყიდება
              </span>
            ) : (
              <span className="text-white font-bold tracking-[0.48px]">
                ქირავდება
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-[48px] text-[#021526] font-bold">
              {listing.price.toLocaleString("en-US").replace(/,/g, " ")} ₾
            </p>
            <div className="flex gap-2">
              <img src={Location} alt="location icon" />
              <p className="text-[24px] text-[#808A93]">{listing.address}</p>
            </div>
            <div className="flex gap-2">
              <img src={Area} alt="area icon" />
              <p className="text-[24px] text-[#808A93]">
                ფართი {listing.area} მ²
              </p>
            </div>
            <div className="flex gap-2">
              <img src={Bed} alt="bed icon" />
              <p className="text-[24px] text-[#808A93]">
                საძინებელი {listing.bedrooms}
              </p>
            </div>
            <div className="flex gap-2">
              <img src={ZipCode} alt="zip code icon" />
              <p className="text-[24px] text-[#808A93]">
                საფოსტო ინდექსი {listing.zip_code}
              </p>
            </div>
            <p className="text-[24px] text-[#808A93]">{listing.description}</p>
          </div>

          {agent && (
            <div className="rounded-[8px] border border-[#DBDBDB] flex flex-col gap-2">
              <div className="flex items-center">
                <img
                  src={agent.image}
                  alt="agent"
                  className="w-[72px] h-[72px] rounded-full"
                />
                <p className="ml-2">{agent.name}</p>
              </div>
              <div>
                <div className="flex gap-1">
                  <img src={Email} alt="email icon" />
                  <p className="text-[24px] text-[#808A93]">{agent.email}</p>
                </div>
                <div className="flex gap-1">
                  <img src={Phone} alt="phone icon" />
                  <p className="text-[24px] text-[#808A93]">{agent.number}</p>
                </div>
              </div>
            </div>
          )}

          <button
            className="rounded-[8px] border border-[#676E76] p-[10px] text-[#808A93]"
            onClick={deleteListing}
          >
            ლისტინგის წაშლა
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-[28px] font-bold">ბინები მსგავს ლოკაციაზე</h2>
        <Slider {...settings}>
          {relatedItems.map((item) => (
            <Item key={item.id} e={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
