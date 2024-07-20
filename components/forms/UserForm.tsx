"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";
import { createUser } from "../../lib/actions/media_expert.actions";
import { UserSchema } from "../../lib/validation";
import { PasskeyInput } from "../PasskeyInput";
import "react-phone-number-input/style.css";

export const UserForm = () => {
const router = useRouter();
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

const form = useForm<z.infer<typeof UserSchema>>({
  resolver: zodResolver(UserSchema),
  defaultValues: {
    name: "",
    email: "",
    phone: "",
    passkey: "",
  },
});

const onSubmit = async (values: z.infer<typeof UserSchema>) => {
  setIsLoading(true);
  setErrorMessage("");
  console.log("Submitting form with values:", values);

  try {
    const user = {
      name: values.name,
      email: values.email,
      phone: values.phone,
    };

    const newUser = await createUser(user, values.passkey);
    console.log("User created:", newUser);
    if (newUser && newUser.error) {
      setErrorMessage(newUser.error);
    } else if (newUser && newUser.$id) {
      router.push(`/mediaExperts/${newUser.$id}/register`);
    }
  } catch (error) {
    console.log("Error creating user:", error);
  }

  setIsLoading(false);
};

return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
      <section className="mb-12 space-y-4">
        <h1 className="header">Hi there 👋</h1>
        <p className="text-dark-700">Get started with appointments.</p>
      </section>

      {errorMessage && (
          <div className="mb-4 text-red-500">
            {errorMessage}
          </div>
        )}

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Full name"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
      />

      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="email"
        label="Email"
        placeholder="johndoe@gmail.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
      />

      <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
        control={form.control}
        name="phone"
        label="Phone number"
        placeholder="(555) 123-4567"
      />
      <PasskeyInput
        maxLength={12}
        minLength={6}
        value={form.watch("passkey")}
        onChange={(value) => form.setValue("passkey", value)}
      />
      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
);
};