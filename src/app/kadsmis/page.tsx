import React from "react";
import Layout from "../components/LandingPage/Layout";

import AboutKadsmis from "./AboutKadsmis";

export default function About() {
  return (
    <Layout>
      <main className="w-full pt-14">
        <section className="w-full px-8 md:px-16 lg:px-24">
          <div className="flex flex-row justify-center items-center">
            <AboutKadsmis />
          </div>
        </section>
      </main>
    </Layout>
  );
}
