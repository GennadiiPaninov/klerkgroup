class Modal {
  constructor(modalSelector) {
    this.modal = document.querySelector(modalSelector);
    this.initOpenButtons(modalSelector);
    this.initCloseButton();
  }

  initOpenButtons(modalSelector) {
    const buttons = document.querySelectorAll(`[data-modal="${modalSelector}"]`);
    
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        this.open();
        this.disableBodyScroll();
      });
    });
  }

  initCloseButton() {
    if (this.modal) {
      const closeButton = this.modal.querySelector('.modal-close');
      
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          this.close();
          this.enableBodyScroll();
        });
      }
    }

    window.addEventListener('click', (event) => {
      if (this.modal && event.target === this.modal) {
        this.close();
        this.enableBodyScroll();
      }
    });
  }

  open() {
    this.modal.style.display = 'flex';
    
    setTimeout(() => {
      this.modal.classList.add('modal--open');
    }, 10);
  }

  close() {
    this.modal.classList.remove('modal--open');
    
    setTimeout(() => {
      this.modal.style.display = 'none';
    }, 300);
  }

  disableBodyScroll() {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.paddingRight = scrollBarWidth + 'px';
    document.body.style.overflow = 'hidden';
  }

  enableBodyScroll() {
    document.body.style.paddingRight = '';
    document.body.style.overflow = '';
  }
}
