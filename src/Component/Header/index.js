import React from "react";
import { Hidden, Typography, IconButton, Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, Tooltip } from "@mui/material";
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import Grid from "@mui/material/Grid";
import { useNavigate } from 'react-router';
import '../../App.css'
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

const Header = ({ title, open }) => { // Terima prop
  const name = localStorage.getItem("name");
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/')
  };

  return (
    <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ position: 'sticky', top: 0, zIndex: 1100, width: '103.95%', height: '70px', backgroundColor: '#146C94', alignItems: 'center', padding: '0 16px' }}>
      <Grid item xs={11} display={'flex'} alignItems="center">
        <Grid container className="containerHeader">
          <Grid item xs={12} sx={{marginLeft: `${open ? 0 : -15}px`, transition: 'margin-left 0.3s ease, width 0.3s ease', padding: '0 0', marginTop: '-30px'}}>
              <Typography variant="headerCardMenu" padding={1} sx={{ paddingBottom: '0', marginTop: '-30px' }}>
                {`${title}`}
              </Typography>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid item xs={1} display="flex" justifyContent="flex-start" alignItems="center" sx={{ padding: '0 0', marginTop: '-20px' }}>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}> */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2, padding: '0', marginTop: '-20px' }}
              aria-controls={openMenu ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              {/* <Typography>dada</Typography> */}
            </IconButton>
          </Tooltip>
        {/* </Box> */}

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={openMenu}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            variant:"myMenuVariant"
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Avatar /> {name}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <LockResetOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Change Password
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default Header;
