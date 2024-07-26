"use client";

import { UserForm } from "../components/forms/UserForm";
import Image from "next/image";

const Home = ({ searchParams }: SearchParamProps) => {
  return (
    <main className="relative min-h-screen p-8 bg-dark-300 flex flex-col items-center lg:flex-row lg:items-start lg:justify-between">
    <div className="absolute inset-0 z-0 h-full w-full">
      <Image 
        src="/assets/images/home.jpg" 
        alt="Background Image" 
        layout="fill" 
        objectFit="cover" 
        quality={100} 
        className="h-full w-full object-cover opacity-20"
      />
    </div>
    <div className="relative z-10 flex-1 mb-12 lg:mb-24 lg:mr-20">
      <div className="text-center lg:text-left p-6">
        <h1 className="text-4xl font-bold mb-4 text-light-200">Welcome to Peer Voice</h1>
        <p className="mb-8 text-light-200 max-w-md">
          Peer Voice is a platform dedicated to promoting gender equality. Here, media experts can enroll in courses and publish content to advocate for gender equality. Join us in making a difference and amplifying voices for a more inclusive world.
        </p>
      </div>
    </div>
    <div className="relative z-10 flex-1 flex justify-center lg:justify-end w-full max-w-md md:max-w-lg lg:max-w-2xl mt-8 md:mt-0">
      <div className="w-full bg-dark-400 p-6 rounded-lg shadow-lg md:transform md:scale-75 lg:scale-100">
        <UserForm />
      </div>
    </div>
  </main>
  );
}

export default Home;