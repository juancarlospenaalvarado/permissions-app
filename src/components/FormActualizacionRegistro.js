import axios from "axios";
import { useState } from "react";

export const FormActualizacionRegistro = ({ permisoInicial, onRegistroExitoso }) => {
    const formattedFechaPermiso = permisoInicial?.fechaPermiso
        ? new Date(permisoInicial.fechaPermiso).toISOString().split('T')[0]
        : '';
    const [nombreEmpleado, setNombreEmpleado] = useState(permisoInicial?.nombreEmpleado || '');
    const [tipoPermiso, setTipoPermiso] = useState(permisoInicial?.tipoPermisos.id || '');
    const [apellidoEmpleado, setApellidoEmpleado] = useState(permisoInicial?.apellidoEmpleado || '');
    const [fechaPermiso, setFechaPermiso] = useState(formattedFechaPermiso);
    const [buttonText, setButtonText] = useState(permisoInicial ? 'Confirmar Actualización' : 'Registrar Permiso');

    const registrarPermiso = async (e) => {
        e.preventDefault();
        const base_url = "https://localhost:7186/";
        const id = permisoInicial?.id || "";
        const permisoData = {
            id,
            nombreEmpleado,
            apellidoEmpleado,
            tipoPermiso,
            fechaPermiso
        };

        try {
            const response = permisoInicial
                ? await axios.put(`${base_url}permisos/${permisoInicial.id}`, permisoData)
                : await axios.post(`${base_url}permisos`, permisoData);
            console.log(response.data);
            onRegistroExitoso(response.data, !!permisoInicial);
        } catch (error) {
            console.error('Error al registrar el permiso', error);
        }
    };
    return (
        <form onSubmit={registrarPermiso} className="max-w-md">
            {/* Campos del formulario */}
            <div>
                <label>Nombre Empleado</label>
                <input type="text" value={nombreEmpleado} onChange={(e) => setNombreEmpleado(e.target.value)} />
            </div>
            <div>
                <label>Apellido Empleado</label>
                <input type="text" value={apellidoEmpleado} onChange={(e) => setApellidoEmpleado(e.target.value)} />
            </div>
            <div>
                <label>Tipo de Permiso</label>
                <input type="number" value={tipoPermiso} onChange={(e) => setTipoPermiso(e.target.value)} />
            </div>
            <div>
                <label>Fecha del Permiso</label>
                <input type="date" value={fechaPermiso} onChange={(e) => setFechaPermiso(e.target.value)} />
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                {buttonText}
            </button>
        </form>
    );
};
