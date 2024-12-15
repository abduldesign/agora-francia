"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useBudgetStore } from '@/store/useBudget';
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
          size: "40%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    responsive: [
      {
        breakpoint: 9600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

const CompletedInterventions: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [],
    labels: [],
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(null); // Initialize with null
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const { budgets } = useBudgetStore();

  useEffect(() => {
    // Filter budgets based on selected date
    const filteredBudgets = selectedDate ? budgets.filter(budget => budget.budget_yr.toString() === selectedDate) : budgets;
    const lgas = filteredBudgets.reduce((total, budget) => total + budget.name.length, 0);

    // Update chart data
    setState({
      series: [lgas], // Assuming 65, 40 are other data points
      labels: [`${lgas}`,],
    });

    // Calculate total approved budget
    const totalBudget = filteredBudgets.reduce((total, budget) => total + parseFloat(budget.approved), 0);
    setTotalBudget(totalBudget);
  }, [budgets, selectedDate]);


  

  return (
    <div className="col-span-12 rounded-sm px-5 pt-7.5 pb-5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      
      <div className="relative mt-10 mb-4 space-y-20 mx-auto flex justify-center">
        <div id="chartThree" className="relative">
          <ReactApexChart options={{ ...options, labels: state.labels }} series={state.series} type="donut" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-center text-sm font-medium">
              {state.labels}
            </span>
          </div>
        </div>
      </div>

      <Link href='/' className="mt-10">See Details</Link>
    </div>
  );
};

export default CompletedInterventions;
