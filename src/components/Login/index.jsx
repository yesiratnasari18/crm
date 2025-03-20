// import React, { useEffect } from 'react';
// import { FaUserShield } from "react-icons/fa";
// import { BsFillShieldLockFill } from "react-icons/bs";
// import { AiOutlineSwapRight } from "react-icons/ai";
// import { useFormik } from 'formik';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import './Login.css';
// import './App.css';
// import foto from '../../assets/LoginAssets/bg.png';
// import logo from '../../assets/LoginAssets/logo.png';
// import { LoginValidate } from './ValidatePages';


// export default function Login() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Cek apakah pengguna sudah login dengan token
//     const token = localStorage.getItem("token");
//     if (token) {
//       const role = localStorage.getItem("role");
//       if (role === "Sales") {
//         return (window.location.href = "./Dashboard");
//         // navigate("/dashboard");
//       } else {
//         return (window.location.href = "./Admin/Dashboard");
//         // navigate("/dashboardAdmin");
//       }
//     }
//   }, [navigate]); // Memastikan navigasi terjadi hanya sekali saat pertama kali render

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: LoginValidate,
//     onSubmit: async (values) => {
//       try {
//         // Kirim data login ke API
//         const response = await axios.post("http://localhost:3000/user/login", values, {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         });

//         const { status, message, token, role } = response.data || {};

//         if (status === 200 && token) {
//           // Jika login berhasil
//           localStorage.setItem("token", token);
//           localStorage.setItem("role", role);
//           localStorage.setItem("loggedIn", true);

//           toast.success("Login successful! Welcome back.");

//           // Navigasi sesuai dengan role
//           if (role === "Sales") {
//             navigate("/dashboard");
//           } else {
//             navigate("/dashboardAdmin");
//           }
//         } else {
//           toast.error(message || "Login failed: Invalid credentials");
//         }
//       } catch (error) {
//         if (error.response) {
//           toast.error(error.response.data.message || "An error occurred during login.");
//         } else {
//           toast.error("An error occurred during login. Please try again.");
//         }
//       }
//     },
//   });

//   return (
//     <div>
//       <ToastContainer position='top-center' />
//       <div className='loginPage flex'>
//         <div className="container flex">
//           <div className="imageDiv">
//             <img src={foto} alt="Login Background" className="backgroundImage" />
//             <div className="textDiv">
//               {/* <h2 className='title'>Ayo Login</h2> */}
//               {/* <p>Buruan Login!</p> */}
//             </div>
//             <div className="footerDiv flex">
//               <span className="text">Don't have an account?</span>
//               <Link to={'/crm'}>
//                 <button className='btn'>Sign Up</button>
//               </Link>
//             </div>
//           </div>
//           <div className="formDiv flex">
//             <div className="headerDiv">
//               <img src={logo} alt="Logo" />
//               <h3>Welcome Back!</h3>
//             </div>
//             <form onSubmit={formik.handleSubmit} className='form grid'>
//               <div className="inputDiv">
//                 <label htmlFor="email">Email</label>
//                 <div className="input flex">
//                   <FaUserShield className='icon' />
//                   <input
//                     type="text"
//                     placeholder='Enter Email'
//                     name='email'
//                     autoComplete='off'
//                     {...formik.getFieldProps('email')}
//                   />
//                 </div>
//                 {formik.touched.email && formik.errors.email && (
//                   <div className="error">{formik.errors.email}</div>
//                 )}
//               </div>
//               <div className="inputDiv">
//                 <label htmlFor="password">Password</label>
//                 <div className="input flex">
//                   <BsFillShieldLockFill className='icon' />
//                   <input
//                     type="password"
//                     placeholder='Enter Password'
//                     name='password'
//                     {...formik.getFieldProps('password')}
//                   />
//                 </div>
//                 {formik.touched.password && formik.errors.password && (
//                   <div className="error">{formik.errors.password}</div>
//                 )}
//               </div>
//               <button type='submit' className='btn flex'>
//                 <span>Login</span>
//                 <AiOutlineSwapRight className='icon' />
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect } from 'react';
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import './App.css';
import foto from '../../assets/LoginAssets/bg.png';
import logo from '../../assets/LoginAssets/logo.png';
import { LoginValidate } from './ValidatePages';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // Cek apakah pengguna sudah login dengan token
    const token = localStorage.getItem("token");
    if (token) {
      const role = localStorage.getItem("role");
      if (role === "Sales") {
        return (window.location.href = "../Dashboard");
      } else {
        return (window.location.href = "../Admin/Dashboard");
      }
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidate,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:3000/user/login", values, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const { status, message, token, role } = response.data || {};

        if (status === 200 && token) {
          // If login is successful
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("loggedIn", true);

          toast.success("Login successful! Welcome back.");

          // Redirect based on role
          if (role === "Sales") {
            navigate("/dashboard");
          } else {
            navigate("/dashboardAdmin");
          }
        } else {
          toast.error(message || "Login failed: Invalid credentials");
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || "An error occurred during login.");
        } else {
          toast.error("An error occurred during login. Please try again.");
        }
      }
    },
  });

  return (
    <div>
      <ToastContainer position="top-center" />
      <div className="loginPage flex">
        <div className="container flex">
          <div className="imageDiv">
            <img src={foto} alt="Login Background" className="backgroundImage" />
            <div className="footerDiv flex">
              {/* <span className="text">Don't have an account?</span> */}
              <Link to="/crm">
                {/* <button className="btn">Sign Up</button> */}
              </Link>
            </div>
          </div>
          <div className="formDiv flex">
            <div className="headerDiv">
              <img src={logo} alt="Logo" />
              {/* <h3>Welcome Back!</h3> */}
            </div>
            <form onSubmit={formik.handleSubmit} className="form grid">
              <div className="inputDiv">
                <label htmlFor="email">Email</label>
                <div className="input flex">
                  <FaUserShield className="icon" />
                  <input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    autoComplete="off"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="error">{formik.errors.email}</div>
                )}
              </div>
              <div className="inputDiv">
                <label htmlFor="password">Password</label>
                <div className="input flex">
                  <BsFillShieldLockFill className="icon" />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    {...formik.getFieldProps("password")}
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="error">{formik.errors.password}</div>
                )}
              </div>
              <button type="submit" className="btn flex">
                <span>Login</span>
                <AiOutlineSwapRight className="icon" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
