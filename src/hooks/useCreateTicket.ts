import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTickets, TicketListDto } from "../components/api";
import { TICKETS_QUERY_KEY } from "../constants";

export default function useCreateTicket() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createTickets,
    onMutate: async ({ title, description }) => {
      await queryClient.cancelQueries({ queryKey: [TICKETS_QUERY_KEY] });
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
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });
  return mutate;
}
