export interface Comment {
  id: string;
  ticket_id: string;
  content: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed";
  comments: Comment[];
}
