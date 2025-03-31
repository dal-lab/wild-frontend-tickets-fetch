import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";

export default function Main() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main>
        <ErrorBoundary fallback={<div>Error!</div>}>
          <TicketList />
          <TicketForm />
        </ErrorBoundary>
      </main>
    </Suspense>
  );
}
