import { z } from "zod";
import { KnowledgebaseSchema } from "../schemas/knowledge.schema";

export type Knowledgebase = z.infer<typeof KnowledgebaseSchema>;