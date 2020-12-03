export function debounce(funct, delay = 100) {
    let timeout;
    return function (...arg) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            funct.apply(this, arg);
        }, delay);
    };
};

export function draggableCard() {
    const slider = document.querySelector('.cardBx');
    let isDown = false;
    let startX;
    let scrollLeft;

    /* end of state */
    slider.addEventListener('mousedown', (e) => {
        slider.classList.toggle('active');
        isDown = true;
        startX = (e.pageX - slider.offsetLeft);
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        /* end of protection */    

        e.preventDefault();
        slider.scrollLeft = scrollLeft - (((e.pageX - slider.offsetLeft) - startX) * 2); //--> multiply to setup scrolling speed
    });
};

export const API_URL_SQL = `http://localhost:8000`;