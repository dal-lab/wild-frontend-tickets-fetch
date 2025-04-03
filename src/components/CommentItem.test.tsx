import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import CommentItem from "./CommentItem";
import nock from "nock";
import { API_BASE_URL } from "../api";

describe("CommentItem", () => {
  const comment = {
    id: "1",
    ticketId: "1",
    content: "COMMENT",
  };
  let requestTicketCommentId = "";

  function renderCommentItem() {
    render(<CommentItem comment={comment} />);
  }

  beforeEach(() => {
    requestTicketCommentId = "";
    nock(API_BASE_URL)
      .delete(`/tickets/${comment.ticketId}/comments/${comment.id}`)
      .reply(200, (uri, _body: any) => {
        const parts = uri.split("/");
        requestTicketCommentId = parts[parts.length - 1];
        return {
          ...comment,
        };
      });
  });

  it("renders", () => {
    renderCommentItem();
  });

  describe("when user clicks delete button", () => {
    it("calls API", async () => {
      renderCommentItem();
      fireEvent.click(screen.getByRole("button", { name: /Delete Comment/ }));
      await waitFor(() => {
        expect(requestTicketCommentId).toBe(comment.id);
      });
    });
  });
});
