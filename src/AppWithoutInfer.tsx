import "./App.css"
import { ZodType, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

type FormData = {
   firstName: string
   lastName: string
   email: string
   age: number
   password: string
   confirmPassword: string
}

const schema: ZodType<FormData> = z
   .object({
      firstName: z
         .string()
         .min(2)
         .max(30)
         .refine((value) => value.charAt(0) === value.charAt(0).toUpperCase(), {
            message: "First name must start with a capital letter",
         }),
      lastName: z
         .string()
         .min(2)
         .max(30)
         .refine((value) => /^[A-Z]/.test(value), {
            message: "Last name must start with a capital letter",
         }),
      email: z.string().email(),
      age: z.number().min(18).max(70),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
   })

function App() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({ resolver: zodResolver(schema) })

   const submitData = (data: FormData) => {
      console.log("IT WORKED", data)
   }

   console.log(errors)

   return (
      <div className="App">
         <form onSubmit={handleSubmit(submitData)}>
            <label> First Name: </label>
            <input type="text" {...register("firstName")} />
            {errors.firstName && <div className="error-message">{errors.firstName.message}</div>}
            <label> Last Name: </label>
            <input type="text" {...register("lastName")} />
            {errors.lastName && <span> {errors.lastName.message}</span>}
            <label> Email: </label>
            <input type="email" {...register("email")} />
            {errors.email && <span> {errors.email.message}</span>}
            <label> Age </label>
            <input type="number" {...register("age", { valueAsNumber: true })} />
            {errors.age && <span> {errors.age.message}</span>}
            <label> Password: </label>
            <input type="password" {...register("password")} />
            {errors.password && <span> {errors.password.message}</span>}
            <label> Confirm Password: </label>
            <input type="password" {...register("confirmPassword")} />
            {errors.confirmPassword && <span> {errors.confirmPassword.message}</span>}

            <input type="submit" />
         </form>
      </div>
   )
}

export default App
