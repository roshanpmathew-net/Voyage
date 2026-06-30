import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { AppDispatch } from "@/redux/store";
import { addPackage } from "@/redux/tourSlice";

interface AddFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
import {
  addPackageSchema,
  type AddPackageFormData,
} from "@/schemas/AddFormSchema";
import { X } from "lucide-react";

const AddPackage = ({ setOpen }: AddFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddPackageFormData>({
    resolver: zodResolver(addPackageSchema),
    defaultValues: {
      name: "",
      from: "",
      to: "",
      cost: 0,
    },
  });

  const onSubmit = (data: AddPackageFormData) => {
    dispatch(
      addPackage({
        id: Date.now(),
        name: data.name.trim(),
        from: data.from.trim(),
        to: data.to.trim(),
        cost: data.cost,

        hasOffer: false,
        offerPercent: 0,
        offerPrice: 0,

        state: "active",
        bookings: 0,
      }),
    );

    reset();
    setOpen(false);
  };

  return (
    <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-md">
      <div className="w-full flex justify-between">
        <h2 className="mb-6 text-2xl font-bold">Add Tour Package</h2>
        <X className="cursor-pointer" onClick={() => setOpen(false)} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Package Name</label>

          <input
            {...register("name")}
            placeholder="Bali Paradise Escape"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">From</label>

          <input
            {...register("from")}
            placeholder="Bangalore"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
          />

          {errors.from && (
            <p className="mt-1 text-sm text-red-500">{errors.from.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Destination</label>

          <input
            {...register("to")}
            placeholder="Bali"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
          />

          {errors.to && (
            <p className="mt-1 text-sm text-red-500">{errors.to.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Cost ($)</label>

          <input
            type="number"
            {...register("cost", {
              valueAsNumber: true,
            })}
            placeholder="75000"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
          />

          {errors.cost && (
            <p className="mt-1 text-sm text-red-500">{errors.cost.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            w-full
            rounded-lg
            bg-blue-600
            px-5
            py-3
            font-medium
            text-white
            transition-all
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:opacity-50
            cursor-pointer
          "
        >
          Create Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
