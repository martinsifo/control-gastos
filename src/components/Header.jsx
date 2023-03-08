import React from 'react';
import NuevoPresupuesto from './NuevoPresupuesto';
import ControlPresupuesto from './ControlPresupuesto';

function Header({ presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos, setGastos, setGastosFiltrados, setFiltro }) {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {isValidPresupuesto ? (
        <ControlPresupuesto
          gastos={gastos}
          setGastosFiltrados={setGastosFiltrados}
          setGastos={setGastos}
          presupuesto={presupuesto}
          setFiltro={setFiltro}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      ) : (
        <NuevoPresupuesto presupuesto={presupuesto} setFiltro={setFiltro} setPresupuesto={setPresupuesto} setIsValidPresupuesto={setIsValidPresupuesto} />
      )}
    </header>
  );
}

export default Header;
