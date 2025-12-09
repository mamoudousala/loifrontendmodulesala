import { create } from "zustand";
import type { Inspection } from "@/lib/types/inspection.type";
import {
  fetchOpenInspections,
  fetchOpenInspectionById,
  fetchCompletedInspections,
  fetchCompletedById,
} from "@/lib/api/inspections";

interface InspectionState {
    open: Inspection[];
    activeInspection: Inspection | null;

    completed: Inspection[];
    done: Inspection | null;

    loading: boolean;
    error: string | null;

    fetchOpen: () => Promise<void>;
    fetchOpenById: (id: number) => Promise<void>;

    fetchCompleted: () => Promise<void>;
    fetchCompletedById: (id: number) => Promise<void>;
}

export const useInspectionStore = create<InspectionState>((set) => ({
    open: [],
    activeInspection: null,

    completed: [],
    done: null,

    loading: false,
    error: null,

  fetchOpen: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchOpenInspections();
      set({ open: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchOpenById: async (id) => {
    set({ loading: true, error: null });

    try {
      const data = await fetchOpenInspectionById(id);
      set({ activeInspection: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchCompleted: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCompletedInspections();
      set({ completed: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }    
  },

fetchCompletedById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCompletedById(id);
      set({ done: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));