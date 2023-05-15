import { NextPage } from "next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "~/utils/api";
import { useRouter } from "next/router";


const loginSchema = z.object({
  firstName: z.string().min(3, {message: 'FirstName is required'}),
  LastName: z.string().min(3, {message: 'LastName is required'}),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  
});

interface LoginFormValues {
  firstName: string,
  lastName: string,
  email: string;
  password: string;
}

const RegisterPage: NextPage = () => { 
  const router = useRouter()
  const handleNavigation = (path: string) => {
    router.push(path)
  }
  const signup = api.signup.add.useMutation()
  const { register, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const [error, setError] = useState("");

  

  const onSubmit = (data: LoginFormValues) => {
    // Handle login logic here
    console.log(data)
    
    signup.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    })
  };

  return (
    <div className="text-black min-h-screen flex place-items-center">
      {/* <div className="flex flex-c"> */}
      
        <div className="bg-white p-12 w-full md:w-[60%] lg:w-[40%] mx-auto rounded-lg">
        <p className='text-3xl font-semibold pb-6'>Register</p>
        
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="mt-1">
                <input
                  id="firstName"
                  // name="email"
                  type="text"
                  autoComplete="name"
                  // required
                  {...register("firstName")}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm  " 
                  placeholder='First Name'
                />
              </div>
              {formState.errors.firstName && (
                <p className="mt-2 text-sm text-red-600 ">
                  {formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  // name="email"
                  type="text"
                  autoComplete="name"
                  // required
                  {...register("lastName")}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm  " 
                  placeholder='Last Name'
                />
              </div>
              {formState.errors.lastName && (
                <p className="mt-2 text-sm text-red-600 ">
                  {formState.errors.lastName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  // name="email"
                  type="email"
                  autoComplete="email"
                  // required
                  {...register("email")}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm  " 
                  placeholder='Email'
                />
              </div>
              {formState.errors.email && (
                <p className="mt-2 text-sm text-red-600 ">
                  {formState.errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="Password"
                  // name="Password"
                  type="password"
                  autoComplete="current-password"
                  // required
                  {...register("password")}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password"
                />
              </div>
              {formState.errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {formState.errors.password.message}
                </p>
              )}
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            <div className="">
              <button
              type="submit"
                disabled={formState.isSubmitting}
                className="border-transpa flex w-full justify-center rounded-md bg-indigo-600
                  px-4 py-2 text-sm font-medium text-white shadow-sm focus-within:outline-none hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {formState.isSubmitting ? "Signing up..." : "Sign up"}
              </button>
              {/* ? 'Signing in..' : 'Sign in' */}
            </div>
          </form>
          <p className="pt-5">Already have an account?<button className="font-semibold text-blue-600 indent-1" onClick={() => handleNavigation('/signin')}>Login</button></p>
        </div>
      {/* </div> */}
    </div>
  );
};

export default RegisterPage