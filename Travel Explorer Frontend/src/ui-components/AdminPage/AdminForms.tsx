import type { RootState } from "@/redux/store";
import { Plus, MoreVertical, Edit2, Tag, Trash2, Percent } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import AddPackage from "./AddPackage";
import EditPackage from "./EditPackage";
import ApplyOffer from "./ApplyOffer";
import type { Tour } from "@/redux/tourSlice";
import { useState, useEffect } from "react";
import { deletePackage, removeOffer } from "@/redux/tourSlice";

const AdminForms = () => {
  const Tours = useSelector(
    (state: RootState) => state.tourPackage.tourPackages,
  );

  // Modal Visibility States
  const [AddOpen, setAddOpen] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);
  const [OfferOpen, setOfferOpen] = useState(false);
  const dispatch = useDispatch();

  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  useEffect(() => {
    const handleOutsideClick = () => setActiveDropdownId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleDelete = (id: number) => {
    dispatch(deletePackage(id));
    console.log("Delete Called");
    setActiveDropdownId(null);
  };
  const handleOfferRemove = (id: number) => {
    dispatch(removeOffer(id));
    // console.log("Delete Called");
    setActiveDropdownId(null);
  };
  

  return (
    <div className="w-full flex flex-col mb-10">
      <div className="flex justify-between w-full items-center mb-4">
        <p className="font-bold text-lg">Tour Package Management</p>
        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center justify-center gap-2 h-10 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer rounded-lg w-full sm:w-auto"
        >
          <Plus size={18} />
          <span>Create Package</span>
        </button>
      </div>

      {AddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
          <AddPackage setOpen={setAddOpen} />
        </div>
      )}

      {EditOpen && selectedTour && (
        <EditPackage setOpen={setEditOpen} packageData={selectedTour} />
      )}
      {OfferOpen && selectedTour && <ApplyOffer packageData={selectedTour} setOpen={setOfferOpen} />}

      <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100 max-h-100">
        <table className="w-full min-w-250 text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="py-4 px-6 text-sm font-semibold text-gray-500">
                Package Name
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500">
                From
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500">
                To
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500">
                Cost
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500">
                Status
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500">
                Has Offer
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500">
                Offer Price
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500">
                Total Bookings
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-500 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100/70">
            {Tours &&
              Tours.map((tour: Tour) => (
                <tr
                  key={tour.id}
                  className="hover:bg-gray-50/30 transition-colors"
                >
                  <td className="py-5 px-6 font-bold text-slate-800 text-base">
                    {tour.name}
                  </td>
                  <td className="py-5 px-6 text-gray-500 font-medium">
                    {tour.from}
                  </td>
                  <td className="py-5 px-6 text-gray-500 font-medium">
                    {tour.to}
                  </td>
                  <td className="py-5 px-6 text-slate-800 font-semibold">
                    ${tour.cost.toLocaleString()}
                  </td>
                  <td className="py-5 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                        tour.state === "active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {tour.state.charAt(0).toUpperCase() + tour.state.slice(1)}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    {tour.hasOffer ? (
                      <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded text-sm">
                        {tour.offerPercent}% Off
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">N/A</span>
                    )}
                  </td>
                  <td className="py-5 px-6 font-medium text-slate-700">
                    {tour.hasOffer ? (
                      `$${tour.offerPrice.toLocaleString()}`
                    ) : (
                      <span className="text-gray-400 text-sm">N/A</span>
                    )}
                  </td>
                  <td className="py-5 px-6 text-slate-700 font-medium">
                    {tour.bookings.toLocaleString()}
                  </td>

                  <td className="py-5 px-6 text-right relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdownId(
                          activeDropdownId === tour.id ? null : tour.id,
                        );
                      }}
                      className="text-gray-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {activeDropdownId === tour.id && (
                      <div className="absolute right-6 top-12 z-50 w-44 bg-white rounded-xl border border-gray-100 shadow-xl py-1 text-left animate-in fade-in slide-in-from-top-1 duration-150">
                        <button
                          onClick={() => {
                            setSelectedTour(tour);
                            setEditOpen(true);
                            setActiveDropdownId(null);
                          }}
                          className="w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-gray-50 flex items-center gap-2 font-medium cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4 text-gray-400" />
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setSelectedTour(tour);
                            setOfferOpen(true);
                            setActiveDropdownId(null);
                          }}
                          className="w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-gray-50 flex items-center gap-2 font-medium cursor-pointer"
                        >
                          <Percent className="w-4 h-4 text-gray-400" />
                          Apply Offer
                        </button>

                        <button
                          disabled={!tour.hasOffer}
                          onClick={() => {
                            handleOfferRemove(tour.id);
                          }}
                          className={`w-full px-4 py-2.5 text-sm flex items-center gap-2 font-medium ${
                            tour.hasOffer
                              ? "text-slate-700 hover:bg-gray-50 cursor-pointer"
                              : "text-gray-300 cursor-not-allowed"
                          }`}
                        >
                          <Tag className="w-4 h-4" />
                          Remove Offer
                        </button>

                        <div className="border-t border-gray-100 my-1" />

                        <button
                          onClick={() => {
                            handleDelete(tour.id);
                          }}
                          className="w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50/60 flex items-center gap-2 font-medium cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminForms;

function dispatch(arg0: {
  payload: number;
  type: "tourpackages/deletePackage";
}) {
  throw new Error("Function not implemented.");
}
