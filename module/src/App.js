import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import { actions, selectors } from "./store/evntboard";
import logo from './logo.svg';
import './App.css';

function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectors.isLoading)

  useEffect(() => {
    dispatch(actions.wsConnect())
    return () => {
      dispatch(actions.wsDisconnect())
    }
  }, [dispatch])

  const handleSendLove = () => {
    dispatch(actions.wsCreateEvent({
      event: "love-react",
      payload: Math.random()
    }))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {isLoading ? (
          <div>
            Evntboard connecting ...
          </div>
        ) : (
          <div>
            <button onClick={handleSendLove}>Send love react</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
