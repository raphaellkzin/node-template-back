import z from "zod";

export const loginRequestSchema = z.object({
  // PODE SER CPF OU EMAIL
  username: z.string(),
  password: z.string(),
});

export type ILoginRequest = z.infer<typeof loginRequestSchema>;
