import React from 'react';

type ErrorBoundaryBaseProps = {
    children: React.ReactNode;
    onError: (error: Error, info: React.ErrorInfo) => void;
};

type ErrorBoundaryBaseState = {
    hasError: boolean;
};

class ErrorBoundaryBase extends React.Component<ErrorBoundaryBaseProps, ErrorBoundaryBaseState> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.props.onError(error, info);
    }

    render() {
        if (this.state.hasError) {
            return null; // We'll render the error in our functional component
        }
        return this.props.children;
    }
}

export default ErrorBoundaryBase;
