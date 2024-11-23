import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./estilos.css"; // Importa el archivo de estilos

const Login = () => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
    });

    
    const data = await response.json();

    if (data.success) {
        alert(`Bienvenido, ${data.user.name}`);
        navigate("/");
    } else {
        setError(data.message);
    }
    } catch (err) {
        setError("Error al conectar con el servidor. Intenta más tarde.");
        console.error(err);
    }
};

return (
    <div className="login-container">
        <h1 className="login-title">Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            placeholder="Ingresa tu usuario"
        />
        </div>
        <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="Ingresa tu contraseña"
        />
        </div>
        <button type="submit" className="login-button" to="../paginas/Inicio.js">  
            Iniciar sesión
        </button>
        {error && <p className="error-message">{error}</p>}
    </form>
    </div>
);
};

export default Login;
