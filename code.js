let tareaAgregada = document.querySelector(".inputText");
let tareas = document.querySelector(".tasks");
let agregar = document.querySelector(".inputBtnAgregar");
var contador = 0;
let cantidad = document.getElementById("cantidadTareas");
cantidad.textContent="Cantidad de tareas: " + contador;


agregar.addEventListener("click", ()=>{
    agregarTarea(tareaAgregada.value);
})



tareaAgregada.addEventListener("keydown", (e)=>{
    if(e.key=='Enter'){
        agregarTarea(tareaAgregada.value);
    }
})

let listaTareas =[];

function agregarTarea(nuevaTarea){
    renderTarea(nuevaTarea);
    listaTareas.push(nuevaTarea);
    
}

function renderTarea(nuevaTarea){
    
    if(nuevaTarea!='' && nuevaTarea!=undefined){
     
        let divTareas = document.createElement('div');
        divTareas.classList.add("divTareas");
        
        let inputCheck = document.createElement('input');
        inputCheck.classList.add("inputCheck");
        inputCheck.setAttribute('type', 'checkbox');
        let texto = document.createElement('p');
        texto.textContent = nuevaTarea;
        texto.classList.add("texto");
        
        let imgEliminar = document.createElement('img');
        imgEliminar.classList.add("img");
        imgEliminar.setAttribute('src', "https://static.vecteezy.com/system/resources/thumbnails/022/159/677/small_2x/3d-illustration-website-ui-kit-trash-bin-png.png");
        imgEliminar.addEventListener('click', ()=>{
            borrarTarea(nuevaTarea);
        })
        
        divTareas.appendChild(inputCheck);
        divTareas.appendChild(texto);
        divTareas.appendChild(imgEliminar);
        
        tareas.appendChild(divTareas);

        tareaAgregada.value=''
        tareaAgregada.classList.remove("error");
        tareaAgregada.setAttribute('placeholder', "Ingresa una tarea");
        contador++;
        cantidad.textContent= "Cantidad de tareas: " + contador;
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
}

/*
REFRESCAR TAREAS(){

    recorro las tareas
    en cada tarea llamo a  AGREGAR TAREA(pasando la tarea)


}

*/


const refrescarTareas=()=>{
    tareas.innerHTML ='';
    contador=0;
    cantidad.textContent="Cantidad de tareas: " + contador;
    
    for(let i=0; i<listaTareas.length; i++){
        renderTarea(listaTareas[i]);
    }
}