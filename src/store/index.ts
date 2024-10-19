import {
  combineReducers,
  configureStore,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { PERSIST_KEY } from "@lib/constants";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseAPI } from "./api";
import appReducer, { clearToken } from "./reducers/app";
import userReducer, { logout } from "./reducers/users";
import { auth } from "@lib/links";
import axios from "axios";

const rootReducer = combineReducers({
  [baseAPI.reducerPath]: baseAPI.reducer,
  userReducer,
  appReducer,
});

const persistConfig = {
  key: PERSIST_KEY,
  version: 1,
  storage,
  blacklist: [baseAPI.reducerPath, "userReducer"],
};

const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action: any) => {
    if (action?.payload?.status === 401) {
      axios.post(auth.serverLogout.url).then(() => {
        api.dispatch(logout());
        api.dispatch(baseAPI.util.resetApiState());
        api.dispatch(clearToken());

        // window.location.href =
        //   auth.login.url + `?redirectTo=${window.location.pathname}`;
      });
      return next(action);
    } else {
      if (isRejectedWithValue(action)) {
        const isNotAllowed = action.payload?.data?.message?.includes(
          "you are not allowed to"
        );
        if (!isNotAllowed) {
        }
      }
    }

    return next(action);
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(baseAPI.middleware, rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
