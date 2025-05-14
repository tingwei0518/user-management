import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1),
  phone: z.string().regex(/^(\+886|0)[0-9]{9}$/, "Phone number must be a valid Taiwan phone number"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    errorMap: () => ({ message: "Gender must be MALE, FEMALE, or OTHER" })
  }),
  birthday: z.string().datetime({ message: "Invalid date format" })
    .refine((date) => new Date(date) <= new Date(), "Birthday cannot be in the future"),
  occupation: z.enum(["STUDENT", "ENGINEER", "TEACHER", "UNEMPLOYED"], {
    errorMap: () => ({ message: "Invalid occupation type" })
  }),
  profileImage: z.string().url("Profile image must be a valid URL").nullish(),
});

