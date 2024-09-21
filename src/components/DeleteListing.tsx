import X from "/images/delete-circled-outline.svg";
import { forwardRef, useEffect, useRef } from "react";

const DeleteListing = forwardRef<HTMLDivElement, DeleteListingProps>(
  ({ deleteListing, setShowDelete }, ref) => {
    // Create a local ref to handle the case when ref is a function
    const innerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const currentRef = innerRef.current;
        if (currentRef && !currentRef.contains(event.target as Node)) {
          setShowDelete(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [setShowDelete]);

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div
          ref={(node) => {
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            innerRef.current = node; // Also assign to innerRef
          }}
          className="rounded-[20px] bg-white shadow-[5px_5px_12px_0px_rgba(2,21,38,0.08)] flex flex-col relative"
        >
          <img
            src={X}
            alt="x icon"
            className="self-end cursor-pointer"
            onClick={() => setShowDelete(false)}
          />
          <div className="px-[80px] py-[60px] flex flex-col gap-8">
            <p className="font-bold">გსურთ წაშალოთ ლისტინგი?</p>

            <div className="self-end flex gap-4">
              <button
                onClick={() => setShowDelete(false)}
                className="text-[#F93B1D] border border-[#F93B1D] rounded-[10px] px-4 py-3 hover:bg-[#F3F3F3]"
              >
                გაუქმება
              </button>
              <button
                onClick={deleteListing}
                className="text-white bg-[#F93B1D] rounded-[10px] px-4 py-3 hover:bg-[#DF3014]"
              >
                დაადასტურება
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default DeleteListing;
