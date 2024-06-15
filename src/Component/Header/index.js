import React from "react";
import { Hidden, Typography, IconButton, Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, Tooltip } from "@mui/material";
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import Grid from "@mui/material/Grid";
import { useNavigate } from 'react-router';
import '../../App.css'


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
    <Grid container rowSpacing={5} columnSpacing={3} sx={{ position: 'sticky', top: 0, zIndex: 1100, width: '103.95%', height: '70px', backgroundColor: '#146C94', display: 'flex' }}>
      <Grid item xs={10.5}>
        <Grid container className="containerHeader">
          <Grid item xs={12} sx={{marginLeft: `${open ? 0 : 0}px`, transition: 'margin-left 0.3s ease, width 0.3s ease'}}>
            <Hidden mdDown>
              <Typography variant="headerCardMenu" padding={1}>
                {`${title}`}
              </Typography>
            </Hidden>

            <Hidden mdUp>
              <Typography variant="body2" padding={1} marginTop={1}>
                {`${title}`}
              </Typography>
            </Hidden>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid item xs={1.5}>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={openMenu ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              {/* <Typography>dada</Typography> */}
            </IconButton>
          </Tooltip>
        </Box>

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
            <Avatar /> NAMA USER
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
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
