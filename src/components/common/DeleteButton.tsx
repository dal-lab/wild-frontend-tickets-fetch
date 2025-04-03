interface DeleteButtonProps {
  label: string;
  onClick: () => void;
}

export default function DeleteButton({ label, onClick }: DeleteButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
}
