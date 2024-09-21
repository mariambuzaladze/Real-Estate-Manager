import { Link } from "react-router-dom";
import LocationIcon from "/images/location-marker.svg";
import BedIcon from "/images/bed.svg";
import AreaIcon from "/images/Area.svg";
import ZipCode from "/images/Zip-code.svg";

export default function Item({ e }: { e: IRealEstate }) {
  return (
    <Link to={`/listing/${e.id}`} className="no-underline">
      <div className="border rounded-[14px] hover:shadow-[5px_5px_12px_0px_rgba(2,21,38,0.08)] transition-[0.4s] cursor-pointer">
        <div
          className="w-full h-[300px] bg-cover bg-no-repeat rounded-t-[14px] rounded-b-none p-5"
          style={{ backgroundImage: `url(${e.image})` }}
        >
          <div className="rounded-[15px] bg-[rgba(2,21,38,0.5)] p-1 w-fit">
            {e.is_rental === 0 ? (
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

        <div className="flex flex-col gap-5 p-5 ">
          <p className="text-[#021526] text-[28px] font-bold">
            {e.price.toLocaleString("en-US").replace(/,/g, " ")} ₾
          </p>

          <div className="flex">
            <img src={LocationIcon} alt="location icon" />
            <p className="text-[rgba(2,21,38,0.7)] text-[16px]">{e.address}</p>
          </div>

          <div className="flex gap-8">
            <div className="flex gap-1">
              <img src={BedIcon} alt="bed icon" />
              <p className="text-[rgba(2,21,38,0.7)] text-[16px]">
                {e.bedrooms}
              </p>
            </div>

            <div className="flex gap-1">
              <img src={AreaIcon} alt="area icon" />
              <p className="text-[rgba(2,21,38,0.7)] text-[16px]">
                {e.area} მ&sup2;
              </p>
            </div>

            <div className="flex gap-1">
              <img src={ZipCode} alt="zip code icon" />
              <p className="text-[rgba(2,21,38,0.7)] text-[16px]">
                {e.zip_code}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
