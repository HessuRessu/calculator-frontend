import React from "react";
import './Common.css';
import axios from "axios";

// Calculator React component for calling backend and rendering results.
class Calculator extends React.Component<{}, CalculationState> {

    state: CalculationState;
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
            result: 0,
            inputs: ["nubmer-0"],
            error: { isError: false, message: ""} as CalculationError
        } as CalculationState;
        this.numbers = [0];
    }

    /**
    * Rendering component.
    */
    render() {
        return (
            <>
                <h1 className="header">Simple Calculator</h1>
                <button className="remove-button" onClick={ () => this.removeNumber() } title="Remove number"><img src="remove.png" className="calculator-icon" /></button>
                <button className="calculator-button" onClick={ () => this.calculateSum() }>CALCULATE</button>
                <button className="add-button" onClick={ () => this.addNumber() } title="Add number"><img src="add.png" className="calculator-icon" /></button>
                <br />
                <div className="calculator-numbers"> 
                    {this.state.inputs.map(input => <input defaultValue="0" type="number" className="calculator-number" key={input} name={input} onChange={event => this.updateNumber(event)} />)}
                </div>

                <div className={this.state.calculated ? "visible": "hidden"}>
                    Result is {this.state.result}, which is {this.state.isPrime ? 'a prime' : 'not a prime'}.
                </div>
                <div className={this.state.error.isError ? "visible error": "hidden"}>
                    {this.state.error.message}
                </div>
            </>
        );
    }

    /**
    * Adding number to calculator.
    */
     addNumber() {
        var newInput = `nubmer-${this.state.inputs.length}`;
        this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
        this.numbers.push(0);
        
    }

    /**
    * Removing number from calculator.
    */
     removeNumber() {
        if (this.state.inputs.length > 1) {
            this.setState(prevState => ({ inputs: prevState.inputs.slice(0, prevState.inputs.length-1) }));
            this.numbers = this.numbers.slice(0, this.numbers.length-1);
        }
    }

    /**
    * Updating number value based on it's elements index.
    * 
    * @param {React.ChangeEvent<HTMLInputElement>} event Calling element
    */
     updateNumber(event: React.ChangeEvent<HTMLInputElement>) {
        let index = parseInt(event.target.name.split("-")[1]);
        this.numbers[index] = Number(event.target.value);
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

export default Calculator;