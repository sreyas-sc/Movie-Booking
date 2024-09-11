import axios from 'axios'
export const getAllMovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/movie");
  
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
  
  