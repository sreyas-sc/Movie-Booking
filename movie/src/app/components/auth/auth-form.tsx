"use client";

import React, { useState } from 'react'
import { Box, Button, Dialog, FormControl, IconButton, InputLabel, OutlinedInput, TextField, Typography, InputAdornment  } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Link from 'next/link';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


interface AuthFormProps {
  onSubmit: (inputs: { email: string; phone: string; password: string, signup: boolean }) => void;
  isAdmin: boolean;
}


const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isAdmin }) => {

  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [inputs, setInputs] = useState({
    email: "", phone: "", password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };



const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Basic validation for required fields
    if (!inputs.email || !inputs.password || (isSignup && !inputs.phone)) {
      alert("Please fill in all the required fields.");
      return;
    }
  
    console.log("Submitting Data: ", {
      email: inputs.email,
      phone: inputs.phone,
      password: inputs.password,
      signup: isAdmin ? false : isSignup
    });
  
    onSubmit({
      email: inputs.email,
      phone: inputs.phone,
      password: inputs.password, 
      signup: isAdmin ? false : isSignup,  // Check if it's a signup or signin
    });
  };
  
  

  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <Link href="/" legacyBehavior passHref>
          <IconButton>
            <CloseRoundedIcon />
          </IconButton>
        </Link>
      </Box>

      <Typography variant="h4" textAlign={'center'} marginTop={2}>
        {isSignup ? "Sign Up" : "Sign In"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box display={'flex'} justifyContent={'center'} flexDirection="column" width={500} height={'auto'} margin={'auto'} padding={5} alignItems="center">
          <TextField
            sx={{ m: 1, marginTop: 3, width: '35ch' }}
            value={inputs.email}
            onChange={handleChange}
            id="outlined-required"
            label="Email"
            placeholder="johndoe@gmail.com"
            name="email"
          />

          {isSignup && (
            <TextField
              sx={{ m: 1, marginTop: 3, width: '35ch' }}
              value={inputs.phone}
              onChange={handleChange}
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              type="number"
              name="phone"
              InputProps={{
                startAdornment: <InputAdornment position="start">+91</InputAdornment>,
              }}
            />
          )}

          <FormControl sx={{ m: 1, marginTop: 3, width: '35ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={inputs.password}
              onChange={handleChange}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Button type="submit" variant="contained" sx={{ marginTop: 2, width: 110 }}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          {!isAdmin && (
          <Typography sx={{ mt: 5 }}>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </Typography>
          ) 
          }

         {!isAdmin && (<Button 
            onClick={() => setIsSignup(!isSignup)} 
            variant="text" 
            fullWidth
            sx={{ mt: 0, borderRadius: 10 }}>
            {isSignup ? "Sign In" : "Sign Up"}
          </Button>
         )
        }

        {!isAdmin && (  
          <Typography fontSize={15} fontWeight={100} sx={{ mt: 2 }}>
            OR
          </Typography>
        )}

        {!isAdmin && (  
          <Typography fontSize={15} fontWeight={600} sx={{ mt: 2 }}>
            Sign In with
          </Typography>
        )}

        {/* {!isAdmin && (  
          <IconButton>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google">
              <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
              <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
              <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
              <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
            </svg>
          </IconButton>
        )} */}

          {!isAdmin && (
            <>
              <Typography sx={{ mt: 2 }}>OR</Typography>
              <Typography sx={{ mt: 2 }}>Sign In with</Typography>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                const credential = credentialResponse?.credential;
                if (credential) {
                const decoded = jwtDecode(credential); // Now it's safe to decode
                console.log("Google Sign-In Success", decoded);
                 // Process the Google credentials
                } else {
                  console.error("Google credential is undefined.");
                }
              }}
              onError={() => {
                console.log('Google Sign-In Failed');
              }}
            />

            </>
          )}

        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
