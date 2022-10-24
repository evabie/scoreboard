import type { FallbackProps } from "react-error-boundary";

const ErrorFallback: React.ComponentType<FallbackProps> = ({
  resetErrorBoundary,
}) => {
  return (
    <>
      <p>
        Podczas wyświetlania strony wystąpił błąd, odśwież stronę lub spróbuj
        ponownie później
      </p>
      <button onClick={resetErrorBoundary}>Odśwież stronę</button>
    </>
  );
};

export default ErrorFallback;
