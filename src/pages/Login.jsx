import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/layouts/MainLayout";
import { IoMdMail } from "react-icons/io";
import React from "react";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

export default function Login() {
  return (
    <>
      <MainLayout>
        <h1 className="text-3xl font-semibold text-center mb-16">Login</h1>
        <form action="" className="space-y-5">
          <Input type="email" placeholder="Email" icon={<IoMdMail />} />
          <Input type="password" placeholder="Password" icon={<FaLock />} />
          <Button type="submit" className="w-full my-6 cursor-pointer" size="lg">
            Login
          </Button>
        </form>

        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </MainLayout>
    </>
  );
}
