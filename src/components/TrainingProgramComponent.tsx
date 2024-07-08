"use client";

import React from 'react';

const TrainingProgramComponent: React.FC<{ program: { title: string, description: string, specializationField: string, duration: number, participants: { firstName: string, lastName: string }[] } }> = ({ program }) => {
  const handleJoinProgram = () => {
    console.log(`Joining program: ${program.title}`);
  };

  return (
    <div className="card">
      <h2>{program.title}</h2>
      <p>Description: {program.description}</p>
      <p>Specialization Field: {program.specializationField}</p>
      <p>Duration: {program.duration} weeks</p>
      <p>Participants: {program.participants.length}</p>
      <button onClick={handleJoinProgram}>Join Program</button>
    </div>
  );
};

export default TrainingProgramComponent;