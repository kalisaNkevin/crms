"use client";
import Image from "next/image";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/formSchema";
import { useRouter } from "next/navigation";
import { TOKEN_NAME } from "@/lib/constants";
import { setCookies } from "@/lib/storage";
import { auth } from "@/lib/firebase";
import useDisplayToast from "@/hooks/useToast";

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const { showToast } = useDisplayToast();
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    signInWithEmailAndPassword(data.email, data.password).then(async (res) => {
      if (res) {
        const token = await res.user.getIdToken();
        const expiresIn: any = (await res.user.getIdTokenResult()).claims.exp;
        setCookies(TOKEN_NAME, token, expiresIn);
        sessionStorage.setItem("user", "true");
        showToast("🎉👏🎊 Login was successful! 🎉👏🎊", "success");
        router.push("/dashboard/overview");
      } else {
        showToast("Invalid Credentials 🤡", "error");
      }
    });
  };

  return (
    <div className="relative h-screen">
      <Image
        src="/auth/auth.png"
        fill
        alt="Login banner"
        className="absolute inset-0 z-0 object-cover"
      />
      <div className="absolute flex justify-center w-full py-5 min-[414px]:py-10 md:py-32 items-center">
        <Logo />
      </div>
      <div className="relative z-10 flex flex-col gap-10 items-center justify-center h-full">
        <Card className="w-[310px] min-[414px]:w-[390px] md:w-[550px] p-5">
          <CardHeader className="py-10">
            <CardTitle className="text-center font-medium">
              Welcome Back!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="email">Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="password">Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-gray-200"
                          />
                          <FormLabel htmlFor="rememberMe">
                            Remember Me
                          </FormLabel>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Loading..." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
