"use server";
import { db } from "@/db";
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from "@prisma/client";

export interface ConfigProps {
  color: CaseColor;
  finish: CaseFinish;
  material: CaseMaterial;
  model: PhoneModel;
  configId: string;
}
// RPC
export async function saveConfig({ color, finish, material, model, configId }: ConfigProps) {
  await db.configuration.update({
    where: { id: configId },
    data: { color, finish, material, model },
  });
}
