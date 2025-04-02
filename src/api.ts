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
  console.log("🌏 createTicket", data);
  return data;
}

export async function updateTicketStatus({
  ticketId,
  status,
}: {
  ticketId: string;
  status: "open" | "closed";
}) {
  console.log("🌏 updateTicketStatus", { ticketId, status });
  const { data } = await instance.patch(`/tickets/${ticketId}`, { status });
  return data;
}

export async function createComment({
  ticketId,
  content,
}: {
  ticketId: string;
  content: string;
}) {
  const { data } = await instance.post(`/tickets/${ticketId}/comments`, {
    content,
  });
  return data;
}
