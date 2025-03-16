import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Database from "@tauri-apps/plugin-sql";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const db = await Database.load('sqlite:database.db');
            await db.execute("INSERT INTO users (name, email, password) values ($1, $2, $3)", [name, email, password])
            navigate("/")
        } catch (err) {
            setError(err)
            console.log(err);
        }
    };

  return (
    <>
      <MainLayout>
        <h1 className="text-3xl font-semibold text-center mb-16">Sign Up</h1>
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
          <Input onChange={e=> setName(e.target.value)} value={name} type="text" placeholder="Full name" icon={<FaUser />} />
          <Input onChange={e=> setEmail(e.target.value)} value={email} type="email" placeholder="Email" icon={<IoMdMail />} />
          <Input onChange={e=> setPassword(e.target.value)} value={password} type="password" placeholder="Password" icon={<FaLock />}/>
          <Button type="submit" className="w-full my-6" size="lg">
            Sign Up
          </Button>
        </form>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </MainLayout>
    </>
  );
};

export default Signup;
