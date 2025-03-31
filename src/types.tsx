export interface Comment {
  id: number;
  content: string;
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: "open" | "closed";
  comments: Comment[];
}
