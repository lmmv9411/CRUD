import { Persona } from "../model/persona.js";
import { PersonaDAO } from "../data/personadao.js";
import { VentanaModal } from './ventanaModal.js'

export class VPersona {
    constructor() {

        this.inputs = document.getElementById('formulario').querySelectorAll('input');
        this.cuerpo = document.getElementById('cuerpo');
        this.dao = new PersonaDAO();
        this.modal = new VentanaModal(modalEliminar);
        this.modalA = new VentanaModal(modalActualizar);
        this.filaEliminar = null;
        this.btnAgregar = document.getElementById('btn_agregar');

        this.btnAgregar.addEventListener('click', e => this.onClick(e));

        btn_limpiar.addEventListener('click', e => this.onClick(e));

        btn_eliminar.addEventListener('click', e => this.onClick(e));

        this.cuerpo.addEventListener('click', e => this.onClick(e));

        this.cuerpo.addEventListener('dblclick', e => this.onDblClick(e))

        modalEliminar.querySelector('.btn-success')
            .addEventListener('click', e => this.modal.cerrarModal());

        modalActualizar.querySelector('.btn-remove')
            .addEventListener('click', e => this.modalA.cerrarModal());

        btn_actualizar.addEventListener('click', e => this.onClick(e));

        this.showData();
    }

    onClick(e) {

        let elm = e.target.textContent;

        switch (elm) {
            case 'Eliminar':
                let row = e.target.parentNode.parentNode;

                if (e.target.id === 'btn_eliminar') {
                    this.cuerpo.removeChild(this.filaEliminar);
                    this.dao.eliminar(this.filaEliminar.children[0].textContent);
                    this.modal.cerrarModal();
                    this.filaEliminar = null;
                    return;
                }

                this.filaEliminar = row;

                document.querySelector('.body-modal').textContent =
                    `¿Desea Eliminar a ${row.children[0].textContent}?`;
                this.modal.abrir();

                break;
            case 'Agregar':

                let persona = this.getPersona();

                for (let inpt of this.inputs) {

                    if (inpt.hasAttribute('required') &&
                        inpt.value === '') {
                        return;
                    }
                }

                if (this.dao.mostrar(persona.id) === null) {
                    this.dao.guardar(persona);
                    this.insertarFila(persona);
                }

                this.limpiar();
                this.inputs[0].focus();
                break;
            case 'Actualizar':
                const p = new Persona();
                const inputsA = modalActualizar.querySelectorAll('input');

                p.id = inputsA[0].value;
                p.nombre = inputsA[1].value;
                p.apellido = inputsA[2].value;
                p.telefono = inputsA[3].value;

                this.dao.guardar(p);
                this.insertarFila(p);
                this.modalA.cerrarModal();
                
                break;
            case 'Limpiar':
                this.limpiar();
                break;
        }

        e.preventDefault();

    }

    onDblClick(e) {
        const row = e.target.parentNode;
        const inputsA = modalActualizar.querySelectorAll('input');

        for (let i = 0; i < this.inputs.length; i++) {
            inputsA[i].value = row.children[i].textContent;
        }

        this.cuerpo.removeChild(row);

        this.modalA.abrir();
    }

    showData() {

        const arr = this.dao.mostrarTodo();

        for (let obj of arr) {
            this.insertarFila(obj);
        }
    }

    insertarFila(obj) {
        let row = this.cuerpo.insertRow();
        row.innerHTML = `<td>${obj.id}</td>
                        <td>${obj.nombre}</td>
                        <td>${obj.apellido}</td>
                        <td>${obj.telefono}</td>
                        <td><button class="btn btn-remove">Eliminar</button></td>`
    }

    limpiar() {
        for (let inp of this.inputs) {
            inp.value = '';
        }
        this.inputs[0].removeAttribute('readonly');
        this.btnAgregar.textContent = 'Agregar';
    }

    getPersona() {
        let persona = new Persona();

        persona.id = this.inputs[0].value;
        persona.nombre = this.inputs[1].value;
        persona.apellido = this.inputs[2].value;
        persona.telefono = this.inputs[3].value;

        return Object.assign({}, persona);
    }

}