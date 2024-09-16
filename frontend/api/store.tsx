import {create} from "zustand"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createJSONStorage, persist} from 'zustand/middleware';

interface StorageInterface {
  loginState: "not-login" | "logging" | "login";
  token: string | null;
  notificationToken: string | null;
  error: string | null;

  login: (token: string) => void;
  logout: () => void;
  setLoginState: (state: "not-login" | "login" | "logging") => void;
  setNotificationToken: (token: string | null) => void;
  setError: (error: string | null) => void;
}

export const storage = create<StorageInterface>()(
    persist(
        (set) => ({
            loginState: "not-login",
            token: null,
            notificationToken: null,
            error: null,

            login: (token: string) => set({loginState: "login", token, error: null}),
            logout: () => set({loginState: "not-login", token: null}),
            setLoginState: (state: "not-login" | "login" | "logging") => set({ loginState: state }),
            setNotificationToken: (token: string | null) => set({notificationToken: token}),
            setError: (error: string | null) => set({error: error}),
        }),
        {
            name: "app-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
