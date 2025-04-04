interface StatusButtonProps {
  status: "open" | "closed";
  onClick: () => void;
}

export default function StatusButton({ status, onClick }: StatusButtonProps) {
  const statusText = status === "open" ? "Open" : "Closed";
  return (
    <button type="button" onClick={onClick}>
      {statusText}
    </button>
  );
}
