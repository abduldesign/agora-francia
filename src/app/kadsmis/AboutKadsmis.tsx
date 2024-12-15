import React from "react";
import Image from "next/image";
import whatwedoimage from "../../../public/images/HomeScreen.png";

export default function AboutKadsmis() {
  return (
    <div className="w-full flex flex-col gap-10 md:gap-12 items-center justify-center py-12 md:py-24">
      <div className="">
        <Image
          priority
          src={whatwedoimage}
          alt="Follow us on Twitter"
          width={800}
          height={500}
        />
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-green-700 text-3xl md:text-4xl text-center">
          Who is JISPMIS ?
        </h1>
        <p className="text-[#3A3A3A] text-lg md:text-xl">
        JISPMIS - is a web-based
        Integrated Information Management System  designed
         to provide a comprehensive solution that combines various
          technologies, processes, and tools to efficiently manage 
          and organize social protection information within an organization.
        </p>
        <p className="text-[#3A3A3A] text-lg md:text-xl">
        jispmis  is designed to be user friendly and seamlessly integrate multiple 
        Ministries, Departments, and Agencies MDAs 
        within Jigawa State.The primary objective of this system 
        is to  provide a clear and comprehensive overview of 
        social protection thereby enhancing effective decision-making

        </p>
        
      </div>
    </div>
  );
}
