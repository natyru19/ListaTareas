let tareaAgregada = document.querySelector(".inputText");
let tareas = document.querySelector(".tasks");
let agregar = document.querySelector(".inputBtnAgregar");
var contador = 0;
let cantidad = document.getElementById("cantidadTareas");
let cantTareasPendientes = document.getElementById("cantidadTareasPendientes");
let cantTareasFinalizadas = document.getElementById("cantidadTareasFinalizadas");
let listaTareas =[];
let containerFondo = document.querySelector(".containerFondo");
let containerHeader = document.querySelector(".containerHeader");
let container = document.querySelector(".container");
let containerFooter = document.querySelector(".containerFooter");



//#############################-->Funciones

const contarTareasFinalizadas=()=>{
    let cantFinalizadas =0;
    for(let i=0; i<listaTareas.length; i++){
        if(listaTareas[i].realizada){
            cantFinalizadas++;
        }
    }
    return cantFinalizadas;
}   

const contarTareasPendientes=()=>{
    let cantPendientes =0;
    for(let i=0; i<listaTareas.length; i++){
        if(!listaTareas[i].realizada){
            cantPendientes++;
        }
    }
    return cantPendientes;
}

function agregarTarea(nuevaTarea){
    let nuevaTareaObjeto = {"nombre": nuevaTarea, "realizada": false}
    listaTareas.push(nuevaTareaObjeto);
    renderTarea(nuevaTareaObjeto);
    
}

function renderTarea(nuevaTarea){
    
    if(nuevaTarea.nombre!='' && nuevaTarea.nombre!=undefined){
     
        let divTareas = document.createElement('div');
        divTareas.classList.add("divTareas");
        
        let inputCheck = document.createElement('input');
        inputCheck.classList.add("inputCheck");
        inputCheck.setAttribute('type', 'checkbox');
        let texto = document.createElement('p');
        texto.textContent = nuevaTarea.nombre;
        texto.classList.add("texto");
        divTareas.addEventListener('click',()=>{
            nuevaTarea.realizada = !nuevaTarea.realizada
            inputCheck.checked= !inputCheck.checked;
            if(nuevaTarea.realizada){
                texto.classList.add("tareaTachada");
            }else{
                texto.classList.remove("tareaTachada");
            }
            
            actualizarContadores();
        })

        if(nuevaTarea.realizada){
            texto.classList.add("tareaTachada");
            inputCheck.checked=true;
        }

        
        let imgEliminar = document.createElement('img');
        imgEliminar.classList.add("img");
        imgEliminar.setAttribute('src', "https://static.vecteezy.com/system/resources/thumbnails/022/159/677/small_2x/3d-illustration-website-ui-kit-trash-bin-png.png");
        imgEliminar.addEventListener('click', ()=>{
            Swal.fire({
                title: "Atención!",
                text: `Seguro de eliminar "${nuevaTarea.nombre}"?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Eliminar"
              }).then((result) => {
                  if (result.isConfirmed) {
                    borrarTarea(nuevaTarea);
                    Swal.fire({
                        title: "Eliminado!",
                        text: "Has borrado la tarea",
                        icon: "success"
                    });
                }
            });
        })
        
        
        divTareas.appendChild(inputCheck);
        divTareas.appendChild(texto);
        divTareas.appendChild(imgEliminar);
        
        tareas.appendChild(divTareas);
        container.appendChild(tareas);
        
        tareaAgregada.value=''
        tareaAgregada.classList.remove("error");
        tareaAgregada.setAttribute('placeholder', "Ingresa una tarea");
        contador++;
        
        actualizarContadores();
    }else{
        tareaAgregada.setAttribute('placeholder', "Debes ingresar una tarea");
        tareaAgregada.classList.add("error");
    }
}

function borrarTarea(tareaAborrar){
    let aux=[];
    for(let i=0; i< listaTareas.length; i++){
        if(listaTareas[i] != tareaAborrar){
            aux.push(listaTareas[i])
        }
    }
    listaTareas = aux;
    refrescarTareas();
    actualizarContadores();
}
   
const refrescarTareas=()=>{
    tareas.innerHTML ='';
    contador=0;
    
    for(let i=0; i<listaTareas.length; i++){
        renderTarea(listaTareas[i]);
    }
}

function actualizarContadores(){
    cantidad.textContent="Cantidad de tareas: " + contador;
    cantTareasPendientes.textContent="Pendientes: " + contarTareasPendientes();
    cantTareasFinalizadas.textContent="Finalizadas: " + contarTareasFinalizadas();
}

//#############################-->Eventos


agregar.addEventListener("click", ()=>{
    agregarTarea(tareaAgregada.value);
})

tareaAgregada.addEventListener("keydown", (e)=>{
    if(e.key=='Enter'){
        agregarTarea(tareaAgregada.value);
    }
})

//#############################-->Ejecuciones

actualizarContadores();

// let imgFondo = document.createElement('img');
// imgFondo.classList.add("imgFondo");
// imgFondo.setAttribute('src', "./background.png");


// container.appendChild(imgFondo);

