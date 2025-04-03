// useDeleteComment.tsx의 mutate 함수를 호출하면 API를 호출해야한다.

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import useDeleteComment from "./useDeleteComment";
import { deleteComment } from "../api";

describe("useDeleteComment", () => {
  vi.mock("../api", () => ({
    deleteComment: vi.fn(),
  }));

  it("calls API", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useDeleteComment(), { wrapper });

    await waitFor(() => {
      result.current({
        ticketId: "1",
        commentId: "1",
      });
    });

    expect(deleteComment).toHaveBeenCalledWith({
      ticketId: "1",
      commentId: "1",
    });
  });
});
