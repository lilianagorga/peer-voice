"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "../ui/form";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { SelectItem } from "../ui/select";
import { MediaExpertFormDefaultValues, IdentificationTypes, } from "../../constants";
import { registerMediaExpert } from "../../lib/actions/media_expert.actions";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import SubmitButton from "../SubmitButton";
import { MediaExpertSchema } from "../../lib/validation";
import { joinTeam } from "../../types/appwrite.types";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof MediaExpertSchema>>({
    resolver: zodResolver(MediaExpertSchema),
    defaultValues: {
      ...MediaExpertFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof MediaExpertSchema>) => {
    setIsLoading(true);

    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const media_expert = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        interests: values.interests,
        bio: values.bio,
        specialization: values.specialization,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument ? formData : undefined,
        joinTeam: values.joinTeam,
      };

      const newMediaExpert = await registerMediaExpert(media_expert);

      if (newMediaExpert) {
        if (values.joinTeam === "yes") {
          router.push(`/mediaExperts/${user.$id}/courses`);
        } else {
          router.push(`/mediaExperts/${user.$id}/admin`);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>


          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="(555) 123-4567"
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.ARRAY}
            control={form.control}
            name="interests"
            label="Interests"
            placeholder="Enter your interests"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="bio"
            label="Bio"
            placeholder="Write a short bio"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="specialization"
            label="Specialization"
            placeholder="Enter your specialization"
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verfication</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />

          <div className="space-y-4">
            <h2 className="sub-header">Do you want to join the team?</h2>
            <RadioGroup
              className="flex flex-col gap-2"
              value={form.watch("joinTeam")}
              onValueChange={(value) => form.setValue("joinTeam", value as joinTeam)}
            >
              <div className="flex items-center">
              <RadioGroupItem value="yes" id="yes" />
              <label htmlFor="yes" className="ml-2">Yes</label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem value="no" id="no" />
              <label htmlFor="no" className="ml-2">No</label>
            </div>
            </RadioGroup>
          </div>
        </section>

        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;