import { AutoFixOff } from '@mui/icons-material';
import axios from 'axios'

export const getAllMovies = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters);
    const res = await axios.get(`http://localhost:5000/movie?${params}`);

    if (res.status !== 200) {
      console.log("No Data");
      return;
    }

    const data = await res.data;
    return data;
  } catch (err) {
    console.log("Error: ", err.message);
  }
};


  export const sendUserAuthRequest = async (data, signup) => {
    try {
      // Log the data object to see if it contains phone, email, and password
      console.log("Auth Data: ", data);
  
      // Check if the necessary data properties are provided
      if (!data || !data.email || !data.password || (signup && !data.phone)) {
        console.error("Missing required fields:", data);
        throw new Error("Missing required fields");
      }
  
      // Make the API request
      const res = await axios.post(`http://localhost:5000/user/${signup ? "signup" : "login"}`, {
        phone: signup ? data.phone : "",
        email: data.email,
        password: data.password,
      });

      console.log("API Response: ", res.data); // Add this line to log API response

  
      // Check if the response status is not 200 or 201
      if (res.status !== 200 && res.status !== 201) {
        console.log("Unexpected error occurred!", res.status);
        return;
      }
  
      // Extract and return the data from the response
      const resData = await res.data;
      return resData;
    } catch (err) {
      // Handle errors
      console.error("Error:", err.message);
    }
  };


  export const sendAdminAuthRequest = async (data) => {
    console.log("Received Auth Data: ", data);  // to check if the data is being passed properly
    
    if (!data?.email || !data?.password) {
      throw new Error("Email or Password is undefined");
    }

    try {
      // console.log("email is")
      console.log("Attempting to login with email: ", data.email, data.password);

      const res = await axios.post("http://localhost:5000/admin/login", {
        email: data.email,
        password: data.password,
      });

      console.log("API Response: ", res.data); // Log API response

  
      if (res.status !== 200 && res.status !== 201 ) {
        console.log("Unexpected error occurred!", res.status);
        return null;
      }
      
      return res.data;
      // const resData = await res.data;
      // return resData;
    } catch (err) {
      console.log("Error occurred:", err);
      return null; // Return null on error
      // return null;
    }
  };
  


  export const getMovieDetails = async (id) => {
    console.log(`Fetching movie details for ID: ${id}`);
    try {
      const response = await axios.get(`http://localhost:5000/movie/${id}`);
      console.log('Movie details response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  };

  export const getUserBooking = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/bookings/${id}', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };
  


  //delete the hostory
  export const deleteBooking = async(id) =>{
    const res = await axios.delete(`http://localhost:5000/booking/${id}`)
    .catch((err) =>console.log(err));

    if(res.status !== 200){
      return console.log("Unexpected error");
    }

    const resData = await res.data;
    return resData;
  }


  // Get the  user details by the id
  export const getUserDetails = async() =>{
    const id = localStorage.getItem("userId");
    const res = await axios.get(`http://localhost:5000/user/${id}`)
    .catch(err => console.log(err));

    if(res.status!==200){
      return console.log("Unexpected error");
    }
    const resData = await res.data;
    return resData;
  }

export const addMovie = async (formData) => {
  console.log('Sending formData:', formData); // Log the formData

  const token = localStorage.getItem("token");
  console.log('Token:', token); // Log the token

  try {
    const res = await axios.post('http://localhost:5000/movie', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (res.status !== 201) {
      throw new Error(`Failed to add movie, status: ${res.status}`);
    }

    return res.data;
  } catch (err) {
    console.error('Error adding movie:', err.response?.data || err.message);
    throw err;
  }
};

export const addTheater = async (theaterData) => {
  const token = localStorage.getItem("token");
  console.log('Token:', token); // Log the token
  console.log(theaterData)

  try {
    const res = await axios.post('http://localhost:5000/theatre/add', theaterData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (res.status !== 201) {
      throw new Error(`Failed to add theatre, status: ${res.status}`);
    }

    return res.data;
  } catch (err) {
    console.error('Error adding theatre:', err.response?.data || err.message);
    throw err;
  }
};


export const getAllTheatres = async (filters = {}) => {
  try {
    // Convert filters to query parameters
    const params = new URLSearchParams(filters).toString();
    
    // Send GET request to the backend
    const res = await axios.get(`http://localhost:5000/theatre?${params}`);

    // Check response status
    if (res.status !== 200) {
      console.log("No Data");
      return [];
    }

    // Extract and return data from the response
    const data = await res.data;
    return data;
  } catch (err) {
    // Handle and log errors
    console.error("Error fetching theatres:", err.message);
    return []; // Return an empty array on error
  }
};



export const addShowtimesToTheater = async (theaterName, movieIds) => {
  try {
    const response = await fetch('/api/theaters/add-showtimes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ theaterName, movieIds }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add showtimes: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error adding showtimes to theater:', error.message);
    throw error;
  }
};