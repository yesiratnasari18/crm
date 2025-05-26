import { z } from "zod";
const loginFormSchema = z.object({
  email: z.string({
    message: `Email tidak boleh kosong!`
  })
  .email({
    message: `Gunakan email yang valid!`
  }),
  password: z.string({
    message: `Password tidak boleh kosong!`
  })
  .min(1, {
    message: `Password tidak boleh kosong!`
  })
});
export { loginFormSchema };