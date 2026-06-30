import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { editPackage } from "@/redux/tourSlice";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  addPackageSchema,
  type AddPackageFormData,
} from "@/schemas/AddFormSchema";

import { X } from "lucide-react";

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

interface EditPackageProps {
  packageData: Tour;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPackage = ({
  packageData,
  setOpen,
}: EditPackageProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddPackageFormData>({
    resolver: zodResolver(addPackageSchema),
    defaultValues: {
      name: packageData.name,
      from: packageData.from,
      to: packageData.to,
      cost: packageData.cost,
    },
  });

  const onSubmit = (data: AddPackageFormData) => {
    dispatch(
      editPackage({
        ...packageData,

        name: data.name,
        from: data.from,
        to: data.to,
        cost: data.cost,

        offerPrice: packageData.hasOffer
          ? data.cost -
            (data.cost * packageData.offerPercent) / 100
          : 0,
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
        className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Edit Tour Package
          </h2>

          <X
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>
            <label className="mb-1 block text-sm font-medium">
              Package Name
            </label>

            <input
              {...register("name")}
              className="w-full rounded-lg border border-gray-300 p-3"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              From
            </label>

            <input
              {...register("from")}
              className="w-full rounded-lg border border-gray-300 p-3"
            />

            {errors.from && (
              <p className="mt-1 text-sm text-red-500">
                {errors.from.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Destination
            </label>

            <input
              {...register("to")}
              className="w-full rounded-lg border border-gray-300 p-3"
            />

            {errors.to && (
              <p className="mt-1 text-sm text-red-500">
                {errors.to.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Cost (₹)
            </label>

            <input
              type="number"
              {...register("cost", {
                valueAsNumber: true,
              })}
              className="w-full rounded-lg border border-gray-300 p-3"
            />

            {errors.cost && (
              <p className="mt-1 text-sm text-red-500">
                {errors.cost.message}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg border border-gray-300 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPackage;