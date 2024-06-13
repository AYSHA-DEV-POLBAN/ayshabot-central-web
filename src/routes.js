import React, { lazy, useEffect } from "react";
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { useNavigate } from "react-router-dom";

const Dashboard = lazy(() => import("./Layout/Dashboard"));
const Informasi = lazy(() => import("./Layout/Informasi"))
const CreateInfomasi = lazy(() => import("./Layout/Informasi/CreateInformasi"))
const DetailInformasi = lazy(() => import("./Layout/Informasi/DetailInformasi"))
const EditInformasi = lazy(() => import("./Layout/Informasi/EditInformasi"))
const LogHistory = lazy(() => import("./Layout/LogHistory"))
const Command = lazy(() => import("./Layout/Prompting"))
const CreatePrompting = lazy(() => import("./Layout/Prompting/CreatePrompting"))
const DetailPrompting = lazy(() => import("./Layout/Prompting/DetailPrompting"))
const EditCommand = lazy(() => import("./Layout/Prompting/EditCommand"))
const User = lazy(() => import("./Layout/User"))
const CreateUser = lazy(() => import("./Layout/User/CreateUser"))
const DetailUser = lazy(() => import("./Layout/User/DetailUser"))
const EditUser = lazy(() => import("./Layout/User/EditUser"))
const LoginScreen = lazy(() => import("./Layout/Authentikasi"))
const CategoryInformation = lazy(() => import("./Layout/KategoriInformasi"))
const GenerateQR = lazy(() => import("./Layout/GenerateQR"))
const HistoryConversation = lazy(() => import("./Layout/HistoryConversation"))
const DetailHistoryConversation = lazy(() => import("./Layout/HistoryConversation/detailHistoryConversation"))


export const closedRoutes = () => [
  {
    path: "/",
    element: <LoginScreen />,
    key: "login",
  },
  {
    path: "/dashboard",
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
    path: "/informasi/edit",
    element: <EditInformasi />,
    key: "edit informasi",
  },
  {
    path: "/category_information",
    element: <CategoryInformation />,
    name: "Category Information",
    key: "category_information",
    icon: <CodeOutlinedIcon />,
  },
  {
    path: "/command",
    element: <Command />,
    name: "Command",
    key: "command",
    icon: <CodeOutlinedIcon />,
  },
  {
    path: "/command/create",
    element: <CreatePrompting />,
    key: "create prompting",
  },
  {
    path: "/command/detail",
    element: <DetailPrompting />,
    key: "detail prompting",
  },
  {
    path: "/command/edit",
    element: <EditCommand />,
    key: "edit command",
  },
  {
    path: "/generate_qr",
    element: <GenerateQR />,
    name: "Generate QR",
    key: "generate_qr",
    icon: <QrCode2Icon />,
  },
  {
    path: "/history_conversation",
    element: <HistoryConversation />,
    name: "History Conversation",
    key: "history_conversation",
    icon: <ForumOutlinedIcon />,
  },
  {
    path: "/history_conversation/detail",
    element: <DetailHistoryConversation />,
    name: "History Conversation Detail",
    key: "detail history_conversation",
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
  {
    path: "/user/edit",
    element: <EditUser />,
    key: "edir user",
  },
  {
    path: "/logHistory",
    element: <LogHistory />,
    name: "Log History",
    key: "log history",
    icon: <BookOutlinedIcon />,
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
