import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ApexChart = () => {
    const [chartData, setChartData] = useState({
      series: [
        {
          name: 'Residence',
          data: [4, 3, 10, 9, 80, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 70, 5],
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
            'JICHMA',
            'FADAMA',
            'JARDA',
            'SEMA',
            'SIP',
            'BUDGET',
            'AGRIC',
            'PENSION',
            'EMIRATE COUNCIL',
            'JUSTICE SECTOR',
            'COMMERCE',
            'STATE HOUSING',
            'STATE REHAB',
            'NORMADIC',
            'SUBEB',
            'HIGHER EDU',
            'WO AFFAIRS',
            'YOUTH',
          ],
          tickAmount: 14,
          labels: {
            
          },
        },
        title: {
          text: 'Jigawa state MDA Beneficiary Enrolment',
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
            gradientToColors: ['#3556fd'],
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
       
        // ... (your existing options)
      } as ApexOptions,
    });
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        // Fetch new data (replace this with your actual data fetching logic)
        const newData = {
          series: [
            {
              name: 'Residence',
              data: Array.from({ length: 18 }, () => Math.floor(Math.random() * 100)),
            },
          ],
        };
  
        // Update the chart data
        setChartData((prevChartData) => ({
          ...prevChartData,
          series: newData.series,
        }));
      }, 3000); // Update every 5 seconds
  
      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    }, []); // Run once on component mount
  
    return (
      <div id="chart">
        {chartData.options && (
          <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
        )}
      </div>
    );
  };
  
  export default ApexChart;














  