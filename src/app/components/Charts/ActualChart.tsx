"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useLeaveStore } from "@/store/useLeave";
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
        size: "60%",
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

const ChartThree: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [],
    labels: [],
  });

  const { leaves } = useLeaveStore();

  useEffect(() => {
    console.log("Leaves data in ChartThree:", leaves); // Debugging log

    if (leaves && leaves.length > 0) {
      const leaveTotal = leaves.length;
      const leaveStatusApproved = leaves.filter(leave => leave.status === 'APPROVED').length;
      const leaveStatusPending = leaves.filter(leave => leave.status === 'PENDING').length;
      const leaveStatusDisapproved = leaves.filter(leave => leave.status === 'DISAPPROVED').length;

      console.log("Total leaves:", leaveTotal); // Debugging log
      console.log("Leave status approved:", leaveStatusApproved); // Debugging log
      console.log("Leave status pending:", leaveStatusPending); // Debugging log
      console.log("Leave status disapproved:", leaveStatusDisapproved); // Debugging log

      setState({
        series: [leaveStatusApproved, leaveStatusPending, leaveStatusDisapproved],
        labels: [
          `Approved (${leaveStatusApproved})`,
          `Pending (${leaveStatusPending})`,
          `Disapproved (${leaveStatusDisapproved})`
        ],
      });
    } else {
      setState({
        series: [0, 0, 0],
        labels: ["Approved (0)", "Pending (0)", "Disapproved (0)"],
      });
    }
  }, [leaves]);

  return (
    <div className="col-span-12 rounded-sm px-5 pt-7.5 pb-5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 flex justify-between items-center">
        <h5 className="text-xl font-semibold text-black dark:text-white">
          Leave Analytics
        </h5>
      </div>
      <div className="mt-10 mb-4 space-y-20 mx-auto flex justify-center">
        <div id="chartThree">
          {state.series.length > 0 ? (
            <ReactApexChart options={{ ...options, labels: state.labels }} series={state.series} type="donut" />
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
