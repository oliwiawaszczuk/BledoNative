import {create} from "zustand"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createJSONStorage, persist} from 'zustand/middleware';
import {Platform} from "react-native";

// const webStorage = {
//   getItem: (name: string) => {
//     if (typeof window !== "undefined") {
//       const item = localStorage.getItem(name);
//       console.log(`Getting item: ${name} =`, item);
//       return Promise.resolve(item);
//     }
//     return Promise.resolve(null);
//   },
//   setItem: (name: string, value: string) => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem(name, value);
//       console.log(`Setting item: ${name} =`, value);
//     }
//     return Promise.resolve();
//   },
//   removeItem: (name: string) => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem(name);
//       console.log(`Removing item: ${name}`);
//     }
//     return Promise.resolve();
//   },
// };


// const chooseStorage = () => {
//     return Platform.OS === 'web' ? webStorage : AsyncStorage;
// };

interface StorageInterface {
    loginState: "checking-autologin" | "not-login" | "logging" | "login";
    token: string | null;
    notificationToken: string | null;
    error: string | null;
    api_host: string | null;

    load_api_host: () => void;
    login: (token: string) => void;
    logout: () => void;
    setLoginState: (state: "checking-autologin" | "not-login" | "login" | "logging") => void;
    setNotificationToken: (token: string | null) => void;
    setError: (error: string | null) => void;
}

export const storage = create<StorageInterface>()(
    persist(
        (set) => ({
            loginState: "checking-autologin",
            token: null,
            notificationToken: null,
            error: null,
            api_host: null,

            load_api_host: () => set({api_host: "http://192.168.1.191:5000/api"}),
            login: (token: string) => set({loginState: "login", token, error: null}),
            logout: () => set({loginState: "not-login", token: null}),
            setLoginState: (state: "checking-autologin" | "not-login" | "login" | "logging") => set({loginState: state}),
            setNotificationToken: (token: string | null) => set({notificationToken: token}),
            setError: (error: string | null) => set({error: error}),
        }),
        {
            name: "app-storage",
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                console.log('Connecting app-storage...');
                state.load_api_host();
            },
        }
    )
);
