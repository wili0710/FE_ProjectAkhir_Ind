export function debounce(funct, delay = 100) {
    let timeout;
    return function (...arg) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            funct.apply(this, arg);
        }, delay);
    };
};

export function draggableCard(classname="",dir="left"||"top",speed=Number) {
    const slider = document.querySelector(classname);
    let isDown = false;
    let initPos;
    let scrollDir;
    if(dir === "left") {
        slider.addEventListener('mousedown', (e) => {
            slider.classList.toggle('active');
            isDown = true;
            initPos = (e.pageX - slider.offsetLeft);
            scrollDir = slider.scrollLeft;
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
            slider.scrollLeft = scrollDir - (((e.pageX - slider.offsetLeft) - initPos) * speed); //--> multiply to setup scrolling speed
        });
    }else if(dir === "top") {
        slider.addEventListener('mousedown', (e) => {
            slider.classList.toggle('active');
            isDown = true;
            initPos = (e.pageY - slider.offsetTop);
            scrollDir = slider.scrollTop;
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
            /* *** */    
            e.preventDefault();
            slider.scrollTop = scrollDir - (((e.pageY - slider.offsetTop) - initPos) * speed); //--> multiply to setup scrolling speed
        });
    }
};

export function priceFormatter(num) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
};

export const API_URL_SQL = `http://localhost:8000`;