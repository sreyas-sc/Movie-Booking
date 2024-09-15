'use client';
import { deleteBooking, getUserBooking, getUserDetails } from '@/app/api-helpers/api-helpers.js';
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface User {
  name: string;
  email: string;
}

interface Movie {
  title: string;
  releaseDate: string;
}

interface Booking {
  _id: string;
  movie: Movie;
  user: User;
}

const UserProfile = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    getUserBooking()
    .then((res) => {
      console.log("API Response:", res); // Check if data is returned
      if (res && res.bookings) {
        setBookings(res.bookings);
      }
    })
    .catch((err) => console.log("API Error:", err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  console.log(bookings);

  const handleDelete = (id: string) => {
    deleteBooking(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Box width={"100%"} display={'flex'}>
      {/* First section (user card) */}
      <Fragment>
        <Box
          display={'flex'}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"30%"}
        >
          <AccountCircleIcon sx={{ fontSize: "10rem" }} />
          <Typography
            padding={1}
            width={"auto"}
            textAlign={"center"}
            border={'1px solid #ccc'}
            borderRadius={6}
          >
            Name: {user.name}
          </Typography>
          <Typography
            padding={1}
            width={"auto"}
            textAlign={"center"}
            border={'1px solid #ccc'}
            borderRadius={6}
          >
            Email: {user.email}
          </Typography>
        </Box>

        <Box
          width={"70%"}
          display={'flex'}
          flexDirection={'column'}
        >
          <Typography
            variant='h3'
            fontFamily={"verdana"}
            textAlign={"center"}
            padding={2}
          >
            Bookings
          </Typography>
          <Box
            margin={"auto"}
            display={'flex'}
            flexDirection={'column'}
            width={"80%"}
          >
            <List>
              {bookings.map((booking, index) => (
                <ListItem
                  key={booking._id}
                  sx={{
                    bgcolor: "#00d386",
                    color: "white",
                    textAlign: "center",
                    margin: 1,
                  }}
                >
                  <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}>
                    Movie: {booking.movie.title}
                  </ListItemText>

                  <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}>
                    Release Date: {booking.movie.releaseDate}
                  </ListItemText>

                  <IconButton onClick={() => handleDelete(booking._id)} color="error">
                    <DeleteForeverIcon sx={{ color: 'red' }} />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Fragment>
    </Box>
  );
};

export default UserProfile;
