import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navegacion/Navbar';
import Inicio from './components/paginas/Inicio';
import Formulario from './components/paginas/Formulario';
import Inicios from './components/views/login';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/login" element={<Inicios />} />
        

        <Route path="/" element={<Inicio />} />
        <Route path="/formulario" element={<Formulario />} />
      </Routes>
    </Router>
  );
};

export default App;
