import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import './App.css';
import index from './route/index';
import renderRoutes from './route/renderRoutes';

function App() {
  return (
    <div className="App">
      <Provider>
        <BrowserRouter>
          {
            renderRoutes(index)
          }
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
