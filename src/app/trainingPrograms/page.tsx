"use client";
import React from 'react';
import TrainingProgramComponent from '../../components/TrainingProgramComponent';
import { TrainingProgram } from '../../lib/TrainingProgram';
import { MediaExpert } from '../../lib/MediaExpert';

const expert1 = new MediaExpert("Anna", "Rossi", "Journalism", 5, ["Writing", "Reporting", "Interviews"]);
const expert2 = new MediaExpert("Maria", "Bianchi", "Production", 3, ["Directing", "Editing", "Scriptwriting"]);

const trainingProgram1 = new TrainingProgram("Advanced Journalism", "In-depth journalism training program", "Journalism", 12);
const trainingProgram2 = new TrainingProgram("Media Production", "Comprehensive production training", "Production", 8);
const trainingProgram3 = new TrainingProgram("Digital Marketing", "Master digital marketing techniques", "Marketing", 10);

const joinProgram = (program: TrainingProgram, expert: MediaExpert) => {
  program.addParticipant(expert);
  alert(`${expert.firstName} has joined the program ${program.title}`);
};

export default function TrainingPrograms() {
  const trainingProgram1Data = {
    title: trainingProgram1.title,
    description: trainingProgram1.description,
    specializationField: trainingProgram1.specializationField,
    duration: trainingProgram1.duration,
    participants: trainingProgram1.participants.map((p) => ({
      firstName: p.firstName,
      lastName: p.lastName,
    })),
  };

  const trainingProgram2Data = {
    title: trainingProgram2.title,
    description: trainingProgram2.description,
    specializationField: trainingProgram2.specializationField,
    duration: trainingProgram2.duration,
    participants: trainingProgram2.participants.map((p) => ({
      firstName: p.firstName,
      lastName: p.lastName,
    })),
  };

  const trainingProgram3Data = {
    title: trainingProgram3.title,
    description: trainingProgram3.description,
    specializationField: trainingProgram3.specializationField,
    duration: trainingProgram3.duration,
    participants: trainingProgram3.participants.map((p) => ({
      firstName: p.firstName,
      lastName: p.lastName,
    })),
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-8">Training Programs</h1>
        <div className="grid gap-8 lg:grid-cols-2 md:grid-cols-1">
          <div>
            <TrainingProgramComponent program={trainingProgram1Data} />
            <button onClick={() => joinProgram(trainingProgram1, expert1)}>Join Program</button>
          </div>
          <div>
            <TrainingProgramComponent program={trainingProgram2Data} />
            <button onClick={() => joinProgram(trainingProgram2, expert2)}>Join Program</button>
          </div>
          <div>
            <TrainingProgramComponent program={trainingProgram3Data} />
            <button onClick={() => joinProgram(trainingProgram3, expert1)}>Join Program</button>
          </div>
        </div>
      </main>
    </>
  );
}