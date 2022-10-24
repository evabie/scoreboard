import type { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "components/errors/ErrorFallback";

const App: FC = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <div>Hello</div>
    </ErrorBoundary>
  );
};

export default App;
