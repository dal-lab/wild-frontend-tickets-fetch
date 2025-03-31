import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./Header";
import Main from "./Main";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />
        <Main />
      </div>
    </QueryClientProvider>
  );
}
