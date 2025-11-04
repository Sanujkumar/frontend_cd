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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<string>("");


    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;
            const name = nameRef.current?.value;

            console.log(email,password,name,role);  

            if (!email || !password || !role || !name) {
                toast.error("Please fill all fields!");
                setLoading(false);
                return;
            }


            console.log("Email:", email, "Password:", password, "Role:", role);

            const res = await axios.post(`${Url}/api/users/register`, {
                name,   
                email,
                password,
                role,
            });
            console.log(res.data.message);  
            toast.success("Register successful!");
            setTimeout(() => {
                router.push("/login");
            }, 800);
        } catch (err: any) {
            console.error(err);
            toast.error(err.response?.data?.message || "Signup failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Register your account</CardTitle>
                    <CardDescription>
                        Enter your details below to create an account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin}>
                        <FieldGroup>
                            
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    ref={nameRef}
                                    id="name"
                                    type="text"
                                    placeholder="Bob"
                                    required
                                />
                            </Field>

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

                            {/* Password */}
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    ref={passwordRef}
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                />
                            </Field>

                            {/* Role Selection */}
                            <Field>
                                <FieldLabel>Role</FieldLabel>
                                <Select onValueChange={(value) => setRole(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USER">User</SelectItem>
                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>

                            {/* Submit Button */}
                            <Field className="flex flex-col items-center gap-2">
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Registering..." : "Register"}
                                </Button>

                                <FieldDescription className="text-center">
                                    Already have an account? <a href="/login">Login</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
