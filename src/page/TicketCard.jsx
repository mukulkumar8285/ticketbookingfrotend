import { useState } from "react";
import { bookTicket } from "../api/ticketApi";

const TicketCard = ({ ticket, refreshTickets }) => {
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (seats <= 0) return alert("Invalid seat count");
    if (seats > ticket.availableseats)
      return alert("Not enough seats available");

    try {
      setLoading(true);
      await bookTicket(ticket._id, seats);
      refreshTickets();
      alert("Ticket booked successfully ✅");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>

      <p><b>Total Seats:</b> {ticket.totalseats}</p>
      <p><b>Available:</b> {ticket.availableseats}</p>
      <p><b>Reserved:</b> {ticket.reservedseats}</p>

      <input
        type="number"
        min="1"
        value={seats}
        onChange={(e) => setSeats(Number(e.target.value))}
        style={styles.input}
      />

      <button
        onClick={handleBooking}
        disabled={loading || ticket.availableseats === 0}
        style={styles.button}
      >
        {loading ? "Booking..." : "Book Ticket"}
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: 16,
    borderRadius: 6,
    marginBottom: 16,
    maxWidth: 400,
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 8,
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default TicketCard;
