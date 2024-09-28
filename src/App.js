import './App.css';
import Background from './Backgroud/Background';
import Start from './Start/Start';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Background />
      <Routes>
        <Route path="/" element={<Start/>}/>
      </Routes>
    </Router>
  );
}

export default App;
