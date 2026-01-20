import axios from "axios";

export const API_URL = "http://localhost:3000/api/tickets";

export const getTickets = () => axios.get(API_URL);

export const bookTicket = (id, seats) =>
  axios.post(`${API_URL}/${id}/book`, { seats });
