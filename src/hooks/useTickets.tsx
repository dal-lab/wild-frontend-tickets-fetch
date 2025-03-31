import { useQuery } from "@tanstack/react-query";
import { fetchTickets } from "../components/api";

export default function useTickets() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
    staleTime: 10_000,
  });

  console.log("⚒️ useTickets:", data?.tickets);

  const tickets = data?.tickets || [];

  return { tickets };
}
