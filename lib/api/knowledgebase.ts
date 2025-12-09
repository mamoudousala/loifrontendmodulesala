import { axiosInstance } from "../axios/instance";
import { KnowledgebaseArraySchema, KnowledgebaseSchema } from "../schemas/knowledge.schema";
import { Knowledgebase } from "../types/knowledgebase.type";

export async function fetchKnowledgebases(): Promise<Knowledgebase[]> {
    const res = await axiosInstance.get("/knowledgeBase");
    return KnowledgebaseArraySchema.parse(res.data);
}

export async function fetchKnowledgebaseById(id: number): Promise<Knowledgebase> {
    const res = await axiosInstance.get(`/knowledgeBase/${id}`);
    return KnowledgebaseSchema.parse(res.data);
}