import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Tour {
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

interface TourState {
  tourPackages: Tour[];
}

const initialState: TourState = {
  tourPackages: [
    {
      id: 1,
      name: "Bali Paradise Escape",
      from: "Bangalore",
      to: "Bali",
      cost: 75000,
      hasOffer: true,
      offerPercent: 15,
      offerPrice: 63750,
      state: "active",
      bookings: 128,
    },
    {
      id: 2,
      name: "Swiss Alps Adventure",
      from: "Mumbai",
      to: "Switzerland",
      cost: 180000,
      hasOffer: false,
      offerPercent: 0,
      offerPrice: 0,
      state: "active",
      bookings: 67,
    },
  ],
};
const TourPackageSlice = createSlice({
  name: "tourpackages",
  initialState,
  reducers: {
    addPackage: (state, action: PayloadAction<Tour>) => {
      const exists = state.tourPackages.findIndex(
        (item) => item.name === action.payload.name,
      );

      if (exists !== -1) return;

      state.tourPackages.push(action.payload);
    },

    editPackage: (state, action: PayloadAction<Tour>) => {
      const index = state.tourPackages.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (index !== -1) {
        state.tourPackages[index] = action.payload;
      }
    },

    deletePackage: (state, action: PayloadAction<number>) => {
      state.tourPackages = state.tourPackages.filter(
        (item) => item.id !== action.payload,
      );
    },

    applyOffer: (
      state,
      action: PayloadAction<{
        id: number;
        offerPercent: number;
      }>,
    ) => {
      const tour = state.tourPackages.find(
        (item) => item.id === action.payload.id,
      );

      if (!tour) return;

      tour.hasOffer = true;
      tour.offerPercent = action.payload.offerPercent;
      tour.offerPrice =
        tour.cost - (tour.cost * action.payload.offerPercent) / 100;
    },

    removeOffer: (state, action: PayloadAction<number>) => {
      const tour = state.tourPackages.find(
        (item) => item.id === action.payload,
      );

      if (!tour) return;

      tour.hasOffer = false;
      tour.offerPercent = 0;
      tour.offerPrice = 0;
    },

    toggleStatus: (state, action: PayloadAction<number>) => {
      const tour = state.tourPackages.find(
        (item) => item.id === action.payload,
      );

      if (!tour) return;

      tour.state = tour.state === "active" ? "inactive" : "active";
    },
  },
});

export const {
  addPackage,
  editPackage,
  deletePackage,
  applyOffer,
  removeOffer,
  toggleStatus,
} = TourPackageSlice.actions;

export default TourPackageSlice.reducer;
