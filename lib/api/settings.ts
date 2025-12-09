import { Settings } from "../types/setting.type";
import { axiosInstance } from "../axios/instance";
import { SettingsSchema } from "../schemas/settings.schema";

export async function fetchSettings(): Promise<Settings> {
    const res = await axiosInstance.get("/settings");
    return SettingsSchema.parse(res.data);
}