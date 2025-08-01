"use server";

import { promises as fs } from 'fs';
import path from 'path';
import { registrationSchema } from "@/lib/schema";
import type { RegistrationSchema } from "@/lib/schema";

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'registrations.json');

async function readRegistrations() {
  try {
    // This will only work in a local environment, not on Vercel.
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// This function is kept for local development but will not be used by the deployed app.
async function writeRegistrations(data: any) {
    try {
      await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
      await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error("Failed to write to local file, this is expected on Vercel:", error);
    }
}


export async function registerForConference(data: RegistrationSchema) {
  const validatedFields = registrationSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid data provided.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  // On a live server, we can't write to the filesystem.
  // We will just return success and let the client handle saving to local storage.
  if (process.env.VERCEL) {
     return { success: "Registration successful!" };
  }

  // The local file-based storage for development environments.
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
  // This server action will only return registrations when run locally.
  // On the client, we will fetch from local storage.
  if (process.env.VERCEL) {
      return { registrations: [] };
  }

  try {
    const registrations = await readRegistrations();
    return { registrations };
  } catch (error) {
    console.error("Failed to get registrations:", error);
    return { error: "Could not retrieve registrations.", registrations: [] };
  }
}
