"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getPlatforms, publishContent } from "../lib/actions/platform.actions";
import { getMediaExperts } from "../lib/actions/media_expert.actions";
import { FileUploader } from "./FileUploader";
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import Button from "./Button";
import Image from "next/image";

interface PublishContentProps {
  userId: string;
}

const PublishContent: React.FC<PublishContentProps> = ({ userId }) => {
  const router = useRouter();
  const [platforms, setPlatforms] = useState<IPlatform[]>([]);
  const [mediaExperts, setMediaExperts] = useState<IMediaExpert[]>([]);
  const [platformId, setPlatformId] = useState<string>("");
  const [selectedMediaExpert, setSelectedMediaExpert] = useState<string>("");
  const [content, setContent] = useState<File[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPlatformsAndMediaExperts = async () => {
      const platformsList = await getPlatforms();
      const mediaExpertsList = await getMediaExperts();
      setPlatforms(platformsList);
      setMediaExperts(mediaExpertsList);
    };
    fetchPlatformsAndMediaExperts();
  }, []);

  const handlePublishContent = async () => {
    if (!platformId || !selectedMediaExpert || content.length === 0) {
      alert("Please select a platform, a media expert, and upload content");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("blobFile", content[0]);
      formData.append("fileName", content[0].name);

      const result = await publishContent(platformId, selectedMediaExpert, formData);

      if (result) {
        setIsDialogOpen(false);
        router.push(`/mediaExperts/${userId}/platforms/${platformId}/publishContent?mediaExpertId=${selectedMediaExpert}`);
      } else {
        alert("Failed to publish content");
      }
    } catch (error) {
      console.error("Error publishing content:", error);
      alert("An error occurred while publishing the content");
    }
  };

  return (
    <div className="flex justify-center">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="flex flex-row items-center justify-around h-36 w-96 rounded-lg shadow-md">
            <Image src="/assets/icons/publish.svg" alt="Discover" width={64} height={64} />
            <span className="text-xl font-bold pb-2">Publish Content</span>
          </Button>
        </DialogTrigger>
        <DialogOverlay />
        <DialogContent aria-describedby="publish-content-description" className="custom-modal-width">
          <DialogHeader>
            <DialogTitle className="text-center header">Publish Content</DialogTitle>
            <DialogDescription id="publish-content-description" className="text-center">
              Select a platform, media expert, and upload content.
            </DialogDescription>
          </DialogHeader>
          <div className="mb-4">
            <h1 className="text-center">Platforms</h1>
            <select
              value={platformId}
              onChange={(e) => setPlatformId(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Select Platform</option>
              {platforms.map((platform) => (
                <option key={platform.$id} value={platform.$id}>
                  {platform.name}
                </option>
              ))}
            </select>

            <h2 className="text-center">Select Media Expert</h2>
            <select
              value={selectedMediaExpert}
              onChange={(e) => setSelectedMediaExpert(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Select Media Expert</option>
              {mediaExperts.map((expert) => (
                <option key={expert.$id} value={expert.$id}>
                  {expert.name}
                </option>
              ))}
            </select>

            <h2 className="text-center">Upload Content</h2>
            <FileUploader
              files={content}
              onChange={setContent}
              accept={{
                "application/pdf": [".pdf"],
                "application/zip": [".zip"],
              }}
            />

            <Button onClick={handlePublishContent} className="w-full mt-4">
              Publish Content
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PublishContent;