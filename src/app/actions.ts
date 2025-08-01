"use server";

import { pool } from "@/lib/db";
import { registrationSchema } from "@/lib/schema";
import type { RegistrationSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function registerForConference(data: RegistrationSchema) {
  const validatedFields = registrationSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid data provided.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { firstName, lastName, streetAddress, email, affiliation, registrationDate, status, paymentMethod } = validatedFields.data;

  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO registrations (first_name, last_name, street_address, email, affiliation, registration_date, status, payment_method)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [firstName, lastName, streetAddress, email, affiliation, registrationDate, status, paymentMethod]
    );

    revalidatePath("/admin"); // Refresh the admin page data
    return { success: "Registration successful!" };
  } catch (error: any) {
    console.error("Database registration failed:", error);
    if (error.code === '23505') { // Unique violation
        return { error: "This email address has already been registered." };
    }
    return { error: "Something went wrong. Please try again." };
  } finally {
    client.release();
  }
}

export async function getRegistrations() {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT 
        first_name as "firstName", 
        last_name as "lastName", 
        street_address as "streetAddress",
        email, 
        affiliation, 
        registration_date as "registrationDate",
        status, 
        payment_method as "paymentMethod"
      FROM registrations 
      ORDER BY created_at DESC
    `);
    
    // The query result needs to be parsed into RegistrationSchema compatible objects.
    // Date objects might be returned as strings from the DB.
    const registrations = result.rows.map(row => ({
      ...row,
      registrationDate: new Date(row.registrationDate)
    }));
    
    return { registrations };
  } catch (error) {
    console.error("Failed to get registrations:", error);
    return { error: "Could not retrieve registrations.", registrations: [] };
  } finally {
    client.release();
  }
}
