import { Component, ErrorInfo, ReactNode } from 'react';

import { Button } from './ui/button';
import { Card } from './ui/card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erreur non gérée:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Card className="p-6 text-center">
          <h2 className="mb-2 text-xl font-semibold">Une erreur est survenue</h2>
          <p className="mb-4 text-muted-foreground">
            {this.state.error?.message || 'Erreur inconnue'}
          </p>
          <Button onClick={() => window.location.reload()}>Recharger la page</Button>
        </Card>
      );
    }

    return this.props.children;
  }
}
