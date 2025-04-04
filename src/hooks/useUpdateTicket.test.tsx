// useUpdateTicket.test.ts 를 테스트 한다.
// 1. useUpdateTicket 훅을 테스트한다.
// 2. useUpdateTicket의 return 값인 mutate 함수를 테스트한다.
// - 해당 mutate 함수가 호출될 때 파라미터 값으로 ticketId와 status가 전달된다.

import { describe, expect, it, vi } from "vitest";
import useUpdateTicket from "./useUpdateTicket";
import { updateTicket } from "../api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

describe("useUpdateTicket", () => {
  vi.mock("../api", () => ({
    updateTicket: vi.fn(),
  }));

  it("calls API", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useUpdateTicket(), { wrapper });

    await waitFor(() => {
      result.current({
        ticketId: "1",
        title: "TITLE",
        description: "DESCRIPTION",
      });
    });

    expect(updateTicket).toHaveBeenCalledWith({
      ticketId: "1",
      title: "TITLE",
      description: "DESCRIPTION",
    });
  });
});
