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

export const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  birthday: z.date({
    required_error: "Birthday is required",
  }).refine(
    (date) => date <= new Date(),
    "Birthday cannot be in the future"
  ),
  occupation: z.enum(["Student", "Engineer", "Teacher", "Unemployed"], {
    required_error: "Please select an occupation",
  }),
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(/^(\+886|0)[0-9]{9}$/, "Phone number must be a valid Taiwan phone number"),
  profileImage: z.instanceof(File)
    .optional()
    .refine((file) => {
      if (file) {
        return file.size <= 5 * 1024 * 1024; // 5MB
      }
      return true;
    }, "File size should be less than 5MB")
    .refine((file) => {
      if (file) {
        return ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
      }
      return true;
    }, "Only .jpg, .png, and .gif formats are supported"),
});

export type FormData = z.infer<typeof formSchema>;

