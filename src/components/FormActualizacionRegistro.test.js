// FormularioRegistro.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { FormActualizacionRegistro } from './FormActualizacionRegistro';

fetchMock.enableMocks();

describe('FormActualizacionRegistro', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('envía un permiso y muestra un mensaje de éxito', async () => {
        fetch.mockResponseOnce(JSON.stringify({
            id: 123,
            nombreEmpleado: "",
            apellidoEmpleado: "",
            tipoPermiso: "",
            fechaPermiso: ""
        }));

        render(<FormActualizacionRegistro permisoInicial={null} onRegistroExitoso={() => { }} />);
        fireEvent.change(screen.getByLabelText('Nombre Empleado'), { target: { value: 'Eliot' } });
        fireEvent.change(screen.getByLabelText('Apellido Empleado'), { target: { value: 'Humerez' } });
        fireEvent.change(screen.getByLabelText('Tipo de Permiso'), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText('Fecha del Permiso'), { target: { value: '2023-12-24' } });

        // Envía el formulario
        fireEvent.click(screen.getByText('Registrar Permiso'));

        // Espera a que el componente muestre el mensaje de éxito
        await waitFor(() => {
            expect(screen.getByText('Permiso registrado con éxito!')).toBeInTheDocument();
        });

        expect(fetch).toHaveBeenCalledWith(
            "https://localhost:7186/permisos",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // ... otros headers necesarios
                },
                body: JSON.stringify({
                    nombreEmpleado: 'Eliot',
                    apellidoEmpleado: 'Humerez',
                    tipoPermisoId: 1, // Asumiendo que esto es un número (ID)
                    fechaPermiso: '2023-12-31' // Asegúrate de que el formato coincida con lo que espera tu API
                }),
            }
        );
    });
});