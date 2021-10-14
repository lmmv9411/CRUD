export class VentanaModal {
  constructor(cmodal) {
    this.cmodal = cmodal;
    this.modal = this.cmodal.querySelector('.modal');
    this.cerrar = this.modal.querySelector('.cerrar-modal');

    this.cerrar.addEventListener('click', () => this.cerrarModal());
    this.cmodal.addEventListener('click', e => this.cerrarControl(e));
  }

  abrir() {
    this.cmodal.style.visibility = 'visible';
    this.cmodal.style.opacity = '1';
    this.modal.classList.add('show-modal');
  }

  cerrarModal() {
    this.modal.classList.remove('show-modal');

    setTimeout(() => {
      this.cmodal.style.visibility = 'hidden';
      this.cmodal.style.opacity = '0';
    }, 400);
  }

  cerrarControl(e) {
    if (e.target.classList.contains('contenedor-modal')) {
      this.cerrarModal();
    }
  }
}