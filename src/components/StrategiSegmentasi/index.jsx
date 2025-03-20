// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DataTable = ({ listId }) => {  // Accept listId as a prop
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch analysis data from the backend API
//     axios.get(`http://localhost:3000/user/getAnalysis`)  // Adjust endpoint accordingly
//       .then((response) => {
//         setData(response.data.analysis);  // Set analysis data from the backend response
//         setLoading(false);  // Set loading state to false once data is fetched
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err);
//         setError("Failed to load data");  // Handle error
//         setLoading(false);
//       });
//   }, [listId]);  // Fetch data when the listId changes

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Peluang':
//         return { backgroundColor: '#4CAF50', color: '#fff' }; // Green
//       case 'Peluang dan gali lagi':
//         return { backgroundColor: '#FF9800', color: '#fff' }; // Orange
//       case 'Peluang dan dicoba lagi':
//         return { backgroundColor: '#FFEB3B', color: '#000' }; // Yellow
//       case 'Sedikit peluangnya':
//         return { backgroundColor: '#F44336', color: '#fff' }; // Red
//       default:
//         return { backgroundColor: '#B0BEC5', color: '#fff' }; // Default color
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <section className="container mx-auto p-6 font-mono">
//       <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
//         <div className="w-full overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
//                 <th className="px-4 py-3">Sektor</th>
//                 <th className="px-4 py-3">Total Pembelian</th>
//                 <th className="px-4 py-3">Total Nilai</th>
//                 <th className="px-4 py-3">Total Transaksi</th>
//                 <th className="px-4 py-3">Kriteria 1</th>
//                 <th className="px-4 py-3">Kriteria 2</th>
//                 <th className="px-4 py-3">Hasil</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               {data.map((sektor, index) => (
//                 <tr key={index} className="text-gray-700">
//                   <td className="px-4 py-3 border">{sektor.nama_sektor}</td>
//                   <td className="px-4 py-3 text-md font-semibold border">{sektor.total_pembelian}</td>
//                   <td className="px-4 py-3 text-md font-semibold border">{sektor.total_nilai}</td>
//                   <td className="px-4 py-3 text-md font-semibold border">{sektor.total_transaksi}</td>
//                   <td className="px-4 py-3 border">
//                     <span
//                       className={`px-2 py-1 font-semibold leading-tight rounded-sm`}
//                       style={getStatusStyle(sektor.kriteria1)}  // Apply dynamic styles
//                     >
//                       {sektor.kriteria1}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 border">
//                     <span
//                       className={`px-2 py-1 font-semibold leading-tight rounded-sm`}
//                       style={getStatusStyle(sektor.kriteria2)}  // Apply dynamic styles
//                     >
//                       {sektor.kriteria2}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 border">
//                     <span
//                       className={`px-2 py-1 font-semibold leading-tight rounded-sm`}
//                       style={getStatusStyle(sektor.kriteria3)}  // Apply dynamic styles
//                     >
//                       {sektor.kriteria3}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DataTable;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = ({ listId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/user/getAnalysis`)
      .then((response) => {
        setData(response.data.analysis);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        setLoading(false);
      });
  }, [listId]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Peluang':
        return { backgroundColor: '#4CAF50', color: '#fff' }; 
      case 'Peluang dan gali lagi':
        return { backgroundColor: '#FF9800', color: '#fff' }; 
      case 'Peluang dan dicoba lagi':
        return { backgroundColor: '#FFEB3B', color: '#000' }; 
      case 'Sedikit peluangnya':
        return { backgroundColor: '#F44336', color: '#fff' }; 
      default:
        return { backgroundColor: '#B0BEC5', color: '#fff' };
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto max-w-7xl mx-auto">
          <table className="w-full text-sm table-auto">
            <thead>
              <tr className="font-semibold text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-2">Sektor</th>
                <th className="px-4 py-2">Total Pembelian</th>
                <th className="px-4 py-2">Total Nilai</th>
                <th className="px-4 py-2">Total Transaksi</th>
                <th className="px-4 py-2">Kriteria 1</th>
                <th className="px-4 py-2">Kriteria 2</th>
                <th className="px-4 py-2">Hasil</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((sektor, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="px-4 py-3 border">{sektor.nama_sektor}</td>
                  <td className="px-4 py-3 text-md font-semibold border">{sektor.total_pembelian}</td>
                  <td className="px-4 py-3 text-md font-semibold border">{sektor.total_nilai}</td>
                  <td className="px-4 py-3 text-md font-semibold border">{sektor.total_transaksi}</td>
                  <td className="px-4 py-3 border">
                    <span
                      className="px-2 py-1 font-semibold leading-tight rounded-sm"
                      style={getStatusStyle(sektor.kriteria1)}
                    >
                      {sektor.kriteria1}
                    </span>
                  </td>
                  <td className="px-4 py-3 border">
                    <span
                      className="px-2 py-1 font-semibold leading-tight rounded-sm"
                      style={getStatusStyle(sektor.kriteria2)}
                    >
                      {sektor.kriteria2}
                    </span>
                  </td>
                  <td className="px-4 py-3 border">
                    <span
                      className="px-2 py-1 font-semibold leading-tight rounded-sm"
                      style={getStatusStyle(sektor.kriteria3)}
                    >
                      {sektor.kriteria3}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DataTable;
