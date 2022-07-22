import Login from "./Login";
import Register from "./Register";
import Feed from "./Feed";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/feed" element={<Feed />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
