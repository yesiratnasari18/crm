import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    // Fetch sales report data from the backend
    axios
      .get('http://localhost:3000/user/getSalesReport')
      .then((response) => {
        setSalesData(response.data.data);
        setTotalSales(response.data.totalSales);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching sales data:', err);
        setError('Failed to load sales report');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="container mx-auto p-6 font-mono">
      <h1 className="text-xl font-bold mb-4">Sales Report</h1>
      <table className="w-full mb-4">
        <thead>
          <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">No</th>
            <th className="px-4 py-3">Nama</th>
            <th className="px-4 py-3">Perusahaan</th>
            <th className="px-4 py-3">Produk</th>
            <th className="px-4 py-3">Jumlah</th>
            <th className="px-4 py-3">Harga</th>
            <th className="px-4 py-3">Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale, index) => (
            <tr key={sale.id_contact} className="text-gray-700">
              <td className="px-4 py-3 text-md font-semibold border">{index + 1}</td>
              <td className="px-4 py-3 border">{sale.nama}</td>
              <td className="px-4 py-3 border">{sale.perusahaan}</td>
              <td className="px-4 py-3 border">{sale.produk}</td>
              <td className="px-4 py-3 border">{sale.jumlah}</td>
              <td className="px-4 py-3 border">{sale.harga}</td>
              <td className="px-4 py-3 border">{sale.total_sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-lg font-semibold">Total Sales: Rp. {Intl.NumberFormat('id-ID').format(totalSales)}</div>
    </section>
  );
};

export default SalesReport;
