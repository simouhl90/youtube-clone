'use client';

import { Component, type ReactNode, type ErrorInfo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';

interface Props {
  children: ReactNode;
  onReset?: () => void;
  showGoBack?: boolean;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error for debugging
    console.error('[CineVerse ErrorBoundary]', error);
    console.error('[Error Stack]', errorInfo.componentStack);
  }

  handleGoBack = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.history.back();
    }
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    // Navigate to home by dispatching a custom event the store listens to
    window.location.href = '/';
  };

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const title = this.props.fallbackTitle || 'Something went wrong';
      return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #121225 100%)' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
              <AlertTriangle size={36} className="text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            <p className="text-sm text-white/50 mb-3 leading-relaxed">
              An unexpected error occurred. Please try again.
            </p>

            {/* Show error details in development */}
            {this.state.error && process.env.NODE_ENV === 'development' && (
              <div className="w-full mb-4 p-3 rounded-xl bg-white/5 border border-white/10 text-left max-h-32 overflow-y-auto">
                <p className="text-xs text-red-400 font-mono break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="w-full space-y-2">
              {this.props.showGoBack && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={this.handleGoBack}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white/70 bg-white/5 border border-white/10"
                >
                  <ArrowLeft size={18} />
                  Go Back
                </motion.button>
              )}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={this.handleGoHome}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-white/5 border border-white/10"
              >
                <Home size={18} />
                Go Home
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={this.handleReload}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25"
              >
                <RefreshCw size={18} />
                Reload App
              </motion.button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
