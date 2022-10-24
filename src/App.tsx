import type { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "components/errors/ErrorFallback";
import Scoreboard from "components/Scoreboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
      staleTime: 2 * 60 * 1000,
    },
  },
});

const App: FC = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <QueryClientProvider client={queryClient}>
        <Scoreboard />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
