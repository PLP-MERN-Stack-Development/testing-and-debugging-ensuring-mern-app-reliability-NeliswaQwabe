import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to render fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error for tracking (e.g., to a logging service)
    console.error("Uncaught Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="error-boundary-fallback">
          <h3>🐞 Application Error!</h3>
          <p>Something went wrong loading this component. Please refresh or check the console for details.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;