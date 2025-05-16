import { z } from "zod";
import { Gender, Occupation } from "@/app/types/enums";

export const userSchema = z.object({
  name: z.string().min(1),
  phone: z.string().regex(/^(\+886|0)[0-9]{9}$/, "Phone number must be a valid Taiwan phone number"),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "Gender must be MALE, FEMALE, or OTHER" })
  }),
  birthday: z.string().datetime({ message: "Invalid date format" })
    .refine((date) => new Date(date) <= new Date(), "Birthday cannot be in the future"),
  occupation: z.nativeEnum(Occupation, {
    errorMap: () => ({ message: "Invalid occupation type" })
  }),
  profileImage: z.string().url("Profile image must be a valid URL").optional().or(z.literal('')),
});

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  gender: z.nativeEnum(Gender, {
    required_error: "Please select a gender",
  }),
  birthday: z.date({
    required_error: "Birthday is required",
  }).refine(
    (date) => date <= new Date(),
    "Birthday cannot be in the future"
  ),
  occupation: z.nativeEnum(Occupation, {
    required_error: "Please select an occupation",
  }),
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(/^(\+886|0)[0-9]{9}$/, "Phone number must be a valid Taiwan phone number"),
  profileImage: z.string().url("Profile image must be a valid URL").optional().or(z.literal('')),
});

export type FormData = z.infer<typeof formSchema>;

