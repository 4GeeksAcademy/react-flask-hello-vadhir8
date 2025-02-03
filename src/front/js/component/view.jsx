import React from "react";
import { useNavigate } from "react-router-dom";

export function View() {
    const navigate = useNavigate();

    const goToPrivate = () => {
        localStorage.setItem("fromView", "true");
        navigate("/private");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <main className="d-flex vh-100 justify-content-center align-items-center">
            <div className="card" style={{ width: '40rem' }}>
                <img
                    src="https://img.freepik.com/foto-gratis/imagen-primer-plano-firme-apreton-manos-hombre-pie-asociacion-confianza_1157-40413.jpg"
                    className="card-img-top"
                    alt="..."
                />
                <div className="card-body">
                    <h5 className="d-flex justify-content-center">Aviso de privacidad</h5>
                    <p className="card-text">
                        Hola. Solo queríamos hacerte saber que tu información es privada. En caso de que hayas olvidado tu nombre, podemos recordártelo.{" "}
                        <span 
                            className="text-primary" 
                            style={{ cursor: "pointer", textDecoration: "underline" }} 
                            onClick={goToPrivate}
                        >
                            Click aquí para recordar su nombre.
                        </span>
                    </p>
                    <div className="d-flex justify-content-center">
                        <button onClick={handleLogout} className="btn btn-primary">
                            Salir
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
