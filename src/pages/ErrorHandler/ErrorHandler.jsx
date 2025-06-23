import { useRouteError } from "react-router-dom";

function ErrorHandler() {
  const routeError = useRouteError();
  console.error(routeError);

  return (
    <div id="error-handler">
      <h1>Routing Error</h1>
      <p>An unexpected error has occurred.</p>
      <p>
        <i>{routeError.statusText || routeError.message}</i>
      </p>
    </div>
  );
}

export default ErrorHandler;
