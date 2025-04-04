import axios from "axios";
import { Ticket } from "./types";

export const API_BASE_URL = "https://tickets-api.codedemo.co";

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1_000,
});

export interface TicketListDto {
  tickets: Ticket[];
}

export async function fetchTickets(): Promise<TicketListDto> {
  const { data } = await instance.get("/tickets");
  return data;
}

export async function createTickets({
  title,
  description,
}: {
  title: string;
  description: string;
}): Promise<Ticket> {
  const { data } = await instance.post("/tickets", { title, description });
  return data;
}

export async function updateTicketStatus({
  ticketId,
  status,
}: {
  ticketId: string;
  status: "open" | "closed";
}) {
  try {
    const { data } = await instance.patch(`/tickets/${ticketId}`, { status });
    return data;
  } catch (error) {
    console.error("Error updating ticket status:", error);
    throw error;
  }
}

export async function createComment({
  ticketId,
  content,
}: {
  ticketId: string;
  content: string;
}) {
  try {
    const { data } = await instance.post(`/tickets/${ticketId}/comments`, {
      content,
    });
    return data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

export async function deleteTicket({ ticketId }: { ticketId: string }) {
  try {
    const { data } = await instance.delete(`/tickets/${ticketId}`);
    return data;
  } catch (error) {
    console.error("Error deleting ticket:", error);
    throw error;
  }
}

export async function updateTicket({
  ticketId,
  title,
  description,
}: {
  ticketId: string;
  title: string;
  description: string;
}) {
  try {
    const { data } = await instance.patch(`/tickets/${ticketId}`, {
      title,
      description,
    });
    return data;
  } catch (error) {
    console.error("Error updating ticket:", error);
    throw error;
  }
}

export async function deleteComment({
  ticketId,
  commentId,
}: {
  ticketId: string;
  commentId: string;
}) {
  try {
    const { data } = await instance.delete(
      `/tickets/${ticketId}/comments/${commentId}`
    );
    return data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}
