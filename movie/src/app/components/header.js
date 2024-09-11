"use client"; // <-- Add this at the top

import React, { useEffect, useState } from "react";
import { AppBar, Autocomplete, Tab, Tabs, TextField, Toolbar } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import { getAllMovies } from '../api-helpers/api-helpers.js';
import Link from 'next/link';

const Header = () => {
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        {/* Home page link with Movie Icon */}
        <Box width={"20%"}>
          <Link href="/" legacyBehavior passHref>
            <a>
              <MovieIcon />
            </a>
          </Link>
        </Box>

        {/* Autocomplete textbox to search for the movie names */}
        <Box width={"50%"} margin={"auto"}>
          <Autocomplete
            freeSolo
            options={movies && movies.length > 0 ? movies.map((option) => option.title) : []}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search across movies"
              />
            )}
          />
        </Box>

        {/* Box for the Tabs */}
        <Box display={"flex"}>
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Link href="/components/admin" legacyBehavior passHref>
              <Tab label="Admin" component="a" />
            </Link>
            <Link href="/components/auth" legacyBehavior passHref>
              <Tab label="Auth" component="a" />
            </Link>
            <Link href="/components/movies" legacyBehavior passHref>
              <Tab label="Movies" component="a" />
            </Link>
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
