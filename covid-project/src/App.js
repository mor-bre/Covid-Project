import './css/App.css';
import AllStates from './components/allStates';
import ByState from './components/statesContainer';


function App() {
  return (
    <div className="App">
      <header>
        <h1>The Covid Project</h1>
      </header>
      <div className='content'>
        <AllStates />
        <ByState />
      </div>
    </div>
  );
}

export default App;
