import axios from "axios";

export const API_URL = "https://ticketbookingbackend-cmz1.onrender.com/api/tickets";

export const getTickets = () => axios.get(API_URL);

export const bookTicket = (id, seats) =>
  axios.post(`${API_URL}/${id}/book`, { seats });
