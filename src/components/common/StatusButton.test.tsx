import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import StatusButton from "./StatusButton";

const context = describe;

describe("StatusButton", () => {
  const onClick = vi.fn();
  function renderStatusButton({ status }: { status: "open" | "closed" }) {
    render(<StatusButton onClick={onClick} status={status} />);
  }

  it("renders button", () => {
    renderStatusButton({ status: "open" });
    screen.getByRole("button");
  });

  context("when status open", () => {
    it("renders correct text", () => {
      renderStatusButton({ status: "open" });
      screen.getByText("Open");
    });
  });

  context("when status close", () => {
    it("renders correct text", () => {
      renderStatusButton({ status: "closed" });
      screen.getByText("Closed");
    });
  });

  it("calls onClick when clicked", () => {
    renderStatusButton({ status: "open" });
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalled();
  });
});
