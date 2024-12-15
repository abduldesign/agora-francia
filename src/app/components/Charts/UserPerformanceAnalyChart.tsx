"use client";
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ApexChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Users',
        data: [4, 3, 10, 9, 80, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 70 ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line' as 'line',
        toolbar: {
        show: false,
      },
      },
      forecastDataPoints: {
        count: 7,
      },
      stroke: {
        width: 6,
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          'AGRIC',
          'COMMERCE',
          'JICHMA',
          'SIP',
          'SEMA',
          'FADAMA',
          'JARDA',
          'YOUTH EMP',
          'W/AFFAIRS',
          'SUNBEB',
          'NORMADIC',
          'STATE HOUSING',
          'PENSION',
          'HIGHER EDU',
          'JUSTICE SECTOR',
          'RELIGIOUS AFFAIRS',
          'BUDGET/PLANNING',
          'HEALTH',
        ],
        tickAmount: 10,
        labels: {
          
        },
      },
      title: {
        text: 'MDAs User Performance Analytics',
        align: 'left',
        style: {
          fontSize: '18px',
          color: '#666',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#FDD835'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      yaxis: {
        min: -0,
        max: 100,
      },
      toolbar: {
        show: false, // Set to false to hide the entire toolbar
      },
    } as ApexOptions,
  });

  return (
    <div id="chart">
      {chartData.options && (
        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
      )}
      
    </div>
  );
};

export default ApexChart;