import { z } from "zod";

export const registrationStatus = [
  "Undergraduate student",
  "Graduate student",
  "Doctor (PhD)",
  "Professor",
  "Industry Employee",
] as const;

export const paymentMethods = ["Credit/Debit Card", "PayPal"] as const;

export const registrationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  streetAddress: z.string().min(1, { message: "Street address is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  affiliation: z.string().min(1, { message: "Affiliation is required." }),
  registrationDate: z.date({
    required_error: "A registration date is required.",
  }),
  status: z.enum(registrationStatus, {
    errorMap: () => ({ message: "Please select a valid status." }),
  }),
  paymentMethod: z.enum(paymentMethods, {
    errorMap: () => ({ message: "Please select a payment method." }),
  }),
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;
