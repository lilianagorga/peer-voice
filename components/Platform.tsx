"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { SelectItem } from "./ui/select";
import { PlatformDefaultValues, ContentTypes } from "../constants";
import { registerPlatform } from "../lib/actions/platform.actions";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { FileUploader } from "./FileUploader";
import SubmitButton from "./SubmitButton";
import { PlatformSchema } from "../lib/validation";
import { Type } from "../types/appwrite.types";

const Platform = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PlatformSchema>>({
    resolver: zodResolver(PlatformSchema),
    defaultValues: {
      ...PlatformDefaultValues,
    },
  });

  const onSubmit = async (values: z.infer<typeof PlatformSchema>) => {
    setIsLoading(true);

    let formData;
    if (
      values.content &&
      values.content?.length > 0
    ) {
      const blobFile = new Blob([values.content[0]], {
        type: values.content[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.content[0].name);
    }

    try {
      const platform = {
        userId: userId,
        name: values.name,
        description: values.description,
        content_categories: values.content_categories,
        contentType: values.contentType,
        contentNumber: values.contentNumber,
        content: values.content ? formData : undefined,
        type: values.type,
      };

      const newPlatform = await registerPlatform(platform);

      if (newPlatform) {
        router.push(`/mediaExperts/${userId}/platforms`);
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
        </section>

        <section className="space-y-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="Platform's Name"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <CustomFormField
            fieldType={FormFieldType.ARRAY}
            control={form.control}
            name="content_categories"
            label="content categories"
            placeholder="Enter content categories"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="description"
            label="description"
            placeholder="Enter a description"
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Content</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="contentType"
            label="Content Type"
            placeholder="Select content type"
          >
            {ContentTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="contentNumber"
            label="Content Number"
            placeholder="123456789"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="content"
            label="Upload Content"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader
                  files={field.value}
                  onChange={field.onChange}
                  accept={{
                    'application/pdf': ['.pdf'],
                    'application/zip': ['.zip']
                  }}
                />
              </FormControl>
            )}
          />

          <div className="space-y-4">
            <h2 className="sub-header">Select one Platform</h2>
            <RadioGroup
              className="flex flex-col gap-2"
              value={form.watch("type")}
              onValueChange={(value) => form.setValue("type", value as Type)}
            >
              <div className="flex items-center">
              <RadioGroupItem value="print" id="print" />
              <label htmlFor="print" className="ml-2">Print</label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem value="online" id="online" />
              <label htmlFor="online" className="ml-2">Online</label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem value="audiovisual" id="audiovisual" />
              <label htmlFor="audiovisual" className="ml-2">Audiovisual</label>
            </div>
            </RadioGroup>
          </div>
        </section>

        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default Platform;