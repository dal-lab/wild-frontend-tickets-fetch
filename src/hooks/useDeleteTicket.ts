import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TICKETS_QUERY_KEY } from "../constants";
import { deleteTicket, TicketListDto } from "../api";

export default function useDeleteTicket() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTicket,
    onMutate: async ({ ticketId }) => {
      await queryClient.cancelQueries({ queryKey: [TICKETS_QUERY_KEY] });
      const previousTickets = queryClient.getQueryData([TICKETS_QUERY_KEY]);
      queryClient.setQueryData([TICKETS_QUERY_KEY], (old: TicketListDto) => ({
        ...old,
        tickets: old?.tickets?.filter((ticket) => ticket.id !== ticketId),
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
