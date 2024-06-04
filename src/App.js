import Pay from "./components/Pay";
import PhoneAuth from "./components/PhoneAuth";
import React from "react";
import ThankYou from "./components/ThankYou";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhoneAuth />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
