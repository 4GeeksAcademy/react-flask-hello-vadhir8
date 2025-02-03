import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Private() {
    const [name, setName] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No tienes permiso para ver esta página.");
                return;
            }

            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/private`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
              

                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                } else {
                    setError("No tienes permiso para ver esta página.");
                }  
            } catch (error) {
                console.error("Error:", error);
                setError("Hubo un problema al obtener la información.");
            }
        };

        fetchUserData();
    }, []);

    return (
        <main className="d-flex vh-100 justify-content-center align-items-center">
            <div className="card" style={{ width: '40rem' }}>
                <div className="card-body">
                    {error ? (
                        <p className="text-danger">{error}</p>
                    ) : (
                        <>
                            <h5 className="d-flex justify-content-center">!Eureka!</h5>
                            <p className="card-text d-flex justify-content-center">
                                {name ? `Tu nombre es: ${name}` : "Cargando..."}
                            </p>
                        </>
                    )}
                    <button onClick={() => navigate("/view")} className="btn btn-primary">
                        Volver
                    </button>
                </div>
            </div>
        </main>
    );
}
