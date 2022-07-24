import Login from "./Login";
import Register from "./Register";
import Feed from "./Feed";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/feed" element={<Feed />} />
        <Route path="/" element={<Navigate replace to="/feed" />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
