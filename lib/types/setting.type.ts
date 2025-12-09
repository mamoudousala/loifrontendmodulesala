import { z } from "zod";
import { SettingsSchema } from "../schemas/settings.schema";

export type Settings = z.infer<typeof SettingsSchema>;