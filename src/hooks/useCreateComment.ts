// TODO: Implement useCreateComment hook

import { useQueryClient } from "@tanstack/react-query";
import { createComment, TicketListDto } from "../api";
import { useMutation } from "@tanstack/react-query";
import { TICKETS_QUERY_KEY } from "../constants";

export default function useCreateComment() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createComment,
    onMutate: async ({ ticketId, content }) => {
      await queryClient.cancelQueries({ queryKey: [TICKETS_QUERY_KEY] });
      const previousTickets = queryClient.getQueryData([TICKETS_QUERY_KEY]);
      queryClient.setQueryData([TICKETS_QUERY_KEY], (old: TicketListDto) => ({
        ...old,
        tickets: (old?.tickets || []).map((ticket) =>
          ticket.id === ticketId
            ? {
                ...ticket,
                comments: [
                  ...(ticket.comments || []),
                  { id: `temp-comment-${Date.now()}`, content },
                ],
              }
            : ticket
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
