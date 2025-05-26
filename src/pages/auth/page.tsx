import AuthLayout from "../../layout/authLayout";
import { loginFormSchema }  from "./validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import logoTappp from "../../assets/LoginAssets/logo.png";
import api from "../../lib";
import { User } from "../../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  type loginValue = z.infer<typeof loginFormSchema>;
  const defaultValue: loginValue = {
    email: '',
    password: ''
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<loginValue>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: defaultValue
  });

  const onSubmit = async (data: loginValue) => {
    try {
      const response = await api.post("/login", data);
      console.log(response.data);
      if (response.data.token) {
        const user: User = response.data.user;
        // If login is successful
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", user.roles);
        localStorage.setItem("loggedIn", true);

        toast.success("Login successful! Welcome back.");

        if (user.roles == "Sales") {
          navigate("/manageleads");
        }
        
        if (user.roles == "Admin") {
          navigate("/dashboardAdmin");
        }
      }

      if (!response.data.token) {
        toast.error(response.data.message || "Login failed: Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
      // Cek apakah pengguna sudah login dengan token
      const token = localStorage.getItem("token");
      if (token) {
        const role = localStorage.getItem("role");
        if (role == "Sales") {
          navigate("/manageleads");
        }
        if (role == "Admin") {
          navigate("/dashboardAdmin");
        }
      }
  }, [navigate]);

  return (
    <AuthLayout>
      <div className="flex gap-[2rem] lg:flex-row md:flex-row flex-col p-[3rem] bg-blue-500 rounded-md items-center">
        <div className="flex items-center p-3">
          <img src={logoTappp} alt="Logo Tappp" className="h-[3rem]" />
        </div>
        <div className="flex">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-2">
              <label htmlFor="email">Email</label>
              <input type="text" className="p-2 border-none w-full rounded-md" {...register("email")} />
              {errors.email && <small className="text-red-600">{errors.email.message}</small>}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="password">Password</label>
              <input type="password" className="p-2 border-none w-full rounded-md" {...register("password")} />
              {errors.password && <small className="text-red-600">{errors.password.message}</small>}
            </div>
            <div className="flex">
              <button className="bg-green-400 px-[3rem] py-[0.5rem] w-full rounded-md hover:text-white hover:bg-green-600" disabled={isSubmitting}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
export default Login