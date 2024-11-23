const express = require("express");
const app = express();
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const PassportLocal = require("passport-local").Strategy;
const cors = require("cors");

// Configuración de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Habilitar CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Dirección del frontend React
    credentials: true,
  })
);

// Configurar cookies y sesiones
app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Configuración de estrategia de Passport
passport.use(
  new PassportLocal((username, password, done) => {
    // Simular credenciales estáticas
    if (username === "Billy" && password === "12345") {
      return done(null, { id: 1, name: "Billy" });
    }
    return done(null, false, { message: "Credenciales incorrectas" });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  if (id === 1) {
    done(null, { id: 1, name: "Billy" });
  } else {
    done(new Error("Usuario no encontrado"));
  }
});

// Rutas del backend
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (!user) return res.status(401).json({ success: false, message: info.message });

    req.login(user, (loginErr) => {
      if (loginErr) return res.status(500).json({ success: false, message: loginErr.message });
      return res.json({ success: true, user });
    });
  })(req, res, next);
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, message: "Sesión cerrada correctamente" });
  });
});

app.get("/protected", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ success: true, message: "Tienes acceso", user: req.user });
  } else {
    res.status(401).json({ success: false, message: "No autorizado" });
  }
});

// Iniciar el servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
