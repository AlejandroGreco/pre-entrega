import { useEffect, useState } from "react"
import "../styles/Productos.css"
import Card from "../components/Card"

function Productos({}){
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    {useEffect(() => {
        fetch('https://683323f3c3f2222a8cb50bc3.mockapi.io/productos')
            .then((respuesta) =>
                respuesta.json()
            )
            .then((datos) => {
                console.log(datos)
                setProductos(datos)
                setCargando(false);
            })
            .catch((error) => {
                console.log("Error", error)
                setError('Hubo un problema al cargar los productos.');
                setCargando(false);
            });
    }, []);}


    if (cargando) {
        return <p>Cargando productos...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <div className="productos-conteiner">
                {productos.map((producto) => (
                    <Card
                        producto={producto}
                    />
                ))}
            </div>
        )
    }

    
}

export default Productos
