import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            alert("Por favor, completa todos los campos.");
            return;
        }
    
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.Token);
                navigate("/view");
            } else {
                alert("Inténtalo de nuevo más tarde.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un error al conectar con el servidor.");
        }
    };  

    return (
        <main className="d-flex vh-100 justify-content-center align-items-center">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Ingresar</button>
                <p className="mt-3">
                    ¿Aún no eres un usuario? Prueba{" "}
                    <Link to="/">registrándote</Link>.
                </p>
            </form>
        </main>
    );
}