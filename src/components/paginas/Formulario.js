import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import DataTable from 'react-data-table-component'

const Formulario = () => {

  const [codigo, setCodigo] = useState('')
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [modoEdicion, setModoEdicion] = useState(false)
  const [lista, setLista] = useState([])
  const [filtrarPersona, setFiltrarPersona] = useState([])
  const [busqueda, setBusqueda] = useState('')


  /*------------ Generar Codigo Automatico ------------*/
  const generarCantidad = () => {
    return Math.floor(Math.random() * 100000000)
  }

  /*------------ llenarCampos ------------*/

  const llenarCampos = (dato) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops... ',
      text: `El campo ${dato} no puede estar vacio`,
    })
  }

  /*------------ Agregar Usuario ------------*/
  const agregarUsuario = (e) => {
    e.preventDefault() // Evita que se recargue la pagina
    if (nombre.trim() === '') {
      llenarCampos('Producto')
      return
    }
    if (precio.trim() === '') {
      llenarCampos('Precio')
      return
    }


    const nuevoUsuario = { codigo: generarCantidad(), nombre, precio }
    setLista([...lista, nuevoUsuario]) // Agrega el nuevo usuario a la lista
    setNombre('')
    setPrecio('')

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto Agregado',
      showConfirmButton: false,
      timer: 1500
    })

  }

  /*------------ Eliminar Usuario ------------*/

  const eliminar = (codigo, nombre) => {
    Swal.fire({
      title: `Estas seguro de eliminar a ${nombre}?`,
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {

      if (result.isConfirmed) {
        const nuevaLista = lista.filter(item => item.codigo !== codigo)
        setLista(nuevaLista)
        console.log(nuevaLista)
        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        )
      }
    })
  }

  /*------------ Editar Usuario ------------*/
  const editar = (row) => {
    setCodigo(row.codigo)
    setPrecio(row.precio)
    setModoEdicion(true)
  }

  const guardarCambios = (e) => {
    e.preventDefault()
    if (nombre.trim() === '') {
      llenarCampos('Nombre')
      return
    }
    if (precio.trim() === '') {
      llenarCampos('Precio')
      return
    }

    const editado = lista.map(item => item.codigo === codigo ? { codigo, nombre, precio} : item)
    setLista(editado)
    setModoEdicion(false)

    setNombre('')
    setPrecio('')


    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto Editado',
      showConfirmButton: false,
      timer: 1500
    })
  }

  /*------------ Buscar Usuario ------------*/

  useEffect(() => {
    const filtrar=()=>{
      const resultado = lista.filter((item)=>{
        return(
          item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          item.precio.toLowerCase().includes(busqueda.toLowerCase()) 
        );
        });
          setFiltrarPersona(resultado);
    }
    filtrar();

  }, [busqueda,lista]) //se ejecuta cuando cambia el valor de busqueda o lista (cuando se agrega un nuevo usuario) 


  return (
    <div className='container py-5'>
      <h1 className='py-5'>Productos</h1>
      {/* Incia el Formulario  */}

      <form className='form-group'>
        <input
          type='text'
          placeholder='Ingrese Nombre'
          className='form-control mb-3'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          min={0}
          max={100}
          placeholder='Precio'
          className='form-control mb-3'
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        {
          modoEdicion ?
            (<button onClick={(e) => guardarCambios(e)} className='btn btn-warning btn-block' type='submit'>Guardar Cambios</button>)
            :
            (<button className='btn btn-dark btn-block'
              onClick={(e) => agregarUsuario(e)}
              type='submit'><span><i className="fa-solid fa-plus"></i></span> Agregar Producto</button>)
        }

      </form>

      {/* Crear nuestro DataTable  */}

      <div className='container py-5'>
        <h1 >Listado de Productos</h1>

        <DataTable
          columns={[
            {
              name: 'Codigo',
              selector: row => row.codigo,
              sortable: true
            },
            {
              name: 'Nombre',
              selector: row => row.nombre,
              sortable: true
            },
            {
              name: 'Precio',
              selector: row => row.precio,
              sortable: true
            },
            {
              name: 'Acciones',
              cell: (row) => (
                <>
                  <button onClick={() => { eliminar(row.codigo, row.nombre) }} className='btn btn-danger btn-sm '><span><i className="fa-solid fa-trash-can"></i></span></button>{' '}
                  <button onClick={() => { editar(row) }} className='btn btn-warning btn-sm mx-1'><span><i className="fa-solid fa-pencil"></i></span></button>
                </>
              )
            },
          ]}

          data={filtrarPersona}
          pagination
          paginationComponentOptions={{
            rowsPerPageText: 'Filas por Pagina',
            rangeSeparatorText: 'de',
            noRowsPerPage: false,
            selectAllRowsItem: false,
            selectAllRowsItemText: 'Todos'
          }}
          highlightOnHover
          pointerOnHover
          subHeader
          subHeaderComponent={(
            <input type='text'
              placeholder='Buscar'
              className='w-25 form-control'
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          )}

        ></DataTable>

      </div>


    </div>
  )
}

export default Formulario
