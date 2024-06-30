import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "./index.css";
import '../../App.css'
import { useNavigate } from "react-router";
import { FinalRoutes } from "../../routes";
// import CustomAlert from "../Alert";
// import { convertBase64 } from "../../global/convertBase64";
import { useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Header from "../Header";
import miniLogoAysha from "../../assets/minilogoAysha.png"

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(9)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar({ children, title }) {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const currentMenu = JSON.parse(localStorage.getItem("currentMenu") || null);
  const [open, setOpen] = useState(currentMenu ? currentMenu.open : false);
  const [selectedIndex, setSelectedIndex] = React.useState(
    parseInt(currentMenu ? currentMenu.idx : 0)
  );
  const dataRoute = FinalRoutes().filter((res) => res.icon);
  console.log(dataRoute);

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const handleDirectPath = (path, idx) => {
    const obj = {
      idx,
      open,
    };
    localStorage.setItem("currentMenu", JSON.stringify(obj));
    setSelectedIndex(idx);
    navigate(path);
  };

  const clearStringPath = (string) =>{
    return string.split("/")[1].toLowerCase().replace(/[^A-Za-z0-9]/g,"");
  }
  const currentLocation = dataRoute.find(
    (res) => clearStringPath(location.pathname) === clearStringPath(res.path)
  );
  return (
    
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer className="drawer-container" variant="permanent" open={open}>
        <DrawerHeader className="drawer-header-container">
          <div className="drawer-header">
            <Grid container>
              {/* <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              
              </Grid> */}
              <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {open ? (
                  <>
                    <img src={miniLogoAysha} alt="icon" style={{ width: 50, height: 50 }}/>
                  </>
                ) : ""}
                </Grid>
              <Grid item xs={4} className="list-menu-container" >
                
                  <IconButton onClick={handleDrawerClose} sx={{color: '#AFD3E2'}}>
                    {!open ? <MenuIcon /> : <MenuOpenIcon />}
                  </IconButton>
              </Grid>
            </Grid>
          </div>
        </DrawerHeader>
        <List className="list-menu-container">
          {dataRoute.map((res, index) => (
            <ListItem
              key={`idlist-${index + 1}`}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                selected={
                  currentLocation ? currentLocation.name === res.name : false
                }
                onClick={() => handleDirectPath(res.path, index)}
                sx={{
                  // minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  className="button-list-icon"
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    '& .MuiSvgIcon-root': {
                      fontSize: '20px'
                    }
                  }}
                >
                  {res.icon}
                </ListItemIcon>
                <ListItemText
                  primary={res.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        className="drawer-main-children"
        sx={{ flexGrow: 1, px: 2.5, py: 5 }}
      >
        {/* <CustomAlert /> */}
        <Header title={title} open={open} />
        {children}
      </Box>
    </Box>
  );
}
