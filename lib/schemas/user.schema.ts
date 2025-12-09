import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string(),
  twoFactorCode: z.string(),
  name: z.string(),
  role: z.string(),
});

export const UsersArraySchema = z.array(UserSchema);
