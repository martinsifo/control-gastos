import { useState, useEffect } from 'react';
import Header from './components/Header';
import { Filtros } from './components/Filtros';
import { ListadoGastos } from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {
  const [gastos, setGastos] = useState([...(JSON.parse(localStorage.getItem('gastos')) ?? [])]);

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  useEffect(() => {
    //Cuando se modifica el prepuesto, se guarda en el local storage para persistirlo cuando actualizamos la pagina

    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    //Cuando se agrega o elimina un gasto, se guarda en el local storage para persistirlo cuando actualizamos la pagina

    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    if (filtro) {
      //Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter((gasto) => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const filtrarCategoria = (gasto) => {
    return gastosFiltrados.filter((g) => g.id !== gasto.id);
  };

  const crearGasto = (gasto) => {
    //Nuevo Gasto
    gasto.id = generarId();
    gasto.fecha = Date.now();

    setGastos([...gastos, gasto]);

    if (filtro && gasto.categoria === filtro) {
      setGastosFiltrados([...gastosFiltrados, gasto]);
    }
  };

  const actualizarGasto = (gasto) => {
    const gastosActualizados = gastos.map((gastoState) => (gastoState.id === gasto.id ? gasto : gastoState));

    setGastos(gastosActualizados);
    const categoriaFiltrada = filtrarCategoria(gasto);

    if (filtro && gasto.categoria === filtro) {
      setGastosFiltrados([...categoriaFiltrada, gasto]);
    } else {
      setGastosFiltrados(categoriaFiltrada);
    }
  };

  const handleGasto = (gasto) => {
    if (gasto.id) {
      //Actualizar gasto
      actualizarGasto(gasto);
    } else {
      //Crea Gasto
      crearGasto(gasto);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);

    const gastosFiltradosActualizados = gastosFiltrados.filter((gasto) => gasto.id !== id);

    setGastos(gastosActualizados);
    setGastosFiltrados(gastosFiltradosActualizados);
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setGastosFiltrados={setGastosFiltrados}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setFiltro={setFiltro}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} filtro={filtro} gastosFiltrados={gastosFiltrados} />
          </main>
          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto} alt="Icono nuevo gasto" onClick={handleNuevoGasto} />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          handleGasto={handleGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
