"use server";
import { api } from "@/trpc/server";

export async function UpdateQrCodeDB(text:string) {
  await api.qrTracker.incrementCount({text});
}
