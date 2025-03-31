import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchTickets } from "../components/api";
import { TICKETS_QUERY_KEY } from "../constants";

export default function useTickets() {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: [TICKETS_QUERY_KEY],
    queryFn: fetchTickets,
    staleTime: 10_000,
  });

  if (error && !isFetching) {
    throw error;
  }

  console.log("⚒️ useTickets:", data?.tickets);

  const tickets = data?.tickets || [];

  return { tickets };
}
