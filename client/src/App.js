
import './App.css';
// import socketIo from "socket.io-client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Join from './component/join/Join';
import Chat from './component/chat/Chat';

// const ENDPOINT="http://localhost:4500/";
// const socket=socketIo(ENDPOINT,{transports:['websocket']});
function App() {

  // socket.on("connect",()=>{});

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/chat' element={<Chat></Chat>}></Route>
          <Route exact path='/join' element={<Join></Join>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
