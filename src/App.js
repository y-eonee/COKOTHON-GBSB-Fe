import './App.css';
import Background from './Backgroud/Background';
import Start from './Start/Start';
import Grammer from './Grammer/Grammer';

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
        <Route path="/checkGrammer" element={<Grammer/>}/>
      </Routes>
    </Router>
  );
}

export default App;
