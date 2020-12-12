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
            console.log(e.pageX, slider.offsetLeft)
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
            /* *** */ 
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

export function renderOption(props) {
    // console.log(props)
    if(props.text !== "pilih kategori product") {
        return (
            <> 
                <option className="hide" value={0} disabled defaultValue>{props.text}</option>  
                { 
                    props.state.map((val)=>{
                        return (
                            <option key={val.id} value={val.id}>
                                {val.id} | {val.nama}
                            </option>
                        )
                    })
                }
            </>
        );
    };
    let a;
    let arr = [];
    console.log(props.change.item)
    arr.push(...props.state)
    for (let i = 0; i < props.change.item.length; i++){
        a = arr.filter(val => {
                return val.id !== props.change.item[i].categoryproduct_id
            });
        arr.splice(0,arr.length)
        arr.push(...a)
    };
    return (
        <> 
            <option className="hide" value={0} disabled defaultValue>{props.text}</option>  
            { 
                arr.map((val)=>{
                    return (
                        <option key={val.id} value={val.id}>
                            {val.id} | {val.nama}
                        </option>
                    )
                })
            }
        </>
    );
}; 

export const API_URL_SQL = `http://localhost:8000`;