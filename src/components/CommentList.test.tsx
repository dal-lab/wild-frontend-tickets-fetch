import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { Comment } from "../types";
import CommentList from "./CommentList";
import nock from "nock";
import { API_BASE_URL } from "../api";

describe("CommentList", () => {
  let requestTicketId: string | null = null;
  const ticketId = "1";
  const comments: Comment[] = [
    {
      id: "1",
      ticket_id: "1",
      content: "COMMENT",
    },
  ];

  beforeEach(() => {
    requestTicketId = "";
    nock(API_BASE_URL)
      .delete(`/tickets/${ticketId}/comments`)
      .reply(200, (uri, body: any) => {
        const parts = uri.split("/");
        requestTicketId = parts[parts.length - 2];
        return {
          comments: comments.filter((comment) => comment.id !== body.id),
        };
      });
  });
  function renderCommentList() {
    render(<CommentList comments={comments} />);
  }

  it("renders", () => {
    describe("renders comments", () => {
      renderCommentList();
      screen.getByText("COMMENT");
      const ulElement = screen.getByRole("list");
      const liElements = ulElement.querySelectorAll("li");
      expect(liElements.length).toBe(1);
    });

    describe("renders delete button", () => {
      renderCommentList();
      screen.getByRole("button", {
        name: /Delete Comment/,
      });
    });
  });
});
