import { useEffect, useState } from "react";
import axios from "axios";
import TicketCard from "./TicketCard";
import CreateTicket from "./CreateTicket";
import { API_URL } from "../api/ticketApi";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    const res = await axios.get(API_URL);
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div>
      <CreateTicket onTicketCreated={fetchTickets} />

      <h2>Available Events</h2>
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket._id}
          ticket={ticket}
          refreshTickets={fetchTickets}
        />
      ))}
    </div>
  );
};

export default TicketList;
