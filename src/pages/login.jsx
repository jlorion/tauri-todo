import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/layouts/MainLayout";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import Database from "@tauri-apps/plugin-sql";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulate login logic
        if (email && password) {
            try {
                const db = await Database.load('sqlite:database.db');
                const result = await db.select("SELECT * FROM users WHERE email = $1", [email]);
                if (result[0].password === password) {
                    navigate("/todo", {state: {user_id: result[0].id}})
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            setError('Invalid email or password');
        }
    };


  return (
    <>
      <MainLayout>
        <h1 className="text-3xl font-semibold text-center mb-16">Login</h1>
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
          <Input onChange={e=> setEmail(e.target.value)} type="email" placeholder="Email" value={email} icon={<IoMdMail />} />
          <Input type="password" onChange={e=> setPassword(e.target.value)} placeholder="Password" value={password} icon={<FaLock />} />
          <Button type="submit" className="w-full my-6 cursor-pointer" size="lg">
            Login
          </Button>
        </form>
        {error && <div className="mb-4 text-red-500">{error}</div>}

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
