import { z } from "zod";

export const InspectionSchema = z.object({
  id: z.number(),
  address: z.string(),
  datePlanned: z.string().optional(),
  dateCompleted: z.string().optional(),
  priority: z.string().optional(),
  status: z.string().optional(),
  type: z.string(),
  assignedTo: z.number().optional(),
  notes: z.string().optional(),
  reportUrl: z.string().optional(),
  issuesFound: z
    .array(
      z.object({
        id: z.number(),
        title: z.string(),
        severity: z.string(),
      })
    )
    .optional()
});

export const InspectionsArraySchema = z.array(InspectionSchema);
