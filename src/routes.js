import React, { lazy, useEffect } from "react";
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { useNavigate } from "react-router-dom";

const Dashboard = lazy(() => import("./Layout/Dashboard"));
const Informasi = lazy(() => import("./Layout/Informasi"))
const CreateInfomasi = lazy(() => import("./Layout/Informasi/CreateInformasi"))
const DetailInformasi = lazy(() => import("./Layout/Informasi/DetailInformasi"))
const LogActivity = lazy(() => import("./Layout/LogActivity"))
const Prompting = lazy(() => import("./Layout/Prompting"))
const CreatePrompting = lazy(() => import("./Layout/Prompting/CreatePrompting"))
const DetailPrompting = lazy(() => import("./Layout/Prompting/DetailPrompting"))
const User = lazy(() => import("./Layout/User"))
const CreateUser = lazy(() => import("./Layout/User/CreateUser"))
const DetailUser = lazy(() => import("./Layout/User/DetailUser"))


export const closedRoutes = () => [
  {
    path: "/",
    element: <Dashboard />,
    name: "Dashboard",
    key: "dashboard",
    icon: <DashboardOutlinedIcon />,
  },
  {
    path: "/informasi",
    element: <Informasi />,
    name: "Informasi",
    key: "informasi",
    icon: <FolderCopyOutlinedIcon />,
  },
  {
    path: "/informasi/create",
    element: <CreateInfomasi />,
    key: "create informasi",
  },
  {
    path: "/informasi/detail",
    element: <DetailInformasi />,
    key: "detail informasi",
  },
  {
    path: "/logActivity",
    element: <LogActivity />,
    name: "Log Activity",
    key: "log activity",
    icon: <BookOutlinedIcon />,
  },
  {
    path: "/prompting",
    element: <Prompting />,
    name: "Prompting",
    key: "prompting",
    icon: <CodeOutlinedIcon />,
  },
  {
    path: "/prompting/create",
    element: <CreatePrompting />,
    key: "create prompting",
  },
  {
    path: "/prompting/detail",
    element: <DetailPrompting />,
    key: "detail prompting",
  },
  {
    path: "/user",
    element: <User />,
    name: "User",
    key: "user",
    icon: <GroupOutlinedIcon />,
  },
  {
    path: "/user/create",
    element: <CreateUser />,
    key: "create user",
  },
  {
    path: "/user/detail",
    element: <DetailUser />,
    key: "detail user",
  },
];


export const finalRoutes = () => {
    
}

// default all routes
// export const finalRoutes = temp

// final routes with controll
// export const finalRoutes = () => {
//   const navigate = useNavigate();
  
// //   const openRoutes = [{ path: "/login", element: <LoginScreen /> }];
//   const openRoutes = [{ path: "/", element: <Dashboard /> }];
//   const userId = localStorage.getItem("userId") || null
//   const token = localStorage.getItem("token");
//   // Comment if route user already exist
//   // const tempRoute = ['master-holiday', 'master-company']
//   useEffect(() => {
//     if (!!token) {
//       if (window.location.pathname === "/login") {
//         navigate("/workingReport");
//       }
//     } else {
//       if (window.location.pathname !== "/login") {
//         navigate("/login");
//       }
//     }
//   }, [token, navigate]);

//   // localStorage.setItem('privilage', JSON.stringify(tempRoute))
//   const userRoutes = JSON.parse(localStorage.getItem("privilage") || '[]');
//   // console.log('app route: ', routes)
//   let temp = closedRoutes.filter((res) => {
//     let isSame = false;

//     isSame = userRoutes.some((privilege) => privilege.privilegeName === res.key);
//     if (!isSame) {
//       return;
//     }
//     return res;
//   });

//   temp = [...temp, ...openRoutes];
//   temp = userId ? [...temp, { path: "/", element: <Dashboard />,}] : openRoutes
//   return temp
// };
