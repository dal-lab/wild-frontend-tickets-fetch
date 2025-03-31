import axios from "axios";
import { Ticket } from "../types";

const instance = axios.create({
  // Vercel에 배포된 백엔드 URL로 변경해주세요
  baseURL: "https://tickets-api.codedemo.co",
  timeout: 1_000,
});

export async function fetchTickets(): Promise<{
  tickets: Ticket[];
}> {
  const { data } = await instance.get("/tickets");
  console.log("🌏 fetchTicket", data);
  return data;
}
export async function createTickets({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { data } = await instance.post("/tickets", { title, description });
  console.log("🌏 createTicket", data);
}
