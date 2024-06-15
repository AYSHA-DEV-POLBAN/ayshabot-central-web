import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IconButton,
  Button,
  InputAdornment,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, {useContext, useState} from "react";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import client from "../../Global/client";
import { useNavigate } from 'react-router';
import axios from "axios";
import { AlertContext } from "../../Context";
// import CustomAlert from "../../Component/Alert";

const Login = ({ changeStat }) => {
  const navigate = useNavigate()
  const { setDataAlert } = useContext(AlertContext)
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show); 

  const [isLoading, setIsLoading] = React.useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string().required("Please input your email").email("Invalid email address"),
    // password: yup
    //   .integer()
    //   .required("Please input your password")
    //   .min(8, "Password must be at least 8 characters")
    //   .max(16, "Password must not exceed 16 characters")
    //   .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?& #^_\-+=()<>,./|\[\]{}~])[A-Za-z\d@$!%*?& #^_\-+=()<>,./|\[\]{}~]*$/,
    //     "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    //   ),
  });

  const { handleSubmit, formState: { errors }, register } = useForm({
    resolver: yupResolver(validationSchema),
  });


  const handleLogin = async (data) => {
    setIsLoading(true)
    console.log('ini data', data)
    // const res = await client.requestAPI({
    //   method: 'POST',
    //   endpoint: `/auth/signin`,
    //   data,
    //   isLogin: true
    // })    
    // console.log(res)
    // if (!res.isError) {
    //   localStorage.setItem('token', res.token)
    //   // localStorage.setItem("userId", res.userId)      
    //   // localStorage.setItem("employeeName", res.employeeName)
    //   // localStorage.setItem("position", res.position)
    //   // localStorage.setItem("rememberMe", rememberMe)
    //   setDataAlert({
    //     severity: 'success',
    //     open: true,
    //     message: "Login successful!"
    //   })
    //   // const currentUserId = localStorage.getItem("id");
    //   // const resUser = await client.requestAPI({
    //   //   method: "GET",
    //   //   endpoint: `/users/get_user_by_id/${currentUserId}`,
    //   // });
    //   // console.log("data user",resUser)
    //   // if (!resUser.isError) {
    //   //   localStorage.setItem("name", resUser.name);
    //   // }
    //   navigate('/dashboard')
    //   setIsLoading(false);
    // }else{
    //   setDataAlert({
    //     severity: 'error',
    //     open: true,
    //     message: res.error.message
    //   })   
    //   setIsLoading(false);    
    // }   
    navigate('/dashboard')
  };


  return (
    <>
    {/* <CustomAlert /> */}
    <form onSubmit={handleSubmit(handleLogin)}>
    <Grid container paddingTop={12}>
      <Grid item xs={12} textAlign={"center"}>
        <Typography variant="signinText">SIGN IN</Typography>
        {/* <Typography variant="body3">Ayshabot Central Web 👋</Typography> */}
      </Grid>
      <Grid item xs={12} paddingTop={1} textAlign={"center"}>
        <Typography variant="body4">Please sign in to continue</Typography>
      </Grid>
      <Grid item xs={12} paddingBottom={2} paddingTop={4}>
        <TextField
          label="Email"
          fullWidth
          placeholder="Email"
          {...register('email')}
          error={errors.email !== undefined}
          helperText={errors.email ? errors.email.message : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} paddingBottom={2}>
        <TextField
          fullWidth
          {...register('password')}
          label="Password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={errors.password !== undefined}
          helperText={errors.password ? errors.password.message : ''}
        />    
      </Grid>
      <Grid item xs={12} paddingTop={2}>
        <Button variant="contained" type="submit" fullWidth disabled={isLoading}>
        {isLoading ? (
          <>
            <CircularProgress size={16} color="inherit" />
            <Typography marginLeft={1}>Loading...</Typography>
          </>
        ) : (
          "SIGN IN"
        )}
        </Button>
      </Grid>
    </Grid>
    </form>
    </>
  );
};

export default Login;
