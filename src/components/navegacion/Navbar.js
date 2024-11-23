import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const isAuthenticated = false; // Cambia esto según tu estado de autenticación
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica para cerrar sesión
    fetch("http://localhost:3000/logout", { credentials: "include" })
      .then(() => {
        alert("Sesión cerrada");
        navigate("/login");
      })
      .catch((error) => console.error("Error al cerrar sesión:", error));
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link to="/">
            <img src="./logo.jpg" alt="logo" width="80px" height="80px" />
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto fs-2">
              <li className="nav-item">
                <Link
                  className="nav-link active navbar-dark"
                  aria-current="page"
                  to="/"
                >
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link navbar-dark" to="/formulario">
                  Formulario
                </Link>
              </li>
            </ul>
          </div>

          {/* Botón de Login/Logout */}
          <div>
            {isAuthenticated ? (
              <button
                className="btn btn-outline-light"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link className="btn btn-outline-light" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
