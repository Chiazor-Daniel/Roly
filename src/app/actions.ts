"use server";

import { registrationSchema } from "@/lib/schema";
import type { RegistrationSchema } from "@/lib/schema";

export async function registerForConference(data: RegistrationSchema) {
  const validatedFields = registrationSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid data provided.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate network delay and a database operation
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In a real application, you would save validatedFields.data to your database here.
    console.log("Registration data saved:", validatedFields.data);

    return { success: "Registration successful!" };
  } catch (error) {
    console.error("Registration failed:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
