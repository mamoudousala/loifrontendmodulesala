import { z } from "zod";
import { InspectionSchema } from "../schemas/inspection.schema";

export type Inspection = z.infer<typeof InspectionSchema>;
