
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


const SignUp=()=>{
    const [checkBox,setCheckBox]= useState(false)
    const [formAsso, setFormAsso] = useState({
        rna:"",
        pseudo:"",
        email:"",
        password:""
      });
    
      const navigate = useNavigate();
      
      function updateFormAsso(value) {
        return setFormAsso((prev) => {
          return { ...prev, ...value };
        });

      }
    
     // This function will handle the submission.
     async function onSubmit(e) {
      e.preventDefault();
    
      // When a post request is sent to the create url, we'll add a new record to the database.
      const newAsso = { ...formAsso };
      console.log(newAsso)
      
    
      await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAsso),

      })
      .catch(error => {
        window.alert(error);
        return;
      });
    
      setFormAsso({pseudo:"", rna:"" , email:"" });
      navigate("/");
    }
    
    const [formVlt, setFormVlt] = useState({
        firstname:"",
        lastname:"",
        pseudo:"",
        email:"",
        password:"",
      })
    
      
      function updateFormVlt(value) {
        return setFormVlt((prev) => {
          return { ...prev, ...value };
        });

      }
    
     // This function will handle the submission.
     async function onSubmitVlt(e) {
      e.preventDefault();
    
      // When a post request is sent to the create url, we'll add a new record to the database.
      const newVlt = { ...formVlt };
      
    
      await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVlt),
      })
      .catch(error => {
        window.alert(error);
        return;
      });
    
      setFormVlt({firstname:"",lastname:"",pseudo:"",email:"",password:"",});
      navigate("/");
     
    }
        return(
        <div>  
            <FormGroup>
                        <FormControlLabel control={<Checkbox   />} label="Association
                        "  onChange={()=>{setCheckBox(true)}}/>
            </FormGroup>
           
            {checkBox===true?     
            <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              
              <Box component="form" noValidate  sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>:
            
                    <TextField
                      autoComplete="given-name"
                      name="pseudo"
                      required
                      fullWidth
                      id="pseudo"
                      label="pseudo"
                      autoFocus
                      onChange={(e)=>updateFormAsso({pseudo: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e)=>updateFormAsso({email: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="rna"
                      label="rna"
                      name="rna"
                      autoComplete="rna"
                      onChange={(e)=>updateFormAsso({rna: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="password"
                      label="password"
                      name="password"
                      autoComplete="password"
                      onChange={(e)=>updateFormAsso({password: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={onSubmit}
                >
                 <Link href="/a" variant="body2">
                      Sign Up
                 </Link>
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/SignUp" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
        
        :
        
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              
              <Box component="form" noValidate  sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>:
            
                    <TextField
                      autoComplete="given-name"
                      name="firstname"
                      required
                      fullWidth
                      id="firstname"
                      label="firstname"
                      autoFocus
                      onChange={(e)=>updateFormVlt({firstname: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="lastname"
                      label="lastname"
                      name="lastname"
                      autoComplete="lastname"
                      onChange={(e)=>updateFormVlt({lastname: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="pseudo"
                      label="pseudo"
                      name="pseudo"
                      autoComplete="pseudo"
                      onChange={(e)=>updateFormVlt({pseudo: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="email"
                      name="email"
                      autoComplete="email"
                      onChange={(e)=>updateFormVlt({email: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="password"
                      label="password"
                      name="password"
                      autoComplete="password"
                      onChange={(e)=>updateFormVlt({password: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={onSubmitVlt}
                >
                 <Link href="/a" variant="body2">
                      Sign Up
                 </Link>
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/SignUp" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
            }     
        </div>
        )
    
}

export default SignUp