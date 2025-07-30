"use server";

import { promises as fs } from 'fs';
import path from 'path';
import { registrationSchema } from "@/lib/schema";
import type { RegistrationSchema } from "@/lib/schema";

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'registrations.json');

async function readRegistrations() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeRegistrations(data: any) {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}


export async function registerForConference(data: RegistrationSchema) {
  const validatedFields = registrationSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid data provided.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const allRegistrations = await readRegistrations();
    allRegistrations.push(validatedFields.data);
    await writeRegistrations(allRegistrations);

    return { success: "Registration successful!" };
  } catch (error) {
    console.error("Registration failed:", error);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function getRegistrations() {
  try {
    const registrations = await readRegistrations();
    return { registrations };
  } catch (error) {
    console.error("Failed to get registrations:", error);
    return { error: "Could not retrieve registrations.", registrations: [] };
  }
}