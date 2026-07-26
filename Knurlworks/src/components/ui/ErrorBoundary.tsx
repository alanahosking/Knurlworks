import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production this would report to an error-tracking service.
    console.error('RIOTWEAR crashed:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="eyebrow">Error 500</p>
          <h1 className="font-display text-5xl">Something Tore</h1>
          <p className="max-w-md text-muted">
            The page hit a snag mid-set. Reload to get back under the bar.
          </p>
          <Button onClick={() => window.location.reload()}>Reload page</Button>
        </div>
      );
    }
    return this.props.children;
  }
}
