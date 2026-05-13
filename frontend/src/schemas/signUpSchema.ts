import z from "zod";

const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "Minimum 3 letters")
      .max(20, "maxium 20 letters")
      .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Apenas letras são permitidas")
      .toLowerCase(),
    lastName: z
      .string()
      .min(3, "Minimum 3 letters")
      .max(40, "maxium 40 letters")
      .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Apenas letras são permitidas")
      .toLowerCase(),
    email: z.email("Type a valid email").trim().toLowerCase(),
    phone: z.string().trim(),
    password: z
      .string()
      .min(6, "Minimum 6 characters")
      .max(20, "Maxium 20 characters")
      .regex(/[A-Z]/, "Password must contain a capital letter")
      .regex(/[0-9]/, "Password must contain a number")
      .regex(/[!@#$%^&*]/, "Password must contain a special characters")
      .trim(),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "The password are not the same",
    path: ["confirmPassword"],
  });

  export const requiredSignUpSchema = signUpSchema.required();
  
  export type SignUpFormData = z.infer<typeof requiredSignUpSchema>;