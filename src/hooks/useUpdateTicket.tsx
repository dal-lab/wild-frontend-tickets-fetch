import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TicketListDto, updateTicket } from "../api";
import { TICKETS_QUERY_KEY } from "../constants";

export default function useUpdateTicket() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTicket,
    onMutate: async ({ ticketId, title, description }) => {
      await queryClient.cancelQueries({ queryKey: [TICKETS_QUERY_KEY] });
      const previousTickets = queryClient.getQueryData([TICKETS_QUERY_KEY]);
      queryClient.setQueryData([TICKETS_QUERY_KEY], (old: TicketListDto) => ({
        ...old,
        tickets: old?.tickets?.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, title, description } : ticket
        ),
      }));
      return { previousTickets };
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
