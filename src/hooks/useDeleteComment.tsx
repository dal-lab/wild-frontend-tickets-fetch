import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TICKETS_QUERY_KEY } from "../constants";
import { deleteComment, TicketListDto } from "../api";

export default function useDeleteComment() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteComment,
    onMutate: async ({ ticketId, commentId }) => {
      await queryClient.cancelQueries({ queryKey: [TICKETS_QUERY_KEY] });
      const previousTickets = queryClient.getQueryData([TICKETS_QUERY_KEY]);
      queryClient.setQueryData([TICKETS_QUERY_KEY], (old: TicketListDto) => ({
        ...old,
        tickets: old?.tickets?.map((ticket) =>
          ticket.id === ticketId
            ? {
                ...ticket,
                comments: ticket.comments.filter(
                  (comment) => comment.id !== commentId
                ),
              }
            : ticket
        ),
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
