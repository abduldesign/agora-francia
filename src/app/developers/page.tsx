import React from 'react';
import DeveloperCard from './DeveloperCard';
import Layout from '../components/LandingPage/Layout';
;


const DevelopersPage: React.FC = () => {
  const developers = [
    {
      name: 'Agebe Philip',
      role: 'Software Engineer : Project Lead',
      skill:'Full stack developer',
      aspect: '7+ Years',
      imageUrl: 'https://avatars.githubusercontent.com/u/94308034?s=400&u=9d86145abf7d6e5f96b72a7dbf7ea19290024089&v=4',
      facebookUrl: 'https://facebook.com/agebe.philip',
      linkedinUrl: 'https://linkedin.com/in/agebe-philip',
      instagramUrl: 'https://instagram.com/agebe.philip',
      githubUrl:'https://github.com/AgebePhilip'
    },
    {
      name: 'Yusuf Ibrahim',
      role: 'Software Engineer',
      skill:'Full stack developer',
      aspect: '7+ Years',
      imageUrl: 'https://avatars.githubusercontent.com/u/37019327?v=4',
      facebookUrl: 'https://facebook.com/yusuf.ibrahim',
      linkedinUrl: 'https://linkedin.com/in/yusuf-ibrahim',
      instagramUrl: 'https://instagram.com/yusuf.ibrahim',
       githubUrl:'https://github.com/yousouf9',
    }
  ];

  return (
    <Layout>
  <div className="w-full h-full  pt-[120px] bg-gray-100 relative">
    <div className="text-center text-2xl font-bold my-6 text-black relative z-10">Meet the Software Developers</div>
    <div className="flex flex-wrap justify-center gap-6">
      {developers.map((developer, index) => (
        <DeveloperCard key={index} {...developer} />
      ))}
    </div>
  </div>
    </Layout>
  );
};

export default DevelopersPage;
