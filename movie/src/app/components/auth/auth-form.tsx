// // "use client";

// // import React, { useState } from 'react'
// // import { Box, Button, Dialog, FormControl, IconButton, InputLabel, OutlinedInput, TextField, Typography, InputAdornment  } from '@mui/material'
// // import { Visibility, VisibilityOff } from '@mui/icons-material';
// // import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// // import Link from 'next/link';
// // import { GoogleLogin } from '@react-oauth/google';
// // import { jwtDecode } from "jwt-decode";
// // import Swal from 'sweetalert2';
// // import { useRouter } from 'next/navigation';
// // // import { useRouter } from 'next/router';




// // interface AuthFormProps {
// //   onSubmit: (inputs: { email: string; phone: string; password: string, signup: boolean }) => void;
// //   isAdmin: boolean;
// // }


// // const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isAdmin }) => {

// //   const [isSignup, setIsSignup] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);

// //   const handleClickShowPassword = () => setShowPassword((show) => !show);
// //   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
// //     event.preventDefault();
// //   };

// //   const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
// //     event.preventDefault();
// //   };

// //   const [inputs, setInputs] = useState({
// //     email: "", phone: "", password: ""
// //   });

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setInputs((prevState) => ({
// //       ...prevState,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };



// // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
  
// //     // Basic validation for required fields
// //     if (!inputs.email || !inputs.password || (isSignup && !inputs.phone)) {
// //       alert("Please fill in all the required fields.");
// //       return;
// //     }
  
// //     console.log("Submitting Data: ", {
// //       email: inputs.email,
// //       phone: inputs.phone,
// //       password: inputs.password,
// //       signup: isAdmin ? false : isSignup
// //     });
  
// //     try{
// //     await onSubmit({
// //       email: inputs.email,
// //       phone: inputs.phone,
// //       password: inputs.password, 
// //       signup: isAdmin ? false : isSignup,  // Check if it's a signup or signin
// //     });

// //     const router = useRouter();
// //     router.push('/components/movies');

// //     // await Swal.fire({
// //     //   position: 'top-end',
// //     //   icon: 'success',
// //     //   title: 'Login Successful',
// //     //   showConfirmButton: false,
// //     //   timer: 1500
// //     // });



// //   }catch (err) {
// //     // console.error('Login failed:', err);
// //     // Swal.fire({
// //     //   icon: 'error',
// //     //   title: 'Oops...',
// //     //   text: 'Something went wrong!',
// //     // });
// //   }
// //   };
  
  

// //   return (
// //     <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
// //       <Box sx={{ ml: "auto", padding: 1 }}>
// //         <Link href="/" legacyBehavior passHref>
// //           <IconButton>
// //             <CloseRoundedIcon />
// //           </IconButton>
// //         </Link>
// //       </Box>

// //       <Typography variant="h4" textAlign={'center'} marginTop={2}>
// //         {isSignup ? "Sign Up" : "Sign In"}
// //       </Typography>

// //       <form onSubmit={handleSubmit}>
// //         <Box display={'flex'} justifyContent={'center'} flexDirection="column" width={500} height={'auto'} margin={'auto'} padding={5} alignItems="center">
// //           <TextField
// //             sx={{ m: 1, marginTop: 3, width: '35ch' }}
// //             value={inputs.email}
// //             onChange={handleChange}
// //             id="outlined-required"
// //             label="Email"
// //             placeholder="johndoe@gmail.com"
// //             name="email"
// //           />

// //           {isSignup && (
// //             <TextField
// //               sx={{ m: 1, marginTop: 3, width: '35ch' }}
// //               value={inputs.phone}
// //               onChange={handleChange}
// //               id="outlined-basic"
// //               label="Phone Number"
// //               variant="outlined"
// //               type="number"
// //               name="phone"
// //               InputProps={{
// //                 startAdornment: <InputAdornment position="start">+91</InputAdornment>,
// //               }}
// //             />
// //           )}

// //           <FormControl sx={{ m: 1, marginTop: 3, width: '35ch' }} variant="outlined">
// //             <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
// //             <OutlinedInput
// //               id="outlined-adornment-password"
// //               type={showPassword ? 'text' : 'password'}
// //               value={inputs.password}
// //               onChange={handleChange}
// //               name="password"
// //               endAdornment={
// //                 <InputAdornment position="end">
// //                   <IconButton
// //                     aria-label="toggle password visibility"
// //                     onClick={handleClickShowPassword}
// //                     onMouseDown={handleMouseDownPassword}
// //                     onMouseUp={handleMouseUpPassword}
// //                     edge="end"
// //                   >
// //                     {showPassword ? <VisibilityOff /> : <Visibility />}
// //                   </IconButton>
// //                 </InputAdornment>
// //               }
// //               label="Password"
// //             />
// //           </FormControl>

// //           <Button type="submit" variant="contained" sx={{ marginTop: 2, width: 110 }}>
// //             {isSignup ? "Sign Up" : "Sign In"}
// //           </Button>

// //           {!isAdmin && (
// //           <Typography sx={{ mt: 5 }}>
// //             {isSignup ? "Already have an account?" : "Don't have an account?"}
// //           </Typography>
// //           ) 
// //           }

// //          {!isAdmin && (<Button 
// //             onClick={() => setIsSignup(!isSignup)} 
// //             variant="text" 
// //             fullWidth
// //             sx={{ mt: 0, borderRadius: 10 }}>
// //             {isSignup ? "Sign In" : "Sign Up"}
// //           </Button>
// //          )
// //         }

// //         {!isAdmin && (  
// //           <Typography fontSize={15} fontWeight={100} sx={{ mt: 2 }}>
// //             OR
// //           </Typography>
// //         )}

// //         {!isAdmin && (  
// //           <Typography fontSize={15} fontWeight={600} sx={{ mt: 2 }}>
// //             Sign In with
// //           </Typography>
// //         )}

// //           {!isAdmin && (
// //             <>
// //               <Typography sx={{ mt: 2 }}>OR</Typography>
// //               <Typography sx={{ mt: 2 }}>Sign In with</Typography>
// //               <GoogleLogin
// //                 onSuccess={(credentialResponse) => {
// //                 const credential = credentialResponse?.credential;
// //                 if (credential) {
// //                 const decoded = jwtDecode(credential); // Now it's safe to decode
// //                 console.log("Google Sign-In Success", decoded);
// //                  // Process the Google credentials
// //                 } else {
// //                   console.error("Google credential is undefined.");
// //                 }
// //               }}
// //               onError={() => {
// //                 console.log('Google Sign-In Failed');
// //               }}
// //             />

// //             </>
// //           )}

// //         </Box>
// //       </form>
// //     </Dialog>
// //   );
// // };

// // export default AuthForm;
// "use client";

// import React, { useState } from 'react'
// import { Box, Button, Dialog, FormControl, IconButton, InputLabel, OutlinedInput, TextField, Typography, InputAdornment  } from '@mui/material'
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import Link from 'next/link';
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
// import Swal from 'sweetalert2';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';




// interface AuthFormProps {
//   onSubmit: (inputs: { email: string; phone: string; password: string, signup: boolean }) => void;
//   isAdmin: boolean;
// }


// const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isAdmin }) => {

//   const router = useRouter();

//   const [isSignup, setIsSignup] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//   };

//   const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//   };

//   const [inputs, setInputs] = useState({
//     email: "", phone: "", password: ""
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputs((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };


//   const handleGoogleSuccess = async (credentialResponse: any) => {
//     const credential = credentialResponse?.credential;
//     if (credential) {
//       const decoded: any = jwtDecode(credential); // Now it's safe to decode
//       console.log("Google Sign-In Success", decoded);

//       const { email, name } = decoded; // Extract email and other details

//       try {
//         // Make an API call to your backend to check if the user exists
//         const response = await axios.post('/api/auth/google-signin', {
//           email: email,  // Send email to check if the user exists
//         });

//         if (response.data && response.data.userId) {
//           // User exists, sign them in
//           sessionStorage.setItem('userId', response.data.userId);
//           sessionStorage.setItem('email', email);

//           await Swal.fire({
//             position: 'top-end',
//             icon: 'success',
//             title: 'Google Sign-In Successful',
//             showConfirmButton: false,
//             timer: 1500
//           });

//           // Redirect to movies page
//           router.push('/components/movies');
//         } else {
//           console.error("User not found. Please sign up.");
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'No account associated with this email. Please sign up first!',
//           });
//         }
//       } catch (error) {
//         console.error('Error checking user existence:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'An error occurred while processing your request.',
//         });
//       }
//     } else {
//       console.error("Google credential is undefined.");
//     }
//   };



// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
  
//     // Basic validation for required fields
//     if (!inputs.email || !inputs.password || (isSignup && !inputs.phone)) {
//       alert("Please fill in all the required fields.");
//       return;
//     }
  
//     console.log("Submitting Data: ", {
//       email: inputs.email,
//       phone: inputs.phone,
//       password: inputs.password,
//       signup: isAdmin ? false : isSignup
//     });
  
//     try{
//     await onSubmit({
//       email: inputs.email,
//       phone: inputs.phone,
//       password: inputs.password, 
//       signup: isAdmin ? false : isSignup,  // Check if it's a signup or signin
//     });

//     const router = useRouter();
//     router.push('/components/movies');

//     // await Swal.fire({
//     //   position: 'top-end',
//     //   icon: 'success',
//     //   title: 'Login Successful',
//     //   showConfirmButton: false,
//     //   timer: 1500
//     // });



//   }catch (err) {
//     // console.error('Login failed:', err);
//     // Swal.fire({
//     //   icon: 'error',
//     //   title: 'Oops...',
//     //   text: 'Something went wrong!',
//     // });
//   }
//   };
  
  

//   return (
//     <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
//       <Box sx={{ ml: "auto", padding: 1 }}>
//         <Link href="/" legacyBehavior passHref>
//           <IconButton>
//             <CloseRoundedIcon />
//           </IconButton>
//         </Link>
//       </Box>

//       <Typography variant="h4" textAlign={'center'} marginTop={2}>
//         {isSignup ? "Sign Up" : "Sign In"}
//       </Typography>

//       <form onSubmit={handleSubmit}>
//         <Box display={'flex'} justifyContent={'center'} flexDirection="column" width={500} height={'auto'} margin={'auto'} padding={5} alignItems="center">
//           <TextField
//             sx={{ m: 1, marginTop: 3, width: '35ch' }}
//             value={inputs.email}
//             onChange={handleChange}
//             id="outlined-required"
//             label="Email"
//             placeholder="johndoe@gmail.com"
//             name="email"
//           />

//           {isSignup && (
//             <TextField
//               sx={{ m: 1, marginTop: 3, width: '35ch' }}
//               value={inputs.phone}
//               onChange={handleChange}
//               id="outlined-basic"
//               label="Phone Number"
//               variant="outlined"
//               type="number"
//               name="phone"
//               InputProps={{
//                 startAdornment: <InputAdornment position="start">+91</InputAdornment>,
//               }}
//             />
//           )}

//           <FormControl sx={{ m: 1, marginTop: 3, width: '35ch' }} variant="outlined">
//             <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//             <OutlinedInput
//               id="outlined-adornment-password"
//               type={showPassword ? 'text' : 'password'}
//               value={inputs.password}
//               onChange={handleChange}
//               name="password"
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     onMouseUp={handleMouseUpPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               label="Password"
//             />
//           </FormControl>

//           <Button type="submit" variant="contained" sx={{ marginTop: 2, width: 110 }}>
//             {isSignup ? "Sign Up" : "Sign In"}
//           </Button>

//           {!isAdmin && (
//           <Typography sx={{ mt: 5 }}>
//             {isSignup ? "Already have an account?" : "Don't have an account?"}
//           </Typography>
//           ) 
//           }

//          {!isAdmin && (<Button 
//             onClick={() => setIsSignup(!isSignup)} 
//             variant="text" 
//             fullWidth
//             sx={{ mt: 0, borderRadius: 10 }}>
//             {isSignup ? "Sign In" : "Sign Up"}
//           </Button>
//          )
//         }

//         {!isAdmin && (  
//           <Typography fontSize={15} fontWeight={100} sx={{ mt: 2 }}>
//             OR
//           </Typography>
//         )}

//         {!isAdmin && (  
//           <Typography fontSize={15} fontWeight={600} sx={{ mt: 2 }}>
//             Sign In with
//           </Typography>
//         )}

//           {!isAdmin && (
//             <>
//               <Typography sx={{ mt: 2 }}>OR</Typography>
//               <Typography sx={{ mt: 2 }}>Sign In with</Typography>
//               <GoogleLogin
//                 onSuccess={(credentialResponse) => {
//                 const credential = credentialResponse?.credential;
//                 if (credential) {
//                 const decoded = jwtDecode(credential); // Now it's safe to decode
//                 console.log("Google Sign-In Success", decoded);
//                  // Process the Google credentials
//                 } else {
//                   console.error("Google credential is undefined.");
//                 }
//               }}
//               onError={() => {
//                 console.log('Google Sign-In Failed');
//               }}
//             />

//             </>
//           )}

//         </Box>
//       </form>
//     </Dialog>
//   );
// };

// export default AuthForm;
"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";
import { googleSignIn } from "@/app/api-helpers/api-helpers";

interface AuthFormProps {
  onSubmit: (inputs: { email: string; phone: string; password: string; signup: boolean }) => void;
  isAdmin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isAdmin }) => {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const credential = credentialResponse?.credential;
    if (credential) {
      const decoded: any = jwtDecode(credential);
      const { email } = decoded;

      try {
        console.log("email is: ", email)
        const response = await googleSignIn(email);

        console.log("res is:",response.data)
        if (response.data && response.data.userId) {
          
          sessionStorage.setItem("userId", response.data.userId);
          sessionStorage.setItem("email", email);

          await Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Google Sign-In Successful",
            showConfirmButton: false,
            timer: 1500,
          });

          router.push("/components/movies");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No account associated with this email. Please sign up first!",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while processing your request.",
        });
      }
    } else {
      console.error("Google credential is undefined.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputs.email || !inputs.password || (isSignup && !inputs.phone)) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      await onSubmit({
        email: inputs.email,
        phone: inputs.phone,
        password: inputs.password,
        signup: isAdmin ? false : isSignup,
      });

      await Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push("/components/movies");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <Link href="/" passHref>
          <IconButton>
            <CloseRoundedIcon />
          </IconButton>
        </Link>
      </Box>

      <Typography variant="h4" textAlign={"center"} marginTop={2}>
        {isSignup ? "Sign Up" : "Sign In"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
          width={500}
          height={"auto"}
          margin={"auto"}
          padding={5}
          alignItems="center"
        >
          <TextField
            sx={{ m: 1, marginTop: 3, width: "35ch" }}
            value={inputs.email}
            onChange={handleChange}
            id="outlined-required"
            label="Email"
            placeholder="johndoe@gmail.com"
            name="email"
          />

          {isSignup && (
            <TextField
              sx={{ m: 1, marginTop: 3, width: "35ch" }}
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

          <FormControl sx={{ m: 1, marginTop: 3, width: "35ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={inputs.password}
              onChange={handleChange}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
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
            <>
              <Typography sx={{ mt: 5 }}>
                {isSignup ? "Already have an account?" : "Don't have an account?"}
              </Typography>

              <Button onClick={() => setIsSignup(!isSignup)} variant="text" sx={{ mt: 0 }}>
                {isSignup ? "Sign In" : "Sign Up"}
              </Button>

              <Typography fontSize={15} fontWeight={100} sx={{ mt: 2 }}>
                OR
              </Typography>

              <Typography fontSize={15} fontWeight={600} sx={{ mt: 2 }}>
                Sign In with
              </Typography>

              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  console.log("Google Sign-In Failed");
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
