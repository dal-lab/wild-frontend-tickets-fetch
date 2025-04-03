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
  let requestTicket = {} as Ticket;
  const ticket: Ticket = {
    id: "1",
    title: "TITLE",
    description: "DESCRIPTION",
    status: "open",
    comments: [{ id: "1", ticket_id: "1", content: "COMMENT" }],
  };

  beforeEach(() => {
    requestTicketId = "";
    requestTicket = {} as Ticket;

    nock(API_BASE_URL)
      .patch(`/tickets/${ticket.id}`)
      .reply(200, (uri, body: any) => {
        const parts = uri.split("/");
        requestTicketId = parts[parts.length - 1];
        requestTicket = {
          ...ticket,
          status: body.status,
        };
        return requestTicket;
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

    nock(API_BASE_URL)
      .delete(`/tickets/${ticket.id}`)
      .reply(200, (uri) => {
        const parts = uri.split("/");
        requestTicketId = parts[parts.length - 1];
        return ticket;
      });

    nock(API_BASE_URL)
      .patch(`/tickets/${ticket.id}`)
      .reply(200, (uri, body: any) => {
        const parts = uri.split("/");
        requestTicketId = parts[parts.length - 1];
        requestTicket = {
          ...ticket,
          title: body.title,
          description: body.description,
        };
        return requestTicket;
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

  it("renders delete button", () => {
    renderTicketItem();

    screen.getByRole("button", { name: /Delete Ticket/ });
  });

  it("renders toggle button", () => {
    renderTicketItem();

    screen.getByRole("button", { name: /Edit/ });
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

  context("when user clicks delete button", () => {
    it("calls API", async () => {
      renderTicketItem();
      fireEvent.click(screen.getByRole("button", { name: /Delete Ticket/ }));

      await waitFor(() => {
        expect(requestTicketId).toBe(ticket.id);
      });
    });
  });

  context("when user clicks edit button", () => {
    it("calls API", async () => {
      renderTicketItem();
      fireEvent.click(screen.getByRole("button", { name: /Edit/ }));
      await waitFor(() => {
        expect(requestTicketId).toBe(ticket.id);
        expect(requestTicket.title).toBe(ticket.title);
        expect(requestTicket.description).toBe(ticket.description);
      });
    });
  });
});
