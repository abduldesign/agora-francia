import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const EngagementChart = () => {
    const options1: any = { // Use `any` to bypass type checking
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#99C2A2', '#C5EDAC', '#66C7F4'],
    series: [
      {
        name: 'Column A',
        type: 'column',
        data: [21.1, 23, 33.1, 34, 44.1, 44.9, 56.5, 58.5],
      },
      {
        name: 'Column B',
        type: 'column',
        data: [10, 19, 27, 26, 34, 35, 40, 38],
      },
      {
        name: 'Line C',
        type: 'line',
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
      },
    ],
    stroke: {
      width: [4, 4, 4],
    },
    plotOptions: {
      bar: {
        columnWidth: '20%',
      },
    },
    xaxis: {
      categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
    },
    yaxis: typeof window !== 'undefined' ? [
      {
        seriesName: 'Column A',
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        title: {
          text: 'Columns',
        },
      },
      {
        seriesName: 'Column A',
        show: false,
      },
      {
        opposite: true,
        seriesName: 'Line C',
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        title: {
          text: 'Line',
        },
      },
    ] : [],
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false,
      },
    },
    legend: {
      horizontalAlign: 'left',
      offsetX: 40,
    },
  };



  

  return (
    <div id="chart" className="max-w-screen-md m-auto">
      <ApexChart options={options1} series={options1.series} type="line" height={350} />
    </div>
  );
};

export default EngagementChart;