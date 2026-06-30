import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./langSlice";
import favoriteReducer from "./favoritesSlice";
import recentActivityReducer from "./recentActivitySlice"
import tourPackageReducer from "./tourSlice"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistStorage = (storage as unknown as { default: typeof storage }).default || storage;

const favoritesPersistConfig = {
  key: "favorites",
  storage: persistStorage,
  timeout: 0, 
};

const languagePersistConfig = {
  key: "language",
  storage: persistStorage,
  timeout: 0, 
};

const recentAcivityPersistConfig = {
  key: "recentActivity",
  storage: persistStorage,
  timeout: 0
}
const tourPackagePersistConfig = {
  key: "tourPackage",
  storage: persistStorage,
  timeout: 0
}



const persistedFavoritesReducer = persistReducer(
  favoritesPersistConfig,
  favoriteReducer
);

const persistedLanguageReducer = persistReducer(
  languagePersistConfig,
  languageReducer
);

const persistedRecentActivityReducer = persistReducer(
  recentAcivityPersistConfig, recentActivityReducer
)
const persistedTourPackageReducer = persistReducer(
  tourPackagePersistConfig, tourPackageReducer
)

export const store = configureStore({
  reducer: {
    language: persistedLanguageReducer,
    favorites: persistedFavoritesReducer,
    recentActivity: persistedRecentActivityReducer,
    tourPackage: persistedTourPackageReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;