import { FormEvent } from "react";

import SubmitButton from "./SubmitButton";
import TextArea from "./TextArea";
import TextField from "./TextField";

import useCreateTicket from "../hooks/useCreateTicket";

export default function TicketForm() {
  const createTicket = useCreateTicket();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    createTicket({ title, description });

    form.reset();
  };

  return (
    <form className="add-ticket-form" onSubmit={handleSubmit}>
      <TextField label="Title" name="title" placeholder="Title" />
      <TextArea
        label="Description"
        name="description"
        placeholder="Description"
      />
      <SubmitButton label="Add Ticket" />
    </form>
  );
}
