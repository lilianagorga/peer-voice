"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getPlatforms, publishContent } from "../lib/actions/platform.actions";
import { getMediaExperts } from "../lib/actions/media_expert.actions";
import { FileUploader } from "./FileUploader";

const Platform = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [platforms, setPlatforms] = useState<IPlatform[]>([]);
  const [mediaExperts, setMediaExperts] = useState<IMediaExpert[]>([]);
  const [platformId, setPlatformId] = useState<string>("");
  const [selectedMediaExpert, setSelectedMediaExpert] = useState<string>("");
  const [content, setContent] = useState<File[]>([]);

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
    <div>
      <h1>Platforms</h1>
      <select
        value={platformId}
        onChange={(e) => setPlatformId(e.target.value)}
      >
        <option value="">Select Platform</option>
        {platforms.map((platform) => (
          <option key={platform.$id} value={platform.$id}>
            {platform.name}
          </option>
        ))}
      </select>

      <h2>Select Media Expert</h2>
      <select
        value={selectedMediaExpert}
        onChange={(e) => setSelectedMediaExpert(e.target.value)}
      >
        <option value="">Select Media Expert</option>
        {mediaExperts.map((expert) => (
          <option key={expert.$id} value={expert.$id}>
            {expert.name}
          </option>
        ))}
      </select>

      <h2>Upload Content</h2>
      <FileUploader
        files={content}
        onChange={setContent}
        accept={{
          "application/pdf": [".pdf"],
          "application/zip": [".zip"],
        }}
      />

      <button onClick={handlePublishContent}>Publish Content</button>
    </div>
  );
};

export default Platform;