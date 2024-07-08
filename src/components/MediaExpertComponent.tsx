"use client";

import React from 'react';

const MediaExpertComponent: React.FC<{ person: { firstName: string, lastName: string, specialization: string, experience: number, interests: string[] } }> = ({ person }) => {
  return (
    <div className="card">
      <h2>{person.firstName} {person.lastName}</h2>
      <p>Specialization: {person.specialization}</p>
      <p>Experience: {person.experience} years</p>
      <p>Interests: {person.interests.join(', ')}</p>
    </div>
  );
};

export default MediaExpertComponent;