import { useState } from 'react';
import Mensaje from './Mensaje';

function NuevoPresupuesto({ presupuesto, setPresupuesto, setIsValidPresupuesto, setFiltro }) {
  const [mensaje, setMensaje] = useState('');

  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!presupuesto || presupuesto < 0) {
      setMensaje('no es un presupuesto valido');
      return;
    }
    setMensaje('');
    setIsValidPresupuesto(true);
    setFiltro('');
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label>Definir Presupuesto</label>

          <input
            className="nuevo-presupuesto"
            type="number"
            value={Number(presupuesto).toString()}
            placeholder="Añade tu Presupuesto"
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>

        <input type="submit" value="Añadir" />

        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
}

export default NuevoPresupuesto;
