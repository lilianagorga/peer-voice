"use client";

import React from 'react';
import { IMediaExpert } from '../types/appwrite.types';

const MediaExpert: React.FC<{ person: IMediaExpert }> = ({ person }) => {
  return (
    <div className="card">
      <h2>{person.name}</h2>
      <p>Specialization: {person.specialization}</p>
      <p>Interests: {person.interests?.join(', ')}</p>
    </div>
  );
};

export default MediaExpert;