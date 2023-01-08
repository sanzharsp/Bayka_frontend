/* eslint-disable */ 
import * as React from 'react';
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Switch from "@mui/material/Switch";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { backdropClasses } from '@mui/material';


const Auth = ()=>{


    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);
    const handleSetRememberMe = () => setRememberMe(!rememberMe);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const [state, setState] = useState({
        open: false,
        vertical: '',
        horizontal: '',
      });
      const { vertical, horizontal, open } = state;
    

      
      
    
      const handleClose = () => {
        setState({ ...state, open: false });
      };



    const Auth_Login = async (e) => {
        e.preventDefault();
        try {
            await  axios.post('http://127.0.0.1:8000/api/v1/auth/', {
                email: email,
                password: password
            }).then(response => {
                
   
                localStorage.setItem("access",response.data.access);
                localStorage.setItem("refresh",response.data.refresh);
   

                navigate("/dashboard", { replace: true });
           
                
                });
        } catch (error) {
            if (error.response.status === 404){
                console.log("404")
                  setState({ open: true, vertical: 'top', horizontal: 'right'  });
            }

               
            }
     
          
        }

return(
    <>    
    <Snackbar
    autoHideDuration={4000}
    anchorOrigin={{ vertical, horizontal }}
    open={open}
    onClose={handleClose}
    message = { <span id="message-id" > Данный пользователь не найден </span> }
    key={vertical + horizontal}


  />


 
    <MDBox pt={4} pb={3} px={3}>
        
 
    <MDBox component="form" role="form" >
    <MDBox mb={2}>
      <MDInput type="email" label="Емайл" fullWidth value={email} onChange={(e) => setEmail(e.target.value)}/>
    </MDBox>
    <MDBox mb={2}>
      <MDInput type="password" label="Пароль" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
    </MDBox>
    <MDBox display="flex" alignItems="center" ml={-1}>
      <Switch checked={rememberMe} onChange={handleSetRememberMe} />
      <MDTypography
        variant="button"
        fontWeight="regular"
        color="text"
        onClick={handleSetRememberMe}
        sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
      >
        &nbsp;&nbsp;Запомнить меня
      </MDTypography>
    </MDBox>
    <MDBox mt={4} mb={1}>
      <MDButton variant="gradient" color="info" fullWidth onClick={Auth_Login}>
        вход
      </MDButton>
    </MDBox>
    <MDBox mt={3} mb={1} textAlign="center">
      <MDTypography variant="button" color="text">
        Забыли пороль?{" "}
        <MDTypography
          component={Link}
          to="/authentication/sign-up"
          variant="button"
          color="info"
          fontWeight="medium"
          textGradient
        >
          сбросить пороль
        </MDTypography>
      </MDTypography>
    </MDBox>
  </MDBox>
  </MDBox>
  </>
)
}

export default Auth;