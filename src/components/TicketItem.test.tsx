import { beforeEach, describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import TicketItem from "./TicketItem";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import nock from "nock";
import { API_BASE_URL } from "../api";
import { Ticket } from "../types";

const context = describe;

describe("TicketItem", () => {
  let requestTicketId = "";
  const ticket: Ticket = {
    id: "1",
    title: "TITLE",
    description: "DESCRIPTION",
    status: "open",
    comments: [{ id: "1", ticketId: "1", content: "COMMENT" }],
  };

  beforeEach(() => {
    requestTicketId = "";

    nock(API_BASE_URL)
      .patch(`/tickets/${ticket.id}`)
      .reply(200, (uri, body: any) => {
        const parts = uri.split("/");
        requestTicketId = parts[parts.length - 1];
        return {
          ...ticket,
          status: body.status,
        };
      });

    nock(API_BASE_URL)
      .post(`/tickets/${ticket.id}/comments`)
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

    vi.resetAllMocks();
  });

  function renderTicketItem() {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <TicketItem ticket={ticket} />
      </QueryClientProvider>
    );
  }

  it("renders title and description", () => {
    renderTicketItem();

    screen.getByText("TITLE");
    screen.getByText("DESCRIPTION");
  });

  it("renders status", () => {
    renderTicketItem();

    screen.getByText(/Open/);
  });

  it("renders comments", () => {
    renderTicketItem();

    screen.getByText("COMMENT");
  });

  context("when user clicks toggle button", () => {
    it("calls API", async () => {
      renderTicketItem();

      fireEvent.click(screen.getByRole("button", { name: /Open/ }));

      await waitFor(() => {
        expect(requestTicketId).toBe(ticket.id);
      });
    });
  });

  context("when user submits comment", () => {
    it("calls API", async () => {
      renderTicketItem();
      fireEvent.change(screen.getByRole("textbox", { name: /Comment/ }), {
        target: { value: "New Comment" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Add Comment/ }));
      await waitFor(() => {
        expect(requestTicketId).toBe(ticket.id);
      });
    });
  });
});
