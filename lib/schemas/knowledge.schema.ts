import z from "zod";

export const KnowledgebaseSchema = z.object({
    id: z.number(),
    category: z.string(),
    title: z.string(),
    content: z.string(),
    lastUpdated: z.string(),
})

export const KnowledgebaseArraySchema =  z.array(KnowledgebaseSchema);