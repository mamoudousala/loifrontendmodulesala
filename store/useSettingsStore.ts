import { fetchSettings } from "@/lib/api/settings";
import { Settings } from "@/lib/types/setting.type";
import { create } from "zustand";

interface SettingsState {
    settings: Settings | null,
    loading: boolean;
    error: string | null;

    fetchSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
    settings: null,
    loading: false,
    error: null,

    fetchSettings: async () => {
        set({ loading: true, error: null });
        try {
            const data = await fetchSettings();
            set({ settings: data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },
}))