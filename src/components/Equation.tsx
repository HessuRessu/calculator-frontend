import React from "react";
import './Common.css';
import './Equation.css';
import axios from "axios";

// Calculator React component for calling backend and rendering results.
class Equation extends React.Component<{}, EquationState> {

    state: EquationState;
    numbers: number[];

    /**
    * Default constructor.
    * 
    * @param {any} propes Component properties.
    */
    constructor(props: any) {
        super(props);
        this.state = {
            calculated: false,
            isPrime: false,
            equation: "",
            result: 0,
            error: { isError: false, message: ""} as CalculationError
        } as EquationState;
        this.numbers = [];
    }

    /**
    * Rendering component.
    */
    render() {
        return (
            <>
                <h1 className="header">Equation Calculator</h1>
                <input type="text" className="numeric-input" placeholder="Enter equation ie. -1+2+3" onBlur={event => this.completeEquation(event)} onChange={event => this.checkEquation(event)} />
                <button className="calculate-button" onClick={ () => this.calculateSum() }>CALCULATE</button> <br />
                <div className={this.state.calculated ? "visible": "hidden"}>
                    {this.state.equation} = {this.state.result} ({this.state.isPrime ? 'prime' : 'not a prime'})
                </div>
                <div className={this.state.error.isError ? "visible error": "hidden"}>
                    {this.state.error.message}
                </div>
            </>
        );
    }

    /**
    * Checking equation when it has been changed.
    * 
    * @param {React.ChangeEvent<HTMLInputElement>} event Calling element
    */
    checkEquation(event: React.ChangeEvent<HTMLInputElement>) {
        event.target.value = event.target.value.replace(/[^0-9+-]/gmi, "").replace(/(\+\+)/gmi, "+").replace(/(\+-)/gmi, "-").replace(/(-\+)/gmi, "-");
    }
    
    /**
    * Completing equation.
    * 
    * @param {React.ChangeEvent<HTMLInputElement>} event Calling element
    */
     completeEquation(event: React.ChangeEvent<HTMLInputElement>) {
        this.state.equation = event.target.value;
        if (this.state.equation.endsWith("+") || this.state.equation.endsWith("-"))
            this.state.equation = this.state.equation.substring(0, this.state.equation.length-1);
        event.target.value = this.state.equation;
        
        let parts: string[] = this.state.equation.split(/(\+|-)/).map(String);
        this.numbers = [];
        for (let i = 0; i < parts.length; i+=2) {
            if (parts[i] !== "") {
                this.numbers.push(i === 0 || parts[i-1] === "+" ? parseInt(parts[i]) : -parseInt(parts[i]));
            }
        }
    }

    /**
    * Calculating sum of entered equation.
    */
    calculateSum() {
        if (this.numbers.length === 0)
            return;
        let apiEndpoint: string = `${process.env.REACT_APP_BACKEND_URL}/api/sum?numbers=${this.numbers.join(",")}`;
        console.log(apiEndpoint);
        axios.get(apiEndpoint).then((response) => {
            this.setState(prevState => ({
                calculated: true,
                equation: this.state.equation,
                isPrime: response.data.isPrime,
                result: response.data.result,
                error: {isError: false, message: ""} as CalculationError
            }));
        }).catch((error) => {
            this.setState(prevState => ({
                error: {isError: true, message: error.message} as CalculationError
            }));
        });
    }
}

export default Equation;