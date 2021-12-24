import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DynamicTable } from '../src';

function App() {
  return <DynamicTable url="https://jsonplaceholder.typicode.com/comments" />;
}

ReactDOM.render(<App />, document.getElementById('root'));
