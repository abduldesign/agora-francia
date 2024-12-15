// src/app/components/LandingPage.tsx
"use client";
import React from 'react';
import Image from 'next/image';
import Layout from './Layout';
import { AnimatePresence } from 'framer-motion';
import Hero from './HeroSection/page';
import whatwedoimage from '../../../../public/images/dashboard.png'
import Steps from './Howitworks/steps';
import dataSteps from './Howitworks/stepsDataFile'
import howwework from '../../../../public/images/howwework.svg'
import homepage from '../../../../public/images/homepage.png'

export default function LandingPage() {
  return (
    <>
      <Layout>
        <main className="w-full bg-green-200">
          {/* Hero section */}
          <section className="w-full pt-10 px-4 md:px-4 lg:px-12 min-h-100vh">
            <AnimatePresence>
              <Hero />
            </AnimatePresence>
          </section>
          {/* End of Hero section */}
        </main>
      </Layout>
    </>
  );
}
