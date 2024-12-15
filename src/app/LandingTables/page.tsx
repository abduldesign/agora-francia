
'use client';
import React,{useEffect} from 'react';
import { useMdaStore } from '@/store/useMda';
import LandingMDATable from '../components/Table/LandingMdaPage';
const MdaList = () => {
  const {mdas,getMdas} = useMdaStore();
 
  useEffect(() => {
   
    getMdas();
  }, []);
 
  return (
    
    <div className="flex justify-center items-center mt-6 p-4">
    <div className="w-full max-w-screen-lg"> {/* Full width on small screens, max width on larger screens */}
      <div className="overflow-x-auto">
    <LandingMDATable data={mdas} itemsPerPage={0} />
  </div>
</div>
</div>
   
  );
};

export default MdaList;