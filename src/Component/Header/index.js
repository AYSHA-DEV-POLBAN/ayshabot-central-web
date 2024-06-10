// import React from "react";
// import { Hidden, Typography } from "@mui/material";
// import Grid from "@mui/material/Grid";
// const Header = (props) => {
//   const { judul } = props;
//   return (
//     <Grid container rowSpacing={3} sx={{ position: 'sticky', top: 0, zIndex: 1100, width: '100%', height: '80px', backgroundColor: '#146C94' }}>
//       <Grid item xs={12}>
//         <Grid container className="containerHeader">
//           {/* <Grid item>
//             <div className="dividerHeader" />
//           </Grid> */}
//           <Grid item xs={11}>
//           <Hidden mdDown>
//             <Typography variant="headerCardMenu" padding={2}>
//               {`${judul}`}
//             </Typography>
//           </Hidden>

//           <Hidden mdUp>
//             <Typography variant="body2" padding={1} marginTop={1.5}>
//               {`${judul}`}
//             </Typography>
//           </Hidden>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>

//     // <div>
//     //   <Typography variant="headerCardMenu">{judul}</Typography>
//     // </div>
//   );
// };

// export default Header;



import React from "react";
import { Hidden, Typography, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Grid from "@mui/material/Grid";
import logoAysha from "../../assets/logoAysha.png";
import '../../App.css'


const Header = ({ title, open }) => { // Terima prop
  return (
    <Grid container rowSpacing={5} columnSpacing={3} sx={{ position: 'sticky', top: 0, zIndex: 1100, width: '103.95%', height: '70px', backgroundColor: '#146C94' }}>
      <Grid item xs={12}>
        <Grid container className="containerHeader">
          <Grid item xs={8} sx={{marginLeft: `${open ? 0 : 0}px`, transition: 'margin-left 0.3s ease, width 0.3s ease'}}>
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
          {/* <Grid item xs={3}>
            <div
              className={
                "container-img margin-img"
              }
            >
              <img
                className="drawer-logo"
                src={logoAysha}
                alt="AyshaBot Central"
              />
            </div>
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
