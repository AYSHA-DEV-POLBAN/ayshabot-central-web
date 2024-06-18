import React, { lazy, useEffect } from "react";
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
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
const EditUser = lazy(() => import("./Layout/User/EditUSer"))
const LoginScreen = lazy(() => import("./Layout/Authentikasi"))
const CategoryInformation = lazy(() => import("./Layout/KategoriInformasi"))
const CreateCategory = lazy(() => import("./Layout/KategoriInformasi/CreateCategory"))
const EditCategory = lazy(() => import("./Layout/KategoriInformasi/EditCategory"))
const DetailCategory = lazy(() => import("./Layout/KategoriInformasi/DetailCategory"))
const GenerateQR = lazy(() => import("./Layout/GenerateQR"))
const HistoryConversation = lazy(() => import("./Layout/HistoryConversation"))
const DetailHistoryConversation = lazy(() => import("./Layout/HistoryConversation/detailHistoryConversation"))
const DetailLogHistory = lazy(() => import("./Layout/LogHistory/DetailLogHistory"))


export const closedRoutes = (userId) => {
  const routes = [
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
      icon: <CategoryOutlinedIcon />,
    },
    {
      path: "/category_information/create",
      element: <CreateCategory />,
      key: "category_information create",
    },
    {
      path: "/category_information/detail",
      element: <DetailCategory />,
      key: "category_information detail",
    },
    {
      path: "/category_information/edit",
      element: <EditCategory />,
      key: "category_information edit",
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
  ]
  if (userId != 2) {
    routes.push(
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
        key: "edit user",
      },
      {
        path: "/logHistory",
        element: <LogHistory />,
        name: "Log History",
        key: "log history",
        icon: <BookOutlinedIcon />,
      },
      {
        path: "/logHistory/detail",
        element: <DetailLogHistory />,
        key: "log history",
      },
    )
  }
  return routes
}

 


export const FinalRoutes = () => {
  const navigate = useNavigate();
  const openRoutes = [{ path: "/", element: <LoginScreen /> }];
  const userId = localStorage.getItem("userId") || null;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && userId) {
      if (window.location.pathname === "/") {
        navigate("/");
      }
    } else {
      if (window.location.pathname !== "/") {
        navigate("/");
      }
    }
  }, [token, userId, navigate]);

  if (token && userId) {
    return closedRoutes(userId);
  } else {
    return openRoutes;
  }
};


