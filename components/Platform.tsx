"use client";

import React from 'react';

const Platform: React.FC<{ platform: { name: string, type: string, description: string, contentCategories: string[] } }> = ({ platform }) => {
  const handlePublishContent = () => {
    console.log(`Publishing content on: ${platform.name}`);
  };

  return (
    <div className="card">
      <h2>{platform.name}</h2>
      <p>Type: {platform.type}</p>
      <p>Description: {platform.description}</p>
      <p>Content Categories: {platform.contentCategories.join(', ')}</p>
      <button onClick={handlePublishContent}>Publish Content</button>
    </div>
  );
};

export default Platform;