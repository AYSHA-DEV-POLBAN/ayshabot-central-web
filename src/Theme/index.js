import { createTheme } from "@mui/material/styles";

let globalTheme = createTheme({
  palette: {
    primary: {
      main: "#0078D7",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
  typography: {
    fontFamily: ["Poppins"],
    textDetail: {
      fontSize: ["40px"],
    },
    noDataTable: {
      fontSize: ["16px"],
      color: ["rgba(0, 0, 0, 0.60)"],
      lineHeight: ["150%"],
      fontWeight: ["500"],
    },
    body2: {
      fontSize: ["28px"],
      fontWeight: [500],
      color: ["#0A0A0A"],
      letterSpacing: ["-0.021em"],
    },
    body3: {
      fontSize: ["14px"],
      color: ["rgba(0, 0, 0, 0.87)"],
      lineHeight: ["143%"],
      letterSpacing: ["0.17px"],
    },
    body4: {
      fontSize: ["14px"],
      color: ["#9E9E9E"],
      lineHeight: ["125%"],
    },
    title: {
      fontSize: ["28px"],
      fontWeight: ["700"],
      color: ["#0A0A0A"],
      letterSpacing: ["-0.021em"],
    },
    primaryText: {
      fontSize: ["14px"],
      color: ["#3267E3"],
      lineHeight: ["143%"],
      letterSpacing: ["0.17px"],
    },
    headerCardMenu: {
      fontSize: ["25px"],
      color: ["#F6F1F1"],
      lineHeight: ["100%"],
      fontWeight: ["550"],
      paddingLeft: ["10px"],
    },
    searchTitleText: {
      fontSize: ["14px"],
      color: ["#272930"],
      lineHeight: ["21px"],
      fontWeight: ["500"],
    },
    drawerNameUser: {
      fontSize: ["16px"],
      color: ["#333"],
      fontWeight: ["600"],
      lineHeight: ["150%"],
    },
    drawerPostion: {
      fontSize: ["14px"],
      color: ["rgba(51, 51, 51, 0.9)"],
      lineHeight: ["125%"],
    },
    titleTextWarningUpload: {
      color: ['rgba(0, 0, 0, 0.38)'],
      fontSize: ["12px"],
      fontFamily: ["Poppins"],
      fontStyle: ["normal"],
      fontWeight: ["400"],
      lineHeight: ["150%"],
    },
    labelHeaderDetail: {
      color: ['rgba(0, 0, 0, 0.60)'],
      fontSize: ["12px"],
      fontFamily: ["Poppins"],
      fontStyle: ["normal"],
      fontWeight: ["400"],
      lineHeight: ["150%"],
    },
    textDetail: {
      color: ['rgba(0, 0, 0, 0.60)'],
      fontSize: ["12px"],
      fontFamily: ["Poppins"],
      fontStyle: ["normal"],
      fontWeight: ["400"],
      lineHeight: ["150%"],
    },
    inputDetail: {
      color: ['rgba(0, 0, 0, 0.87)'],
      fontSize: ["16px"],
      fontFamily: ["Poppins"],
      fontStyle: ["normal"],
      fontWeight: ["400"],
      lineHeight: ["150%"],
    },
    signinText: {
      fontSize: ["28px"],
      fontFamily: ["Poppins"],
      fontWeight: ["700"],
      color: ["#19A7CE"],
      letterSpacing: ["-0.021em"],
    },
  },
  
  components: {
    MuiButton: {
      variants: [
        {
          props: {
            variant: "primaryButton",
            color: "primary",
          },
          style: {
            color: "#FFFFFF",
            border: "none",
            borderRadius: "4px",
            boxShadow:
              "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
            background: "#0078D7",
            padding: "6px 16px",
            "&:hover": {
              color: "rgba(0, 0, 0, 0.38)",
              backgroundColor: "rgba(0, 0, 0, 0.12)",
            },
            "&:active": {
              backgroundColor: "rgba(0, 0, 0, 0.12)",
              color: "rgba(0, 0, 0, 0.38)",
            },
          },
        },
        {
          props: {
            variant: "outlined",
          },
          style: {
            textTransform: "none",
            // padding: "6px 16px",
            fontSize: "14px",
            lineHeight: "125%",
            // color: "#2196F3",         
            // justifyContent: "flex-start",
            // background: "#EECEB0",
            // borderColor: "#734011"
          },
        },        
        {
          props: {
            variant: "outlined-warning",
          },
          style: {
            textTransform: "none",
            width: "100%",
            padding: "6px 16px",
            fontSize: "14px",
            lineHeight: "125%",
            borderRadius: "6px",
            background: "#EECEB0",
            color: "#734011",
            borderColor: "#734011",            
          },          
        },
        {
          props: {
            variant: "outlined-holiday",
          },
          style: {
            textTransform: "none",
            // padding: "6px 16px",
            fontSize: "14px",
            // lineHeight: "125%",
            color: "#CB3A31",            
            background: "#FFF4F2",
            borderColor: "black",
            // marginRight: "10vh",
            marginTop: "4vh",
            // width: "40%", 
            // marginRight: "12vh", 
            // marginTop: "9vh"
          },          
        },
        {
          props: {
            variant: "outlined-task",
          },
          style: {
            textTransform: "none",
            width: "40%",
            // padding: "6px 16px",
            fontSize: "14px",
            lineHeight: "125%",
            borderRadius: "6px",
            borderColor: "#2196F3",
            background:'#B1C5F6',
            color: "#3267E3",
          },
        },
        {
          props: {
            variant: "saveButton",
          },
          style: {
            color: "#FFFFFF",
            border: "none",
            borderRadius: "4px",
            padding: "6px 16px",
            boxShadow:
              "0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)",
            background: "#2196F3",
            textTransform: "none",
            fontSize: "14px",
            lineHeight: "125%",
            "&:hover": {
              backgroundColor: "#2c80c3",
            },
            "&:active": {
              backgroundColor: "#2c80c3",
            },
            "&:disabled": {
              color: "#00000061",
              boxShadow: "none",
              backgroundColor: "#0000001F",
            },
          },
        },
        {
          props: {
            variant: "cancelButton",
          },
          style: {
            color: "#ED6C02",
            border: "1px solid rgba(237, 108, 2, 0.50)",
            borderRadius: "4px",
            padding: "6px 16px",
            background: "transparant",
            textTransform: "none",
            fontSize: "14px",
            lineHeight: "125%",
            "&:hover": {
              backgroundColor: "#ED6C02",
              color: "#FFFFFF",
            },
            "&:active": {
              backgroundColor: "#ED6C02",
              color: "#FFFFFF",
            },
          },
        }, 
        {
          props: {
            variant: "signin",
            color: "19A7CE"
          },
          style: {
            color: "#FFFFFF",
            border: "none",
            borderRadius: "30px",
            boxShadow:
              "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
            background: "#0078D7",
            padding: "6px 16px",
            "&:hover": {
              color: "rgba(0, 0, 0, 0.38)",
              backgroundColor: "rgba(0, 0, 0, 0.12)",
            },
            "&:active": {
              backgroundColor: "rgba(0, 0, 0, 0.12)",
              color: "rgba(0, 0, 0, 0.38)",
            },
          },      
        },       
      ],
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: ["14px !important"],
          color: "rgba(0, 0, 0, 0.87)",
        },
      },
    },
    
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 28,
          height: 16,
          padding: 0,
          display: 'flex',
          '&:active .MuiSwitch-thumb': {
            width: 15,
          },
          '&:active .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
          },
        },
        switchBase: {
          padding: 2,
          '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: theme => theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
          },
        },
        thumb: {
          boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
          width: 12,
          height: 12,
          borderRadius: 6,
          transition: theme => theme.transitions.create(['width'], {
            duration: 200,
          }),
        },
        track: {
          borderRadius: 16 / 2,
          opacity: 1,
          backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
          boxSizing: 'border-box',
        },
      },
    },

    MuiMenu: {
      variants: [
        {
          props: {
            variant: "myMenuVariant",
          },
          style: {
            paper: {
              backgroundColor: "#0078D7",
              color: "#ffffff",
            },
          },
        },
        // Add more variants as needed
      ],
    }
  },
});

globalTheme = createTheme(globalTheme, {
  palette: {
    info: {
      main: globalTheme.palette.secondary.main,
    },
  },
});

export default globalTheme;
