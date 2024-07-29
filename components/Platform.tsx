"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import { Form, FormControl } from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { SelectItem } from "./ui/select";
import { Dialog, DialogTrigger, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { PlatformDefaultValues, ContentTypes } from "../constants";
import { registerPlatform } from "../lib/actions/platform.actions";
import CustomFormField, { FormFieldType } from "./commons/CustomFormField";
import { FileUploader } from "./FileUploader";
import SubmitButton from "./commons/SubmitButton";
import Button from "./commons/Button";
import { PlatformSchema } from "../lib/validation";
import { Type } from "../types/appwrite.types";

interface PlatformProps {
  userId: string;
  closeModal: () => void;
}

const Platform: React.FC<PlatformProps> = ({ userId, closeModal }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);

  const form = useForm<z.infer<typeof PlatformSchema>>({
    resolver: zodResolver(PlatformSchema),
    defaultValues: {
      ...PlatformDefaultValues,
    },
  });

  const onSubmit = async (values: z.infer<typeof PlatformSchema>) => {
    setIsLoading(true);

    let formData;
    if (values.content && values.content?.length > 0) {
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
        contentType: values.contentType,
        content: values.content ? formData : undefined,
        type: values.type,
      };

      const newPlatform = await registerPlatform(platform);

      if (newPlatform) {
        closeModal();
        router.push(`/mediaExperts/${userId}/platforms`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="flex flex-row items-center justify-around h-36 w-96 rounded-lg shadow-md">
            <Image src="/assets/icons/platform.svg" alt="Discover" width={64} height={64} />
            <span className="text-xl font-bold pb-2">Add Platform</span>
          </Button>
        </DialogTrigger>
        <DialogOverlay />
        <DialogContent aria-describedby={hasDescription ? "add-platform-description" : undefined} className="custom-modal-width custom-platform-modal">
          <DialogHeader>
            <DialogTitle className="text-center header"></DialogTitle>
            <DialogDescription id="add-platform-description" className="text-center">
              Fill in the details to add a new platform.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-8">
              <section className="grid grid-cols-2 mx-4 gap-2">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="name"
                  label="Name for Platform"
                  placeholder="Name"
                  iconSrc="/assets/icons/user.svg"
                  iconAlt="user"
                />
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
              </section>
              <section className="flex justify-center text-center mx-4">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="description"
                  label="description"
                  placeholder="Enter a description for platform"
                />
              </section>
              <section className="flex justify-center text-center mx-4">
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
              </section>
              <section className="flex justify-center flex-col items-center gap-4">
                <h2 className="sub-header">Select one Platform</h2>
                <RadioGroup
                  className="flex gap-4"
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
              </section>
              <div className="mx-4 mb-4">
                <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Platform;