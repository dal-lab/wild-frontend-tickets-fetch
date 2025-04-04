import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import nock from "nock";
import { beforeEach, describe, expect, it } from "vitest";
import { API_BASE_URL } from "../api";
import { Ticket } from "../types";
import CommentForm from "./CommentForm";

describe("CommentForm", () => {
  const ticketId = "ticket-1";
  let requestTicketId = "";
  const ticket: Ticket = {
    id: "1",
    title: "TITLE",
    description: "DESCRIPTION",
    status: "open",
    comments: [{ id: "1", ticket_id: "1", content: "COMMENT" }],
  };

  beforeEach(() => {
    requestTicketId = "";

    nock(API_BASE_URL)
      .post(`/tickets/${ticketId}/comments`)
      .reply(200, (uri, body: any) => {
        const parts = uri.split("/");
        requestTicketId = parts[parts.length - 2];
        return {
          ...ticket,
          comments: [
            ...ticket.comments,
            { id: `temp-comment-${Date.now()}`, content: body.content },
          ],
        };
      });
  });

  function renderCommentForm() {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CommentForm ticketId={ticketId} />
      </QueryClientProvider>
    );
  }

  describe("renders", () => {
    it("renders TextField and SubmitButton", () => {
      renderCommentForm();
      screen.getByRole("textbox", { name: /Comment/ });
      screen.getByRole("button", { name: /Add Comment/ });
    });
  });

  describe("when user fills and submits a new comment", () => {
    it("calls API", async () => {
      renderCommentForm();
      fireEvent.change(screen.getByRole("textbox", { name: /Comment/ }), {
        target: { value: "New Comment" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Add Comment/ }));
      await waitFor(() => {
        expect(requestTicketId).toBe(ticketId);
      });
    });
  });
});
