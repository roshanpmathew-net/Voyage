import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "sonner";



interface FavoritesState {
  favorites: string[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    
    toggleFavorite: (state, action: PayloadAction<string>) => {
    const code = action.payload;

    if (state.favorites.includes(code)) {
        state.favorites = state.favorites.filter(
        (fav) => fav !== code
        );
        // toast.success("Removed from Favorites");
    } else {
        state.favorites.push(code);
        // toast.success("Added to Favorites");

    }
    },


  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;