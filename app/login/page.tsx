"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasskeySchema } from "../../lib/validation";
import { PasskeyInput } from "../../components/PasskeyInput";
import { RadioGroup } from "@radix-ui/react-radio-group";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [destination, setDestination] = useState("admin");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof PasskeySchema>>({
    resolver: zodResolver(PasskeySchema),
    defaultValues: {
      passkey: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof PasskeySchema>) => {
    if (values.passkey) {
      const response = await fetch(`/api/verifyPasskey?passkey=${values.passkey}`);
      const data = await response.json();

      if (data.userId) {
        login(data.userId);

        if (destination === "admin") {
          router.push(`/mediaExperts/${data.userId}/admin`);
        } else {
          router.push(`/mediaExperts/${data.userId}/team`);
        }
      } else {
        setErrorMessage("Invalid passkey");
      }
    } else {
      setErrorMessage("Please enter your passkey");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <div className="flex flex-col space-y-4">
        {errorMessage && (
          <div className="mb-4 text-red-500">
            {errorMessage}
          </div>
        )}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
            <PasskeyInput
              maxLength={12}
              minLength={6}
              value={form.watch("passkey")}
              onChange={(value) => form.setValue("passkey", value)}
            />
            <div className="flex justify-center mb-6">
              <RadioGroup className="flex justify-center space-x-4 mb-6 radio-group">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="admin"
                    checked={destination === "admin"}
                    onChange={() => setDestination("admin")}
                    className="login-radio"
                  />
                  <span>Admin</span>
                </label>
                <label className="flex items-center space-x-2 ml-4">
                  <input
                    type="radio"
                    value="team"
                    checked={destination === "team"}
                    onChange={() => setDestination("team")}
                    className="login-radio"
                  />
                  <span>Team</span>
                </label>
              </RadioGroup>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="login-radio-button">
                Login
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
};

export default LoginPage;