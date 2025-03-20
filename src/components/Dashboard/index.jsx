// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Swal from "sweetalert2";
// import "bootstrap/dist/css/bootstrap.min.css";
// import './style.css'; // Import CSS for styling

// const Dashboard = () => {
//   const [name, setName] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loggedIn = localStorage.getItem("loggedIn");
//     console.log("Logged In Status:", loggedIn); // Debug log

//     const token = localStorage.getItem("token");

//     if (token) {
//       Swal.fire({
//         title: "Success",
//         text: "You have logged in successfully!",
//         icon: "success",
//         confirmButtonText: "OK",
//       });
//     }

//     // if (loggedIn === "true") {
//     //   toast.success("Welcome to your dashboard!");
//     // } else {
//     //   navigate('/login');
//     // }
//   }, [navigate]);

//   // Info boxes data
//   const infoBoxes = [
//     {
//       title: "Contact",
//       value: "1,245",
//       icon: "👤",
//       bgColor: "#ffff",
//       onClick: () => navigate('/contact'), // Add navigation for contact
//     },
//     {
//       title: "Sales",
//       value: "RP. 320.000",
//       icon: "💰",
//       bgColor: "#ffff",
//       onClick: () => navigate('/sales'), // Add navigation for sales
//     },
//     {
//       title: "Summary CRM",
//       value: "2000",
//       icon: "📈",
//       bgColor: "#ffff",
//       onClick: () => navigate('/leads'), // Add navigation for summary
//     },
//     {
//       title: "Calculator",
//       value: "cc",
//       icon: "🆕",
//       bgColor: "#ffff",
//       onClick: () => navigate('/calculator'), // Add navigation for calculator
//     },
//   ];

//   return (
//     <div className="dashboard-container">
//       {infoBoxes.map((box, index) => (
//         <div
//           key={index}
//           className="info-box"
//           style={{ backgroundColor: box.bgColor }}
//           onClick={box.onClick} // Add onClick handler here
//         >
//           <div className="value-container">
//             <div className="icon-background">
//               <div className="icon">{box.icon}</div>
//             </div>
//             <div className="info-content">
//               <p>{box.value}</p>
//               <h3>{box.title}</h3>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // CSS styles (you can also move this to a separate CSS file if preferred)
// const styles = `
// .dashboard-container {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 20px;
//   padding: 20px;
// }

// .info-box {
//   flex: 1 1 calc(25% - 20px);
//   border-radius: 8px;
//   padding: 20px;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//   cursor: pointer; /* Change cursor to pointer */
//   transition: transform 0.2s; /* Optional: Add a transition effect */
// }

// .info-box:hover {
//   transform: scale(1.05); /* Optional: Slightly scale the box on hover */
// }

// .value-container {
//   display: flex;
//   align-items: center;
// }

// .icon-background {
//   background-color: #f0f0f0;
//   border-radius: 50%;
//   padding: 10px;
//   margin-right: 10px;
// }

// .icon {
//   font-size: 24px;
// }

// .info-content h3 {
//   margin: 0;
//   font-size: 18px;
// }

// .info-content p {
//   margin: 5px 0 0;
//   font-size: 16px;
// }
// `;

// export default Dashboard;

// // Inject styles into the document
// const styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
// styleSheet.innerText = styles;
// document.head.appendChild(styleSheet);


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

import "bootstrap/dist/css/bootstrap.min.css";
import './style.css'; // Import CSS for styling

const Dashboard = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   const loggedIn = localStorage.getItem("loggedIn");
  //   const token = localStorage.getItem("token");

  //   console.log("Logged In Status:", loggedIn); // Debug log

  // if (token) {
  //   Swal.fire({
  //     title: "Success",
  //     text: "You have logged in successfully!",
  //     icon: "success",
  //     confirmButtonText: "OK",
  //   });
  // }

  // if (loggedIn !== "true") {
  //   navigate('/login');
  // } else {
  //   toast.success("Welcome to your dashboard!");
  // }


  // }, [navigate]);
  useEffect(() => {
    // Check if the user has successfully logged in
    const loginMessage = localStorage.getItem("loginMessage");
    if (loginMessage) {
      toast.success(loginMessage);
      localStorage.removeItem("loginMessage");
    }
  }, []);

  const [contactCount, setContactCount] = React.useState(null);
const [salesCount, setSalesCount] = React.useState(null);
const [summaryCount, setSummaryCount] = React.useState(null);

React.useEffect(() => {
  // Fetch the data from the backend API
  fetch('http://localhost:3000/user/getKontakCount')
    .then((response) => response.json())
    .then((data) => {
      // Set individual counts correctly
      setContactCount(data.total_contacts);
      setSalesCount(data.total_penjualan);
      setSummaryCount(data.total_leads);
    })
    .catch((error) => console.error('Error fetching counts:', error));
}, []);

  const infoBoxes = [
    {
      title: "Contact",
      value: contactCount !== null ? contactCount.toLocaleString() : "Loading...",
      icon: "👤",
      bgColor: "#f0f0f0",
      onClick: () => navigate('/contact'), // Add navigation for contact
    },
    {
      title: "Sales",
      value: salesCount !== null ?  salesCount.toLocaleString() : "Loading...",
      // value: salesCount !== null ? `RP. ${salesCount.toLocaleString()}` : "Loading...",
      icon: "💰",
      bgColor: "#f0f0f0",
      onClick: () => navigate('/sales'), // Add navigation for sales
    },
    {
      title: "Summary CRM",
      value: summaryCount !== null ? summaryCount.toLocaleString() : "Loading...",
      icon: "📈",
      bgColor: "#f0f0f0",
      onClick: () => navigate('/leads'), // Add navigation for summary
    },
    {
      title: "Calculator",
      value: "cc",
      icon: "🆕",
      bgColor: "#f0f0f0",
      onClick: () => navigate('/calculator'), // Add navigation for calculator
    },
  ];

  return (
    <div className="dashboard-container">
      {infoBoxes.map((box, index) => (
        <div
          key={index}
          className="info-box"
          style={{ backgroundColor: box.bgColor }}
          onClick={box.onClick} // Add onClick handler here
        >
          <div className="value-container">
            <div className="icon-background">
              <div className="icon">{box.icon}</div>
            </div>
            <div className="info-content">
              <p>{box.value}</p>
              <h3>{box.title}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const MultiAxisChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Pembelian',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        yAxisID: 'y-axis-1',
      },
      {
        label: 'Total Nilai',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        yAxisID: 'y-axis-2',
      },
      {
        label: 'Total Transaksi',
        data: [],
        type: 'line',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        fill: false,
        yAxisID: 'y-axis-3',
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:3000/user/getAnalysis')
      .then((response) => response.json())
      .then((data) => {
        const sektorNames = data.analysis.map((sektor) => sektor.nama_sektor);
        const totalPembelian = data.analysis.map((sektor) => sektor.total_pembelian);
        const totalNilai = data.analysis.map((sektor) => sektor.total_nilai);
        const totalTransaksi = data.analysis.map((sektor) => sektor.total_transaksi);

        setChartData({
          labels: sektorNames,
          datasets: [
            {
              label: 'Total Pembelian',
              data: totalPembelian,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              yAxisID: 'y-axis-1',
            },
            {
              label: 'Total Nilai',
              data: totalNilai,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              yAxisID: 'y-axis-2',
            },
            {
              label: 'Total Transaksi',
              data: totalTransaksi,
              type: 'line',
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1,
              fill: false,
              yAxisID: 'y-axis-3',
            },
          ],
        });
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const options = {
    responsive: true,
    scales: {
      y: [
        {
          id: 'y-axis-1',
          type: 'linear',
          position: 'left',
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value + ' Pembelian';
            },
          },
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          position: 'right',
          beginAtZero: true,
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            callback: function (value) {
              return value + ' Nilai';
            },
          },
        },
        {
          id: 'y-axis-3',
          type: 'linear',
          position: 'right',
          beginAtZero: true,
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            callback: function (value) {
              return value + ' Transaksi';
            },
          },
        },
      ],
    },
  };

  return (
    <div className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto max-w-7xl mx-auto">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Dashboard />
      <MultiAxisChart />
    </div>
  );
};

export default App;
