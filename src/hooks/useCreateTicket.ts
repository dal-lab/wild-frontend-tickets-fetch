import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTickets, TicketListDto } from "../api";
import { TICKETS_QUERY_KEY } from "../constants";

export default function useCreateTicket() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createTickets,
    onMutate: async ({ title, description }) => {
      await queryClient.cancelQueries({ queryKey: [TICKETS_QUERY_KEY] });
      const previousTickets = queryClient.getQueryData([TICKETS_QUERY_KEY]);
      queryClient.setQueryData([TICKETS_QUERY_KEY], (old: TicketListDto) => ({
        ...old,
        tickets: [
          ...(old?.tickets || []),
          {
            id: `temp-${Date.now()}`,
            title,
            description,
            status: "open",
            comments: [],
          },
        ],
      }));
      return { previousTickets } as const;
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData([TICKETS_QUERY_KEY], context?.previousTickets);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TICKETS_QUERY_KEY] });
    },
  });
  return mutate;
}
