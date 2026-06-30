import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Activity {
  id: number;
  activity: string;
  time: string;
}

interface RecentActivityState {
  recentActivities: Activity[];
}

const initialState: RecentActivityState = {
  recentActivities: [],
};

const RecentActivitySlice = createSlice({
  name: "recentActivites",
  initialState,
  reducers: {
    recordActivity: (state, action: PayloadAction<Activity>) => {
      const existingIndex = state.recentActivities.findIndex(
        (item) => item.activity === action.payload.activity,
      );

      if (existingIndex !== -1) {
        state.recentActivities.splice(existingIndex, 1);
      }

      state.recentActivities.unshift(action.payload);

      if (state.recentActivities.length > 10) {
        state.recentActivities.pop();
      }
    },
  },
});

export const { recordActivity } = RecentActivitySlice.actions;
export default RecentActivitySlice.reducer;
