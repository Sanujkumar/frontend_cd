"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Url } from "@/lib/url";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";


export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      if (!email || !password) {
        toast.error("Please fill all fields!");
        setLoading(false);
        return;
      }

      console.log(email, password)
      console.log("Final URL:", `${Url}/api/users/login`);

      const res = await axios.post(  
        `${Url}/api/users/login`,
        {
          email,
          password,
        }
      );
      console.log("token", res.data.token);
        
      console.log("role",res.data.user.role);    
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      toast.success("Login successful!");
      router.push("/");  
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  ref={emailRef}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  ref={passwordRef}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </Field>

              <Field className="flex flex-col items-center gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
