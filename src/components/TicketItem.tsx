import { memo } from "react";

import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

import useToggleTicketStatus from "../hooks/useToggleTicketStatus";

import { Ticket } from "../types";
import useDeleteTicket from "../hooks/useDeleteTicket";
import DeleteButton from "./common/DeleteButton";
import StatusButton from "./common/StatusButton";

function TicketItem({ ticket }: { ticket: Ticket }) {
  const toggleTicketStatus = useToggleTicketStatus();
  const deleteTicket = useDeleteTicket();

  const handleClick = () => {
    toggleTicketStatus({
      ticketId: ticket.id,
      status: ticket.status === "open" ? "closed" : "open",
    });
  };

  const handleDelete = () => {
    deleteTicket({ ticketId: ticket.id });
  };

  return (
    <li>
      <div className="title">{ticket.title}</div>
      <div className="description">{ticket.description}</div>
      <StatusButton status={ticket.status} onClick={handleClick} />
      <DeleteButton label="Delete Ticket" onClick={handleDelete} />
      <CommentList comments={ticket.comments} />
      <CommentForm ticketId={ticket.id} />
    </li>
  );
}

export default memo(TicketItem);
