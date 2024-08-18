import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
