// TODO: Implement useCreateTicket hook

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTickets } from "../components/api";

export default function useCreateTicket() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createTickets,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
  return mutate;
}
