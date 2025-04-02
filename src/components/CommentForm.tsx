import { FormEvent } from "react";

import TextField from "./TextField";
import SubmitButton from "./SubmitButton";

import useCreateComment from "../hooks/useCreateComment";

export default function CommentForm({ ticketId }: { ticketId: string }) {
  const createComment = useCreateComment();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const content = formData.get("content") as string;

    createComment({ ticketId, content });

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Comment" name="content" placeholder="Comment" />
      <SubmitButton label="Add Comment" />
    </form>
  );
}
