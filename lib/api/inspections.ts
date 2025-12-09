import { axiosInstance } from "../axios/instance";
import { InspectionSchema, InspectionsArraySchema } from "../schemas/inspection.schema";
import type { Inspection } from "../types/inspection.type";

export async function fetchOpenInspections(): Promise<Inspection[]> {
    const res = await axiosInstance.get("/openInspections");
    return InspectionsArraySchema.parse(res.data);
}

export async function fetchCompletedInspections(): Promise<Inspection[]> {
    const res = await axiosInstance.get("/completedInspections");
    return InspectionsArraySchema.parse(res.data);
}

export async function fetchOpenInspectionById(id: number): Promise<Inspection> {
    const res = await axiosInstance.get(`openInspections/${id}`);
    return InspectionSchema.parse(res.data);
}

export async function fetchCompletedById(id: number): Promise<Inspection> {
    const res = await axiosInstance.get(`completedInspections/${id}`);
    return InspectionSchema.parse(res.data);
}