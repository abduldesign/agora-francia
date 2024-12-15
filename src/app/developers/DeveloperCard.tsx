import React from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaGithub } from "react-icons/fa";

interface DeveloperCardProps {
  name: string;
  role: string;
  skill: string;
  aspect: string;
  imageUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  githubUrl:string;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ name, role, githubUrl, skill, aspect, imageUrl, facebookUrl, linkedinUrl, instagramUrl }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
    <div className="flex justify-center mt-4">
      <img
        className="w-24 h-24 rounded-full object-cover"
        src={imageUrl}
        alt={`${name}'s photo`}
      />
    </div>
    <div className="px-6 py-4 text-center">
      <div className="font-bold text-xl mb-2">{name}</div>
      <p className="text-gray-700 text-base">{role}</p>
      <p className="text-gray-700 text-base">TechStack: {skill}</p>
      <p className="text-gray-700 text-base">Experience: {aspect}</p>
    </div>
    <div className="flex justify-center px-6 pt-4 pb-2">
      <a href={facebookUrl} className="text-blue-600 mx-2">
        <FaFacebookF className="w-5 h-5" />
      </a>
      <a href={linkedinUrl} className="text-blue-600 mx-2">
        <FaLinkedinIn className="w-5 h-5" />
      </a>
      <a href={instagramUrl} className="text-pink-600 mx-2">
        <GrInstagram className="w-5 h-5" />
      </a>
      <a href={githubUrl} className="text-dark-600 mx-2">
        <FaGithub className="w-5 h-5" />
      </a>
    </div>
  </div>
  );
};

export default DeveloperCard;
