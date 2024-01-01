import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <input />
      <button onClick={async () => {
        try {
          await axios.post('http://localhost:8080/sendmail', { email: "rameshbabu20499@gmail.com" })
        } catch (error) {
          console.log(error)
        }
      }}>Submit</button>
    </div>
  );
}

export default App;
