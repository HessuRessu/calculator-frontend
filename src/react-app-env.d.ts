/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'
        REACT_APP_BACKEND_URL: string
    }
}

// Interface for indicating errors during calculation.
interface CalculationError {
    isError: boolean;
    message: string;
}

// Interface for prime checker state.
interface PrimeState {
    calculated: boolean;
    isPrime: boolean;
    number: number;
    error: CalculationError;
}

// Interface for equation state.
interface EquationState {
    calculated: boolean;
    equation: string;
    result: number;
    isPrime: boolean;
    error: CalculationError;
}

// Interface for simple calculator state.
interface CalculationState {
    calculated: boolean;
    result: number;
    isPrime: boolean;
    inputs: string[];
    error: CalculationError;
}