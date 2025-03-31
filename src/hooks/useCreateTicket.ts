// TODO: Implement useCreateTicket hook

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTickets } from "../components/api";
import { TICKETS_QUERY_KEY } from "../constants";

export default function useCreateTicket() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createTickets,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TICKETS_QUERY_KEY] });
    },
  });
  return mutate;
}
