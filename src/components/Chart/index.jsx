import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SektorAnalysisChart = () => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the analysis data from the backend
    const fetchAnalysisData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/getAnalysis');  // Replace with the actual API endpoint
        const data = await response.json();

        if (data.status === 'ok') {
          setChartData(data.analysis);
        } else {
          setError('Error fetching analysis data');
        }
      } catch (err) {
        setError('Error fetching analysis data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysisData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Prepare the chart data from the API response
  const labels = chartData.map(item => item.nama_sektor); // Sektor names
  const totalPembelian = chartData.map(item => item.total_pembelian);
  const totalNilai = chartData.map(item => item.total_nilai);
  const totalTransaksi = chartData.map(item => item.total_transaksi);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Pembelian',
        data: totalPembelian,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Total Nilai',
        data: totalNilai,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      },
      {
        label: 'Total Transaksi',
        data: totalTransaksi,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Sektor Analysis Chart',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Sectors',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Values',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Sektor Analysis</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default SektorAnalysisChart;

// import React, { useState, useEffect } from 'react';
// import Chart from 'chart.js/auto';

// const SektorAnalysisChart = () => {
//     const [chartData, setChartData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/user/getAnalysis');
//                 const data = await response.json();

//                 if (data.status === 'ok') {
//                     setChartData(data.analysis);
//                 } else {
//                     setError('Error fetching analysis data');
//                 }
//             } catch (err) {
//                 setError('Error fetching analysis data');
//                 console.error(err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         if (isLoading || !chartData) return;

//         const ctx = document.getElementById('sektorAnalysisChart').getContext('2d');

//         const labels = chartData.map(item => item.nama_sektor);
//         const totalPembelian = chartData.map(item => item.total_pembelian);
//         const totalNilai = chartData.map(item => item.total_nilai);
//         const totalTransaksi = chartData.map(item => item.total_transaksi);

//         const data = {
//             labels: labels,
//             datasets: [
//                 {
//                     label: 'Total Pembelian',
//                     data: totalPembelian,
//                     backgroundColor: 'rgba(75, 192, 192, 0.6)',
//                     borderColor: 'rgba(75, 192, 192, 1)',
//                     borderWidth: 1,
//                 },
//                 {
//                     label: 'Total Nilai',
//                     data: totalNilai,
//                     backgroundColor: 'rgba(255, 159, 64, 0.6)',
//                     borderColor: 'rgba(255, 159, 64, 1)',
//                     borderWidth: 1,
//                 },
//                 {
//                     label: 'Total Transaksi',
//                     data: totalTransaksi,
//                     backgroundColor: 'rgba(153, 102, 255, 0.6)',
//                     borderColor: 'rgba(153, 102, 255, 1)',
//                     borderWidth: 1,
//                 },
//             ],
//         };

//         const options = {
//             responsive: true,
//             plugins: {
//                 title: {
//                     display: true,
//                     text: 'Sektor Analysis Chart',
//                     font: {
//                         size: 24,
//                     },
//                 },
//                 tooltip: {
//                     mode: 'index',
//                     intersect: false,
//                 },
//             },
//             scales: {
//                 x: {
//                     title: {
//                         display: true,
//                         text: 'Sectors',
//                         font: {
//                             size: 18,
//                         },
//                     },
//                 },
//                 y: {
//                     title: {
//                         display: true,
//                         text: 'Values',
//                         font: {
//                             size: 18,
//                         },
//                     },
//                     beginAtZero: true,
//                     ticks: {
//                         font: {
//                             size: 16,
//                         },
//                     },
//                 },
//             },
//         };

//         new Chart(ctx, {
//             type: 'bar',
//             data: data,
//             options: options,
//         });
//     }, [isLoading, chartData]);

//     return (
//         <div className="container mx-auto p-8">
//             <div className="bg-white shadow-md rounded-lg p-8">
//                 <div className="flex items-center justify-between mb-6">
//                     <h2 className="text-3xl font-bold text-gray-800">Sektor Analysis</h2>
//                     <i className="fas fa-chart-bar text-3xl text-blue-500"></i>
//                 </div>
//                 <div id="chart-container" className="relative w-full h-[500px] lg:h-[600px]">
//                     <canvas id="sektorAnalysisChart"></canvas>
//                 </div>
//                 {isLoading && (
//                     <div className="text-center text-gray-600 mt-6 text-xl">Loading...</div>
//                 )}
//                 {error && (
//                     <div className="text-center text-red-600 mt-6 text-xl">{error}</div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SektorAnalysisChart;


// import React, { useEffect, useState } from 'react';
// import { Line, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';

// // Register necessary Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

// const MultiAxisChart = () => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: 'Total Pembelian',
//         data: [],
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//         yAxisID: 'y-axis-1',
//       },
//       {
//         label: 'Total Nilai',
//         data: [],
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//         yAxisID: 'y-axis-2',
//       },
//       {
//         label: 'Total Transaksi',
//         data: [],
//         type: 'line',
//         backgroundColor: 'rgba(255, 206, 86, 0.2)',
//         borderColor: 'rgba(255, 206, 86, 1)',
//         borderWidth: 1,
//         fill: false,
//         yAxisID: 'y-axis-3',
//       },
//     ],
//   });

//   useEffect(() => {
//     fetch('http://localhost:3000/user/getAnalysis')
//       .then((response) => response.json())
//       .then((data) => {
//         const sektorNames = data.analysis.map((sektor) => sektor.nama_sektor);
//         const totalPembelian = data.analysis.map((sektor) => sektor.total_pembelian);
//         const totalNilai = data.analysis.map((sektor) => sektor.total_nilai);
//         const totalTransaksi = data.analysis.map((sektor) => sektor.total_transaksi);

//         setChartData({
//           labels: sektorNames,
//           datasets: [
//             {
//               label: 'Total Pembelian',
//               data: totalPembelian,
//               backgroundColor: 'rgba(75, 192, 192, 0.2)',
//               borderColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 1,
//               yAxisID: 'y-axis-1',
//             },
//             {
//               label: 'Total Nilai',
//               data: totalNilai,
//               backgroundColor: 'rgba(54, 162, 235, 0.2)',
//               borderColor: 'rgba(54, 162, 235, 1)',
//               borderWidth: 1,
//               yAxisID: 'y-axis-2',
//             },
//             {
//               label: 'Total Transaksi',
//               data: totalTransaksi,
//               type: 'line',
//               backgroundColor: 'rgba(255, 206, 86, 0.2)',
//               borderColor: 'rgba(255, 206, 86, 1)',
//               borderWidth: 1,
//               fill: false,
//               yAxisID: 'y-axis-3',
//             },
//           ],
//         });
//       })
//       .catch((err) => {
//         console.error('Error fetching data:', err);
//       });
//   }, []);

//   const options = {
//     responsive: true,
//     scales: {
//       y: [
//         {
//           id: 'y-axis-1',
//           type: 'linear',
//           position: 'left',
//           beginAtZero: true,
//           ticks: {
//             callback: function (value) {
//               return value + ' Pembelian';
//             },
//           },
//         },
//         {
//           id: 'y-axis-2',
//           type: 'linear',
//           position: 'right',
//           beginAtZero: true,
//           grid: {
//             drawOnChartArea: false,
//           },
//           ticks: {
//             callback: function (value) {
//               return value + ' Nilai';
//             },
//           },
//         },
//         {
//           id: 'y-axis-3',
//           type: 'linear',
//           position: 'right',
//           beginAtZero: true,
//           grid: {
//             drawOnChartArea: false,
//           },
//           ticks: {
//             callback: function (value) {
//               return value + ' Transaksi';
//             },
//           },
//         },
//       ],
//     },
//   };

//   return (
//     <div className="container mx-auto p-6 font-mono">
//       <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
//         <div className="w-full overflow-x-auto max-w-7xl mx-auto">
//           <Bar data={chartData} options={options} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MultiAxisChart;
