import { NextPage } from "next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {FcGoogle} from 'react-icons/fc'
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { AppProps } from "next/app";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const router = useRouter()
  // const providers = await getProviders()
  // console.log(providers);
  
  const login = api.login.adds.useMutation({
    
  })
  const { register, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const [error, setError] = useState("");

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const onSubmit = async (data: LoginFormValues) => {
    // Handle login logic here
    console.log(data)
    // login.
    await signIn("credentials", {...data, redirect: false, callbackUrl: '/'})
    
    // login.mutate({
    //   email: data.email,
    //   password: data.password
    // })
  };

  return (
    <div className="text-black min-h-screen flex place-items-center">
      {/* <div className="flex flex-c"> */}
      
        <div className="bg-white p-12 w-full md:w-[60%] lg:w-[40%] mx-auto rounded-lg">
        <p className='text-3xl font-semibold pb-6'>Login</p>
        
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                htmlFor="email"
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
                disabled={formState.isSubmitting}
                className="border-transpa flex w-full justify-center rounded-md bg-indigo-600
                  px-4 py-2 text-sm font-medium text-white shadow-sm focus-within:outline-none hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {formState.isSubmitting ? "Signing in..." : "Sign in"}
              </button>
              {/* ? 'Signing in..' : 'Sign in' */}
              <div className="divider">OR</div>
            </div>
            <div className="">
            {/* {Object.values(providers).map((provider) => { */}
              {/* return ( */}
            <button
            // key={provider.id}
            // , {redirect: false, callbackUrl: `${window.location.origin}`}
            onClick={() => signIn("google")}
            role="button"
             className="flex items-center gap-2 bg-blue-700 text-white font-semibold rounded-md py-2 w-full justify-center text-sm" >
              <FcGoogle className="text-2xl"/>
              CONTINUE WITH GOOGLE
            </button>
              {/* )  */}
            {/* })}  */}
          </div>
          <div className="">
          <p className="pt-5">Don't have an account yet? <button className="font-semibold text-blue-600 indent-1" onClick={() => handleNavigation('/signup')}>Sign up</button></p>
          </div>
          </form>
         
        </div>
      {/* </div> */}
    </div>
  );
};

export default LoginPage