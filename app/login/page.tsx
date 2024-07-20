"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import CustomFormField, { FormFieldType } from "../../components/CustomFormField";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasskeySchema } from "../../lib/validation";

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
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="passkey"
              label="Passkey"
              placeholder="Enter your passkey"
              iconSrc="/assets/icons/lock.svg"
              iconAlt="lock"
            />
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  value="admin"
                  checked={destination === "admin"}
                  onChange={() => setDestination("admin")}
                />
                Admin
              </label>
              <label>
                <input
                  type="radio"
                  value="team"
                  checked={destination === "team"}
                  onChange={() => setDestination("team")}
                />
                Team
              </label>
            </div>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
              Login
            </button>
          </form>
        </FormProvider>
      </div>
    </main>
  );
};

export default LoginPage;