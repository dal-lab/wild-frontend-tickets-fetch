import { memo } from "react";

import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

import useToggleTicketStatus from "../hooks/useToggleTicketStatus";

import { Ticket } from "../types";
import useDeleteTicket from "../hooks/useDeleteTicket";
import useUpdateTicket from "../hooks/useUpdateTicket";
import DeleteButton from "./common/DeleteButton";
import EditButton from "./common/EditButton";

function TicketItem({ ticket }: { ticket: Ticket }) {
  const toggleTicketStatus = useToggleTicketStatus();
  const deleteTicket = useDeleteTicket();
  const updateTicket = useUpdateTicket();

  const handleClick = () => {
    toggleTicketStatus({
      ticketId: ticket.id,
      status: ticket.status === "open" ? "closed" : "open",
    });
  };

  const handleDelete = () => {
    deleteTicket({ ticketId: ticket.id });
  };

  const handleEdit = () => {
    updateTicket({
      ticketId: ticket.id,
      title: ticket.title,
      description: ticket.description,
    });
  };

  return (
    <li>
      <div className="title">{ticket.title}</div>
      <div className="description">{ticket.description}</div>
      <button className="status" onClick={handleClick}>
        {ticket.status === "open" ? "Open" : "Closed"}
      </button>
      <DeleteButton label="Delete Ticket" onClick={handleDelete} />
      <EditButton label="Edit Ticket" onClick={handleEdit} />
      <CommentList comments={ticket.comments} />
      <CommentForm ticketId={ticket.id} />
    </li>
  );
}

export default memo(TicketItem);
