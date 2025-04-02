import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Comment } from "../types";
import CommentList from "./CommentList";

describe("CommentList", () => {
  const comments: Comment[] = [
    {
      id: "1",
      ticketId: "1",
      content: "COMMENT",
    },
  ];
  function renderCommentList() {
    render(<CommentList comments={comments} />);
  }

  it("renders comments", () => {
    renderCommentList();

    screen.getByText("COMMENT");
    const ulElement = screen.getByRole("list");
    const liElements = ulElement.querySelectorAll("li");
    expect(liElements.length).toBe(1);
  });
});
