import React from "react";
import './Common.css';
import axios from "axios";

// Prime React component for calling backend and rendering results.
class Prime extends React.Component<{}, PrimeState> {

    state: PrimeState;

    /**
    * Default constructor.
    * 
    * @param {any} propes Component properties.
    */
    constructor(props: any) {
        super(props);
        this.state = {
            calculated: false,
            number: 0,
            error: {isError: false, message: ""} as CalculationError
        } as PrimeState;
    }

    /**
    * Rendering component.
    */
    render() {
        return (
            <>
                <h1 className="header">Prime Checker</h1>
                <input type="text" className="numeric-input" placeholder="Enter number" onChange={event => this.setPrime(event)} />
                <button className="calculate-button" onClick={ () => this.checkPrime() }>CHECK</button> <br />
                <div className={this.state.calculated ? "visible": "hidden"}>
                    {this.state.number} is {this.state.isPrime ? 'a prime number' : 'not a prime number'}<br />
                </div>
                <div className={this.state.error.isError ? "visible error": "hidden"}>
                    {this.state.error.message}
                </div>
            </>
        );
    }

    /**
    * Setting prime number.
    * 
    * @param {React.ChangeEvent<HTMLInputElement>} event Calling element
    */
    setPrime(event: React.ChangeEvent<HTMLInputElement>) {
        event.target.value = event.target.value.replace(/[^0-9-]/gmi, "");
        this.state.number = Number(event.target.value);
    }

    /**
    * Checking if entered number is prime.
    */
    checkPrime() {
        if (isNaN(this.state.number)) {
            this.setState(prevState => ({
                calculated: false,
                error: {isError: true, message: "Input is not a number!"} as CalculationError
            }));
        } else {
            let apiEndpoint: string = `${process.env.REACT_APP_BACKEND_URL}/api/prime?number=${this.state.number}`;
            console.log(apiEndpoint);
            axios.get(apiEndpoint).then((response) => {
                this.setState(prevState => ({ 
                    calculated: true,
                    number: this.state.number,
                    isPrime: response.data.isPrime,
                    error: {isError: false, message: ""} as CalculationError
                }));            
            }).catch((error) => {
                this.setState(prevState => ({
                    calculated: false,
                    error: {isError: true, message: error.message} as CalculationError
                }));
            });
        }
    }
}

export default Prime;