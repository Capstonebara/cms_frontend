import { z } from "zod";

export const dashboardSchema = z.object({
  username: z.string(),
  fullname: z.string().min(1, "Full name is required"),
  apartment: z.string().min(1, "Apartment is required"),
  gender: z.enum(["M", "F"], { message: "Gender is required" }),
  phone: z.string().optional(),
  email: z.string().optional(),
});

export type DashboardSchema = z.infer<typeof dashboardSchema>;

export const faceSchema = z.object({
  loading: z.boolean(),
  success: z.boolean(),
  fail: z.boolean(),
  alreadyReg: z.boolean(),
  name: z.string(),
  faceStep: z.boolean(),
  ModelsLoaded: z.boolean(),
  faceDirection: z.string(),
  lookingFor: z.string(),
  zipPath: z.string(),
  isFinish: z.boolean(),
  tempName: z.string(),
  index: z.string(),
});

export type FaceSchema = z.infer<typeof faceSchema>;

export const accountSchema = z
  .object({
    username: z.string(),
    password: z.string(),
    re_password: z.string(),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Passwords must match",
    path: ["re_password"],
  });

export type AccountSchema = z.infer<typeof accountSchema>;

export const changePasswordSchema = z.object({
  username: z.string(),
  new_password: z.string(),
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
