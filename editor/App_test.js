import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom';
import Store from './store/app';
import TestCounter from './components/TestCounter';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.store = new Store();
  }

  render() {
    console.log('Rendering editor');
    return (
      <div className="App">
        <Provider store={this.store}>
          <TestCounter />
        </Provider>
      </div>
    );
  }
}

export const loadEditor = (element, options, configurations, listener, getPropertyValue) => {
  ReactDOM.render(<App configurations={configurations} options={options} listener={listener} getPropertyValue={getPropertyValue} />, element);
};

export const removeEditor = (element) => {
  ReactDOM.unmountComponentAtNode(element);
};
