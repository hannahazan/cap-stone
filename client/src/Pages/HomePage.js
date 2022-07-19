import React, { useState } from "react";
import { useNavigate } from "react-router";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
function HomePage() {
   
    const [checkBox,setCheckBox]= useState(false)
  return (
    <div>
    <FormGroup>
            <FormControlLabel control={<Checkbox   />} label="darkMode
            "  onChange={()=>{checkBox===true?setCheckBox(false):setCheckBox(true)}}/>
    </FormGroup>
    {checkBox===true?
    
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>  
        
      </main>
    </ThemeProvider>
    :
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>  
        
      </main>
    </ThemeProvider>
  }
  </div>
  );
}

export default HomePage;
