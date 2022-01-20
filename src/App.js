import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styles from './styles.module.css';

import { flight1 } from './flights/flight1';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flight: null,
      currentStep: 0,
      overview: true,
    }
  }

  onClickStart = () => {
    this.setState({
      flight: flight1(),
      currentStep: 0,
      overview: false,
    });
  };

  onClickNext = () => {
    this.setState({
      currentStep: this.state.currentStep + 1,
    });
  };

  onClickPrev = () => {
    if (this.state.currentStep > 0) {
      this.setState({
        currentStep: this.state.currentStep - 1,
      });
    }
  };

  onClickBack = () => {
    this.setState({
      overview: true,
    });
  };


  render() {

    if (this.state.overview) {
      return (
        <div className="App">
          <header className="App-header">
            <div>
              <button onClick={this.onClickStart} className={styles.startButton}>Go ahead ✈️</button>
            </div>
          </header>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          {this.state.flight.steps.map((step, index) =>
            (index === this.state.currentStep && <div>
              <div className={styles.sender}>
                {step.sender === 'A' ? '🛩️ Aircraft' : '📡 Ground'}
              </div>
              <div className={styles.message}>
                {step.text}
              </div>
            <div className={styles.actions}>
              {this.state.currentStep > 0 && <button onClick={this.onClickPrev} className={styles.buttonPrev}>back</button>}
              <button onClick={this.onClickNext} className={styles.buttonContinue}>continue</button>
            </div>
            <button onClick={this.onClickBack} className={styles.buttonCancel}>cancel</button>
          </div>))}
          {this.state.currentStep > this.state.flight.steps.length - 1 && <div>
            <div className={styles.message}>
              Fin.
            </div>
            <div className={styles.actions}>
              <button onClick={this.onClickBack} className={styles.buttonContinue}>Close</button>
            </div>
          </div>}
        </header>
      </div>
    );
  }
}

export default App;
