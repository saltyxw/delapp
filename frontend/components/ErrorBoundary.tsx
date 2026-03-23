/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    // Intentionally minimal; in Vercel we want the UI to show details.
    // eslint-disable-next-line no-console
    console.error("ShopPage runtime error:", error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{ padding: 20 }}>
        <h2 style={{ marginBottom: 8 }}>Page crashed</h2>
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {this.state.error?.message}
          {"\n\n"}
          {this.state.error?.stack}
        </pre>
        <div style={{ marginTop: 12, opacity: 0.75 }}>
          Please check the message above and report it back.
        </div>
      </div>
    );
  }
}

