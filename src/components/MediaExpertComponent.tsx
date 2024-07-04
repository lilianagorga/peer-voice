import React from 'react';
import { MediaExpert } from '../lib/MediaExpert';

const MediaExpertComponent: React.FC<{ person: MediaExpert }> = ({ person }) => {
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