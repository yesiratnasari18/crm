import { RouteObject } from "react-router";
import "../layout";
import Boards from "../pages/boards/page";
import Dashboard from "../components/Dashboard";
import Contact from "../components/Contact";
import Laporan from "../components/Laporan";
import Login from "../components/Login";
import Profil from "../components/Profil/profil";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Summary from "../components/Summary";
import ContactList from "../pages/contact/page";

const isLoggedIn = window.localStorage.getItem("loggedIn"); // Check if logged in
const userType = window.localStorage.getItem("userType");

const routes: RouteObject[] = [
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/crm",
		element: (
			<Layout />
		),
		children: [
			{
				index: true, // untuk halaman beranda atau root (`/`)
				element: <Dashboard />,
			},
			{
				path: "manageleads", // Route untuk halaman Manage Leads
				element: <Boards />,
			},
			{
				path: "contact", // Route untuk halaman Contact
				element: <ContactList />,
			},
			{
				path: "laporan", // Route untuk halaman Laporan
				element: <Laporan />,
			},
			{
				path: 'summary-crm',
				element: <Summary />
			},
			{
				path: "Profil", // Route untuk halaman Laporan
				element: <Profil />,
			},
		],
	},
];

export default routes;
