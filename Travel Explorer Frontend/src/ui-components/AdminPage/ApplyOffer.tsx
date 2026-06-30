import { useDispatch } from "react-redux";
import { useState } from "react";
import { X } from "lucide-react";

import type { AppDispatch } from "@/redux/store";
import { applyOffer } from "@/redux/tourSlice";

interface Tour {
  id: number;
  name: string;
  from: string;
  to: string;
  cost: number;
  hasOffer: boolean;
  offerPercent: number;
  offerPrice: number;
  state: "active" | "inactive";
  bookings: number;
}

interface ApplyOfferProps {
  packageData: Tour;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ApplyOffer = ({
  packageData,
  setOpen,
}: ApplyOfferProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [offerPercent, setOfferPercent] = useState("");

  const percent = Number(offerPercent);

  const discountedPrice =
    packageData.cost -
    (packageData.cost * (percent || 0)) / 100;

  const handleApplyOffer = () => {
    if (!offerPercent) return;

    if (percent <= 0 || percent > 100) return;

    dispatch(
      applyOffer({
        id: packageData.id,
        offerPercent: percent,
      })
    );

    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Apply Offer
          </h2>

          <X
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Package
            </label>

            <div className="rounded-lg border bg-gray-50 p-3 font-medium">
              {packageData.name}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Original Price
            </label>

            <div className="rounded-lg border bg-gray-50 p-3">
              ₹{packageData.cost.toLocaleString()}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Offer Percentage
            </label>

            <input
              type="number"
              min="1"
              max="100"
              value={offerPercent}
              onChange={(e) =>
                setOfferPercent(e.target.value)
              }
              placeholder="Enter discount %"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
            />

            {percent > 100 && (
              <p className="mt-1 text-sm text-red-500">
                Discount cannot exceed 100%
              </p>
            )}
          </div>

          {offerPercent && percent > 0 && percent <= 100 && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="font-medium">
                Offer Preview
              </p>

              <div className="mt-2 flex items-center gap-3">
                <span className="text-gray-500 line-through">
                  ₹{packageData.cost.toLocaleString()}
                </span>

                <span className="font-bold text-green-600">
                  ₹{discountedPrice.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg border border-gray-300 py-3 cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleApplyOffer}
              className="flex-1 rounded-lg bg-green-600 py-3 text-white hover:bg-green-700 cursor-pointer"
            >
              Apply Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyOffer;