import { z } from "zod";

const todoSchema = z.object({
  title: z.string()
    .min(3, "Task must be at least 3 characters")
    .max(50, "Task cannot exceed 50 characters"),
  datetime: z.string().min(1, "Datetime is required")
});

type FormData = z.infer<typeof todoSchema>;

export { todoSchema };
export type { FormData };
