import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <MainLayout>
        <h1 className="text-3xl font-semibold text-center mb-16">Sign Up</h1>
        <form action="" className="space-y-5">
          <Input type="text" placeholder="Full name" icon={<FaUser />} />
          <Input type="email" placeholder="Email" icon={<IoMdMail />} />
          <Input type="password" placeholder="Password" icon={<FaLock />}/>
          <Button type="submit" className="w-full my-6 cursor-pointer" size="lg">
            Sign Up
          </Button>
        </form>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </MainLayout>
    </>
  );
};

export default Signup;
