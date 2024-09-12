import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./assets/containers/Layout/Layout";
import AsteroidProfile from "./assets/components/AsteroidProfile/AsteroidProfile";

function App() {

  return (

    <Router>
      <Routes>
     
        <Route path="/asteroid-watch/" element={<Layout />} />

        <Route path="/asteroid-watch/:id" element={<AsteroidProfile />} />
      </Routes>
    </Router>
  );

}

export default App
