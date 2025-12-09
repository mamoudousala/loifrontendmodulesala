import { fetchKnowledgebaseById, fetchKnowledgebases } from "@/lib/api/knowledgebase";
import { Knowledgebase } from "@/lib/types/knowledgebase.type";
import { create } from "zustand";

interface KnowledgebaseState {
    knowledgebases: Knowledgebase[];
    knowledgebase: Knowledgebase | null;
    loading: boolean;
    error: string | null;

    fetchKnowledgebases: () => Promise<void>;
    fetchKnowledgebasesById: (id: number) => Promise<void>;
}

export const useKnowledgebaseStore = create<KnowledgebaseState>((set) => ({
    knowledgebases: [],
    knowledgebase: null,
    loading: false,
    error: null,

    fetchKnowledgebases: async () => {
        set({ loading: true, error: null });
        try {
            const data = await fetchKnowledgebases();
            set({ knowledgebases: data, loading: false })
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },


  fetchKnowledgebasesById: async (id) => {
    set({ loading: true, error: null });

    try {
      const data = await fetchKnowledgebaseById(id);
      set({ knowledgebase : data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

}))