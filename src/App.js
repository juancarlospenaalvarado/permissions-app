import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormularioRegistro } from './components/FormularioRegistro';
import { Popup } from './components/Popup';
import { FormActualizacionRegistro } from './components/FormActualizacionRegistro';


function App() {
  const [permisos, setPermisos] = useState([]);
  const [showForm, setShowForm] = useState(false); // Nuevo estado para controlar el formulario
  const [successMessage, setSuccessMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [permisoEditable, setPermisoEditable] = useState(null);

  const requestPermission = async (permissionData) => {
    try {
      const base_url = "https://localhost:7186/"
      const response = await axios.get(base_url + 'permisos/');
      const permissions = response.data;
      setPermisos(response.data);

    } catch (error) {
      console.error('Error al solicitar permiso', error);
    }
  };


  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setPermisoEditable(null);
    setSuccessMessage('');
  };

  useEffect(() => {
    requestPermission();
  }, []);
  const toggleForm = () => {
    setShowForm(!showForm);
    setSuccessMessage('');
  };

  const handleEditarPermiso = (permiso) => {
    console.log(permiso);
    setPermisoEditable(permiso);
    setIsPopupOpen(true);
  };

  const handleRegistroExitoso = (permiso, isUpdate) => {
    if (isUpdate) {
      setPermisos(permisos.map(p => p.id === permiso.id ? permiso : p));
    } else {
      setPermisos([...permisos, permiso]);
    }
    setIsPopupOpen(false);
    setSuccessMessage(isUpdate ? 'Permiso actualizado con éxito!' : 'Permiso registrado con éxito!');
  };

  return (

    <div className="container mx-auto">
      <h1 className="text-xl font-bold">Bienvenido a mi aplicación React</h1>

      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={togglePopup}
        >
          Registrar Nuevo Permiso
        </button>
      </div>
      <div className="App">

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Tipo de Permiso</th>
              <th>Fecha del Permiso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {permisos.map(permiso => (
              <tr key={permiso.id}>
                <td>{permiso.id}</td>
                <td>{permiso.nombreEmpleado}</td>
                <td>{permiso.apellidoEmpleado}</td>
                <td>{permiso.tipoPermisos?.descripcion || 'No Especificado'}</td>
                <td>{new Date(permiso.fechaPermiso).toLocaleDateString()}</td>
                <td><button
                  onClick={() => handleEditarPermiso(permiso)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded">
                  Editar
                </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={permisoEditable ? 'Actualizar Permiso' : 'Registrar Nuevo Permiso'}
      >
        <FormActualizacionRegistro
          permisoInicial={permisoEditable}
          onRegistroExitoso={handleRegistroExitoso}
        />
      </Popup>
      {successMessage && <p className="text-green-500">{successMessage}</p>}

    </div>
  );
}

export default App;
