import { useState } from "react";
import axios from "axios";
import { API_URL } from "../api/ticketApi";

const CreateTicket = ({ onTicketCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    totalseats: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.totalseats) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}create`, {
        title: formData.title,
        description: formData.description,
        totalseats: Number(formData.totalseats),
      });

      alert("Ticket created successfully ✅");

      setFormData({
        title: "",
        description: "",
        totalseats: "",
      });

      onTicketCreated(); // refresh ticket list
    } catch (error) {
      alert(error.response?.data?.error || "Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2>Create Ticket (Event)</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          style={styles.input}
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
        />

        <input
          type="number"
          name="totalseats"
          placeholder="Total Seats"
          value={formData.totalseats}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Creating..." : "Create Ticket"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: 20,
    borderRadius: 6,
    maxWidth: 400,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
  },
  textarea: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
    height: 80,
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default CreateTicket;
