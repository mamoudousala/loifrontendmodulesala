import z from "zod";

export const SettingsSchema = z.object({
    notifications: z.array(
        z.object({
            email: z.boolean(),
            push: z.boolean(),
    })
    ),
    theme: z.string(),
    language: z.string(),
})