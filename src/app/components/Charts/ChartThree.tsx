"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePbcStore } from "@/store/usePbc";
import { ApexOptions } from "apexcharts";


const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartThreeState {
  series: number[];
  labels: string[];
}

const options: ApexOptions = {
  chart: {
    type: "donut",
  },
  colors: ["#10B981", "#375E83", "#259AE6", "#FFA70B"],
  legend: {
    show: true,
    position: "right",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 9600,
      options: {
        chart: {
          width: 340,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 300,
        },
      },
    },
  ],
};

const ChartThree: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [],
    labels: [],
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(null); // Initialize with null
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const {pbcs} =usePbcStore();
  

  useEffect(() => {
    // Filter projects based on selected date
    const filteredProjects = selectedDate ? pbcs.filter(pbc => pbc.year === selectedDate) : pbcs;

    // Count the number of unique LGAs
    const uniqueActual = Array.from(new Set(filteredProjects.map(pbc => pbc.actual)));
    const actual = uniqueActual.length;
    


    //project status
   
    const expenditure = Array.from(new Set(filteredProjects.map(project => project.expenditure)));
    const currentExpenditure = expenditure.length;
    // Count the number of unique contractors
    const uniqueEstimate = Array.from(new Set(filteredProjects.map(pbc => pbc.estimate)));
    const estimateUnique = uniqueEstimate.length;
    // Count the number of contractors

    

    // Update chart data
    setState({
      series: [actual, estimateUnique,currentExpenditure], // Assuming 65, 40 are other data points
      labels: [`actual  : ${actual}`,` Estimate : ${estimateUnique}`,`Expenditure :  ${currentExpenditure}`,],
    });

    // Calculate total approved budget
    const totalBudget = filteredProjects.reduce((total, pbc) => total + pbc.approved, 0);
    setTotalBudget(totalBudget);
  }, [pbcs, selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value || null); // Set to null if no date selected
  };

  // Extract unique dates from projects
  const uniqueDates = Array.from(new Set(pbcs.map(pbc => pbc.year)));
  return (
  
<div className="col-span-12 rounded-sm  px-5 pt-7.5 pb-5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
  <div className="mb-3 flex justify-between items-center">
    <div className="relative inline-block">
    <select
            name="selectedDate"
            value={selectedDate || ''} // Use '' if selectedDate is null
            onChange={handleDateChange}
            className="relative inline-flex appearance-none bg-transparent py-1 pl-4 pr-8 text-sm font-medium outline-none"
          >
            <option value="">Select Year</option>
            {uniqueDates.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
      <span className="absolute top-1/2 right-3 -translate-y-1/2">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG Path */}
          <path
                  d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                  fill="#637381"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                  fill="#637381"
                />
        </svg>
      </span>
    </div>
  </div>
 
  <div className=" mt-10 mb-10 space-y-20 mx-auto flex justify-center custom-scrollbar overflow-auto ">
  <div id="chartThree">
          <ReactApexChart options={{ ...options, labels: state.labels }} series={state.series} type="donut" />

        </div>
        
  </div>
  
  <h1 className="mt-35 ml-20 mr-6">Total Approved: ₦ {totalBudget.toLocaleString()}</h1>
        

  
</div>


  );
};

export default ChartThree;
