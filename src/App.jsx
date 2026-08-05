import { useState } from "react";
import "./App.css";

const movies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    genre: "Action / Sci-Fi",
    duration: "3h 1m",
    rating: "8.4",
    price: 200,
    emoji: "🦸",
  },
  {
    id: 2,
    title: "Interstellar",
    genre: "Sci-Fi / Adventure",
    duration: "2h 49m",
    rating: "8.7",
    price: 180,
    emoji: "🚀",
  },
  {
    id: 3,
    title: "The Lion King",
    genre: "Animation / Adventure",
    duration: "1h 58m",
    rating: "8.5",
    price: 150,
    emoji: "🦁",
  },
];

const showTimes = ["10:00 AM", "1:30 PM", "5:00 PM", "9:00 PM"];

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingComplete, setBookingComplete] = useState(false);

  const seats = Array.from({ length: 40 }, (_, index) => index + 1);

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((item) => item !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const selectMovie = (movie) => {
    setSelectedMovie(movie);
    setSelectedTime("");
    setSelectedSeats([]);
    setBookingComplete(false);
  };

  const confirmBooking = () => {
    if (!selectedMovie) {
      alert("Please select a movie.");
      return;
    }

    if (!selectedTime) {
      alert("Please select a show time.");
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    setBookingComplete(true);
  };

  const resetBooking = () => {
    setSelectedMovie(null);
    setSelectedTime("");
    setSelectedSeats([]);
    setBookingComplete(false);
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">🎬 CineBook</div>
        <div className="nav-text">Movie Ticket Booking</div>
      </header>

      <section className="hero">
        <h1>Book Your Movie Tickets</h1>
        <p>Select your favourite movie, show time and seats.</p>
      </section>

      {!bookingComplete ? (
        <main className="container">
          <h2>Now Showing</h2>

          <div className="movie-grid">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className={`movie-card ${
                  selectedMovie?.id === movie.id ? "selected-movie" : ""
                }`}
              >
                <div className="movie-poster">{movie.emoji}</div>

                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.genre}</p>

                  <div className="movie-details">
                    <span>⭐ {movie.rating}</span>
                    <span>⏱ {movie.duration}</span>
                  </div>

                  <p className="price">₹{movie.price} / ticket</p>

                  <button onClick={() => selectMovie(movie)}>
                    {selectedMovie?.id === movie.id
                      ? "Selected"
                      : "Book Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedMovie && (
            <section className="booking-section">
              <h2>{selectedMovie.title}</h2>

              <div className="showtime-section">
                <h3>Select Show Time</h3>

                <div className="showtimes">
                  {showTimes.map((time) => (
                    <button
                      key={time}
                      className={
                        selectedTime === time ? "time-selected" : ""
                      }
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="seat-section">
                <h3>Select Seats</h3>

                <div className="screen">SCREEN</div>

                <div className="seats">
                  {seats.map((seat) => (
                    <button
                      key={seat}
                      className={`seat ${
                        selectedSeats.includes(seat)
                          ? "seat-selected"
                          : ""
                      }`}
                      onClick={() => toggleSeat(seat)}
                    >
                      {seat}
                    </button>
                  ))}
                </div>

                <div className="seat-legend">
                  <span>⬜ Available</span>
                  <span>🟩 Selected</span>
                </div>
              </div>

              <div className="summary">
                <h3>Booking Summary</h3>

                <p>
                  <strong>Movie:</strong> {selectedMovie.title}
                </p>

                <p>
                  <strong>Show:</strong>{" "}
                  {selectedTime || "Not selected"}
                </p>

                <p>
                  <strong>Seats:</strong>{" "}
                  {selectedSeats.length > 0
                    ? selectedSeats.join(", ")
                    : "Not selected"}
                </p>

                <p>
                  <strong>Tickets:</strong> {selectedSeats.length}
                </p>

                <h2>
                  Total: ₹
                  {selectedSeats.length * selectedMovie.price}
                </h2>

                <button
                  className="confirm-btn"
                  onClick={confirmBooking}
                >
                  Confirm Booking
                </button>
              </div>
            </section>
          )}
        </main>
      ) : (
        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">✓</div>

            <h1>Booking Confirmed!</h1>

            <p>Your movie tickets have been booked successfully.</p>

            <div className="ticket">
              <h2>🎟 Movie Ticket</h2>

              <p>
                <strong>Movie:</strong> {selectedMovie.title}
              </p>

              <p>
                <strong>Show Time:</strong> {selectedTime}
              </p>

              <p>
                <strong>Seats:</strong>{" "}
                {selectedSeats.join(", ")}
              </p>

              <p>
                <strong>Total Amount:</strong> ₹
                {selectedSeats.length * selectedMovie.price}
              </p>
            </div>

            <button onClick={resetBooking}>
              Book Another Movie
            </button>
          </div>
        </div>
      )}

      <footer>
        <p>© 2026 CineBook | Movie Ticket Booking System</p>
      </footer>
    </div>
  );
}

export default App;