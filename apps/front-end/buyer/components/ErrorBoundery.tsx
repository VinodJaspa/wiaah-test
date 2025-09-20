import React, { useState, useEffect, ReactNode } from "react";

// Function to log errors (you can customize this)
const logErrorToMyService = (error: Error, info: string) => {
  console.error("Error logged:", error, info);
};

interface ErrorBoundaryProps {
  children: ReactNode; // Child components to be rendered
  fallback?: ReactNode; // Optional fallback UI when an error occurs
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
}) => {
  const [hasError, setHasError] = useState(false);

  // Error catching logic
  const errorHandler = (error: Error) => {
    setHasError(true);
    logErrorToMyService(error, "Error occurred in ErrorBoundary");
  };

  // Effect to reset error state on component mount
  useEffect(() => {
    setHasError(false); // Reset error state on re-mount
  }, [children]); // Reset if children change

  if (hasError) {
    // Render fallback UI if an error occurred
    return <>{fallback || <h1>Something went wrong.</h1>}</>;
  }

  // Wrap children in a try-catch to catch rendering errors
  try {
    return <>{children}</>; // Ensure this returns a valid React element
  } catch (error) {
    // Catch errors during rendering
    errorHandler(error as Error);
    return <>{fallback || <h1>Something went wrong.</h1>}</>; // Wrap in a fragment
  }
};

export default ErrorBoundary;
