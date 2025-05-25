import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './layouts/Home';
import Productos from './layouts/Productos';
import Nav from './components/Nav';
import ProductoDetalle from './layouts/ProductoDetalle';
import Carrito from './layouts/Carrito';
import Login from './layouts/Login';
import Admin from './layouts/Admin';

function App() {
  const [productosCarrito, setProductosCarrito] = useState([])
  const [usuarioLogeado, setUsuarioLogeado] = useState(false)
  const [adminLogeado, setAdminLogeado] = useState(false)

  function manejarAdmin() {
    setAdminLogeado(!adminLogeado)
  }

  function manejarUser(){
    setUsuarioLogeado(!usuarioLogeado)
  }


  const agregarAlCarrito = (producto) => {
    const existe = productosCarrito.find(p => p.id === producto.id);
    if (existe) {
      const carritoActualizado = productosCarrito.map((p) => {
        if (p.id === producto.id){
          const productoActualizado = {...p, cantidad: p.cantidad + producto.cantidad}
          return productoActualizado
        }else{
          return p
        }
      })
      setProductosCarrito(carritoActualizado)
    }else{
      // Si no existe, lo agregamos con su cantidad
      const nuevoCarrito = [...productosCarrito, producto];
      setProductosCarrito(nuevoCarrito)
    }
  };

  const vaciarCarrito = () => {
    setProductosCarrito([]);
  };

  function borrarProductoCarrito(id){
    console.log(id)
    const nuevoCarrito = productosCarrito.filter((p) => p.id !== id);
    setProductosCarrito(nuevoCarrito);
  }

  return (
    <>
      <Router>
        <Nav productosCarrito={productosCarrito}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/productos/:id' element={<ProductoDetalle agregarAlCarrito={agregarAlCarrito} />} />
          <Route path='/carrito' element={<Carrito usuarioLogeado={usuarioLogeado} productosCarrito={productosCarrito} vaciarCarrito={vaciarCarrito} borrarProductoCarrito={borrarProductoCarrito} />} />
          <Route path='/login' element={<Login user={usuarioLogeado} admin={adminLogeado} setLogeadoAdmin={manejarAdmin} setLogeadoUser={manejarUser}/>}/>
          <Route path='/admin' element={adminLogeado ? <Admin/> : <Navigate to={"/login"} replace/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
