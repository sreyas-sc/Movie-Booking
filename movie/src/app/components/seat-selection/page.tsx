'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast'; // or any other toast library you're using

const SeatSelection: React.FC = () => {
  const [seatLayout, setSeatLayout] = useState<string[][]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTheater, setSelectedTheater] = useState<string | null>(null);
  const [movieName, setMovieName] = useState<string | null>(null);
  const [movieId, setMovieId] = useState<string | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<{ [key: string]: string | null }>({});
  const router = useRouter();

  useEffect(() => {
    const movieNameFromStorage = localStorage.getItem('selectedMovie');
    const movieId = localStorage.getItem('selectedMovieId');
    const savedDate = localStorage.getItem('selectedDate');
    const savedTheater = localStorage.getItem('selectedTheater');
    const savedTimes = localStorage.getItem('selectedTimes');
    const savedSeatLayout = localStorage.getItem('seatLayout');

    if (movieNameFromStorage) setMovieName(movieNameFromStorage);
    if (movieId) setMovieId(movieId);
    if (savedDate) setSelectedDate(savedDate);
    if (savedTheater) setSelectedTheater(savedTheater);
    if (savedTimes) setSelectedTimes(JSON.parse(savedTimes));
    if (savedSeatLayout) {
      const seatNumbers = JSON.parse(savedSeatLayout);
      const rows = 6; // Adjust this number based on your layout
      setSeatLayout(generateSeatLayout(seatNumbers, rows));
    }
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded successfully.');
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay script.');
    };
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  

  const handleSeatClick = (seatLabel: string) => {
    setSelectedSeats(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(seatLabel)) {
        newSelection.delete(seatLabel);
      } else if (newSelection.size < 10) {
        newSelection.add(seatLabel);
      }
      return newSelection;
    });
  };


// const handleBookSeats = () => {
//     fetch('http://localhost:5000/booking/book', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ 
//         movieName, 
//         movieId,   
//         theaterName: selectedTheater?.split('-')[1] || '', 
//         theaterId: selectedTheater?.split('-')[0] || '',  
//         date: selectedDate, 
//         time: Object.values(selectedTimes).join(', '), 
//         seatNumbers: Array.from(selectedSeats),
//         totalAmount: totalCost, 
//         userId: localStorage.getItem('userId'), 
//         // paymentId: response.razorpay_payment_id 
//         amount: totalCost * 100, currency: 'INR' }) // Amount in paise
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (!window.Razorpay) {
//           console.error('Razorpay library not loaded.');
//           toast.error('Payment library not loaded.');
//           return;
//         }
  
//         const options = {
//           key: data.key,
//           amount: data.amount,
//           currency: data.currency,
//           name: 'Movie Booking',
//           description: 'Seat Booking',
//           order_id: data.orderId,
//           handler: function (response: any) {
//             console.log('Payment successful:', response);
//             fetch('/api/save-booking', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({
//                 movieName,
//                 movieId,
//                 theaterName: selectedTheater?.split('-')[1] || '',
//                 theaterId: selectedTheater?.split('-')[0] || '',
//                 date: selectedDate,
//                 time: Object.values(selectedTimes).join(', '),
//                 seatNumbers: Array.from(selectedSeats),
//                 amount: totalCost
//               })
//             })
//               .then(response => response.json())
//               .then(() => {
//                 router.push('/confirmation'); // Redirect to confirmation page
//               })
//               .catch(error => {
//                 console.error('Failed to save booking:', error);
//                 toast.error('Failed to save booking.');
//               });
//           },
//           prefill: {
//             name: '',
//             email: '',
//             contact: ''
//           },
//           theme: {
//             color: '#F37254'
//           }
//         };
  
//         // Initialize Razorpay checkout
//         const payment = new (window as any).Razorpay(options);
//         payment.open();
//       })
//       .catch(error => {
//         console.error('Failed to create Razorpay order:', error);
//         toast.error('Failed to create order.');
//       });
//   };
  
const handleBookSeats = () => {
    // Check if Razorpay is loaded
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'; // Razorpay script URL
      script.onload = () => proceedBooking(); // Proceed to booking once Razorpay is loaded
      script.onerror = () => {
        console.error('Failed to load Razorpay.');
        toast.error('Failed to load payment gateway.');
      };
      document.body.appendChild(script);
    } else {
      proceedBooking(); // Proceed if Razorpay is already loaded
    }
  };
  
  const proceedBooking = () => {
    // First create a booking order
    fetch('http://localhost:5000/booking/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        movieName, 
        movieId,   
        theaterName: selectedTheater?.split('-')[1] || '', 
        theaterId: selectedTheater?.split('-')[0] || '',  
        date: selectedDate, 
        time: Object.values(selectedTimes).join(', '), 
        seatNumbers: Array.from(selectedSeats),
        totalAmount: totalCost, 
        userId: localStorage.getItem('userId'), 
        amount: totalCost * 100,  // Amount in paise
        currency: 'INR'
      })
    })
    .then(response => response.json())
    .then(data => {
      if (!data || !data.orderId) {
        console.error('Order creation failed:', data);
        toast.error('Failed to create booking order.');
        return;
      }
  
      // Define Razorpay options
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'Movie Booking',
        description: 'Seat Booking',
        order_id: data.orderId,
        handler: function (response: any) {
          // Payment was successful, now save the booking
          fetch('/api/save-booking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              movieName,
              movieId,
              theaterName: selectedTheater?.split('-')[1] || '',
              theaterId: selectedTheater?.split('-')[0] || '',
              date: selectedDate,
              time: Object.values(selectedTimes).join(', '),
              seatNumbers: Array.from(selectedSeats),
              amount: totalCost,
              paymentId: response.razorpay_payment_id // Capture payment ID
            })
          })
          .then(response => response.json())
          .then(() => {
            router.push('/confirmation'); // Redirect to confirmation page
          })
          .catch(error => {
            console.error('Failed to save booking:', error);
            toast.error('Failed to save booking.');
          });
        },
        prefill: {
          name: '',  // Add user's prefill data
          email: '', 
          contact: ''
        },
        theme: {
          color: '#F37254'
        }
      };
  
      // Initialize Razorpay checkout
      const payment = new (window as any).Razorpay(options);
      payment.open();
    })
    .catch(error => {
      console.error('Failed to create Razorpay order:', error);
      toast.error('Failed to create order.');
    });
  };
  
  

  const generateSeatLayout = (seatNumbers: number[], rows: number): string[][] => {
    const seatLabels: string[] = [];
    let index = 0;
    
    for (let i = 0; i < seatNumbers.length; i++) {
      if (seatNumbers[i] === 1) {
        const rowLabel = String.fromCharCode(65 + Math.floor(index / rows));
        const seatNumber = (index % rows) + 1;
        seatLabels.push(`${rowLabel}${seatNumber}`);
        index++;
      }
    }
    
    const result: string[][] = [];
    for (let i = 0; i < rows; i++) {
      const rowLength = Math.min(seatLabels.length - i * rows, rows);
      result.push(seatLabels.slice(i * rows, i * rows + rowLength));
    }
    
    return result;
  };

  const seatCost = 120;
  const totalCost = selectedSeats.size * seatCost;

  const formatDate = (date: string | null) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTheaterDetails = (theater: string | null) => {
    if (!theater) return { name: '', place: '' };
    const parts = theater.split('-');
    const name = parts[1] || '';
    const place = parts[2] || '';
    return { name, place };
  };

  const { name: theaterName, place: theaterPlace } = getTheaterDetails(selectedTheater);

  return (
    <div>
      <Typography variant="h4" textAlign={'center'} padding={3}>
        Select Seats
      </Typography>

      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Typography variant="h6">
          Movie: {movieName}
        </Typography>
        <Typography variant="h6">
          Date: {formatDate(selectedDate)}
        </Typography>
        <Typography variant="h6">
          Theater: {theaterName} {theaterPlace && `(${theaterPlace})`}
        </Typography>
        <Typography variant="h6">
          Time: {Object.values(selectedTimes).join(', ')}
        </Typography>

        <Box
          width="70%"
          height="50px"
          mt={10}
          mb={10}
          sx={{
            alignContent: "center",
            textAlign: "center",
            background: "grey",
            borderRadius: "0 0 50px 50px",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <Typography sx={{ color: "white", fontWeight: 700 }}>All eyes this way</Typography>
        </Box>

        <Box marginTop={3} width="100%" maxWidth="1200px" mx="auto">
          {seatLayout.map((row, rowIndex) => (
            <Grid container spacing={1} key={rowIndex} justifyContent="center" marginBottom={1}>
              {row.map(seat => (
                <Grid item key={seat}>
                  <Button
                    variant={selectedSeats.has(seat) ? 'contained' : 'outlined'}
                    onClick={() => handleSeatClick(seat)}
                    sx={{
                      minWidth: '40px',
                      minHeight: '40px',
                      backgroundColor: selectedSeats.has(seat) ? 'rgba(248, 68, 100)' : 'transparent',
                      color: selectedSeats.has(seat) ? 'white' : 'rgba(248, 68, 100)',
                      borderColor: 'rgba(248, 68, 100)',
                      '&:hover': {
                        backgroundColor: selectedSeats.has(seat) ? 'darkred' : 'rgba(248, 68, 100, 0.1)',
                      },
                      margin: '2px',
                    }}
                  >
                    {seat}
                  </Button>
                </Grid>
              ))}
            </Grid>
          ))}
        </Box>

        <Box marginTop={2} textAlign={'center'}>
          <Typography variant="h6">
            Selected Seats: {Array.from(selectedSeats).join(', ')}
          </Typography>
          <Typography variant="h6" marginTop={1}>
            Total Cost: ₹{totalCost}
          </Typography>
        </Box>

        <Box display={'flex'} justifyContent={'center'} padding={2}>
          <Button
            variant="contained"
            onClick={handleBookSeats}
            sx={{ backgroundColor: 'rgba(248, 68, 100)' }}
          >
            Book Selected Seats
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default SeatSelection;
