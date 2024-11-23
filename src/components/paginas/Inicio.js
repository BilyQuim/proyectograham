import React from 'react'
import Carrusel from '../Carrusel'

const Inicio = () => {
  return (
    <div>
      <Carrusel />

      <div className="jumbotron text-center">
        <h1 className="display-4">Bienvenidos a Vanguard Tech</h1>
        <p className="lead">Vanguard Tech es una tienda especializada en ofrecer la última tecnología en dispositivos y accesorios. Nos enfocamos en brindar a nuestros clientes una experiencia de compra única, con una selección de dispositivos de alta gama, servicios de personalización y soporte técnico especializado. Además, contamos con accesorios innovadores que complementan tu estilo de vida digital, como audífonos inalámbricos, cargadores rápidos y protectores de diseño exclusivo. En Vanguard Tech, no solo compras tecnología, vives el futuro de la conectividad.</p>
        <hr className="my-4" />
        <p>Creado por Billy Bin</p>
        <a className="btn btn-primary btn-lg" href='/formulario' role="button">Explorar</a>
      </div>

    </div>
  )
}

export default Inicio
