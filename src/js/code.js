let tareaAgregada = document.querySelector(".inputText");
let tareas = document.querySelector(".tasks");
let agregar = document.querySelector(".inputBtnAgregar");
var contador = 0;
let cantidad = document.getElementById("cantidadTareas");
let cantTareasPendientes = document.getElementById("cantidadTareasPendientes");
let cantTareasFinalizadas = document.getElementById("cantidadTareasFinalizadas");
let listaTareas = [];
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
        };
    };
    return cantFinalizadas;
};   

const contarTareasPendientes=()=>{
    let cantPendientes =0;
    for(let i=0; i<listaTareas.length; i++){
        if(!listaTareas[i].realizada){
            cantPendientes++;
        };
    };
    return cantPendientes;
};

async function tasksFromDb() {
    const response = await fetch('https://listatareasback.onrender.com/api/tasks');
    const responseData = await response.json();    
    
    for(let i = 0; i<responseData.data.length;i++){
        let tareaFormateada = {nombre: responseData.data[i].description, realizada: responseData.data[i].done, id: responseData.data[i]._id};
        listaTareas.push(tareaFormateada);
    };    

    for(let i = 0; i< listaTareas.length; i++){
        renderTarea(listaTareas[i]);
    };
};

async function agregarTarea(nuevaTarea){
    let nuevaTareaObjeto = {"nombre": nuevaTarea, "realizada": false};
    listaTareas.push(nuevaTareaObjeto);

    const url = 'https://listatareasback.onrender.com/api/tasks';

    const opts = {
        method : 'POST',
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({description : nuevaTareaObjeto.nombre })
    };

    let response = await fetch(url, opts);

    renderTarea(nuevaTareaObjeto);
};

function renderTarea(nuevaTarea){
    
    if(nuevaTarea.nombre!='' && nuevaTarea.nombre!=undefined){
        let divTareas = document.createElement('div');
        let divCheckText = document.createElement('div');
        divCheckText.classList.add("divCheckText");
        divTareas.classList.add("divTareas");
        let divTextTask = document.createElement('div');
        divTextTask.classList.add("divTextTask");
        let divImgCheck = document.createElement('div');
        divImgCheck.classList.add("divImgCheck");
        let inputCheck = document.createElement('img');
        inputCheck.classList.add("inputCheck");
        inputCheck.setAttribute('src', "src/img/unchecked.png");
        let texto = document.createElement('p');
        texto.textContent = nuevaTarea.nombre;
        texto.classList.add("texto");
        let textoErrorTareaRealizada = document.createElement('p');
        textoErrorTareaRealizada.textContent = `Hubo un error, por favor intente nuevamente`;
        textoErrorTareaRealizada.classList.add("textoErrorTareaRealizada");
        let divContainerError = document.createElement('div');
        divContainerError.classList.add("divContainerError");
        

        divCheckText.addEventListener('click', async (e)=>{
            e.preventDefault();

            try {
                nuevaTarea.realizada = !nuevaTarea.realizada
                const opts = {
                    method : 'PUT',
                    headers : {"Content-Type" : "application/json"},
                    body : JSON.stringify({description: nuevaTarea.nombre, done: nuevaTarea.realizada})
                }
                const response = await fetch(`https://listatareasback.onrender.com/api/tasks?id=${nuevaTarea.id}`, opts);
                if(response.status==201){
                    
                    if(nuevaTarea.realizada){
                        texto.classList.add("tareaTachada");
                        inputCheck.setAttribute('src', "src/img/checked.png");
                    }else{
                        texto.classList.remove("tareaTachada");
                        inputCheck.setAttribute('src', "src/img/unchecked.png");
                    };
                }else{
                    divCheckText.classList.add("divCheckTextError");
                }
        
                actualizarContadores();

            } catch (error) {
                divCheckText.classList.add("divCheckTextError");
                alert("Intente nuevamente")
            }
        });

        if(nuevaTarea.realizada){
            texto.classList.add("tareaTachada");
            inputCheck.setAttribute('src', "src/img/checked.png");
        };
        let divImgEliminar = document.createElement('div');
        divImgEliminar.setAttribute('id', "imgBorrar");
        let imgEliminar = document.createElement('img');
        imgEliminar.classList.add("img");
        imgEliminar.setAttribute('src', "src/img/delete.png");
        divImgEliminar.addEventListener('click', ()=>{
            confirmarEliminacion(nuevaTarea);
        });

        divTareas.appendChild(divImgCheck);
        divImgCheck.appendChild(inputCheck);
        divTareas.appendChild(divTextTask);
        divCheckText.appendChild(texto);
        divContainerError.appendChild(textoErrorTareaRealizada);
        divCheckText.appendChild(divContainerError);
        divTareas.appendChild(divCheckText);
        divImgEliminar.appendChild(imgEliminar);
        divTareas.appendChild(divImgEliminar);
        tareas.appendChild(divTareas);
        container.appendChild(tareas);
        tareaAgregada.value='';
        tareaAgregada.classList.remove("error");
        tareaAgregada.setAttribute('placeholder', "Ingresa una tarea");
        contador++;
        actualizarContadores();
    }else{
        tareaAgregada.setAttribute('placeholder', "Debes ingresar una tarea");
        tareaAgregada.classList.add("error");
    };
};

async function borrarTarea(tareaAborrar){
    
    let aux=[];
    for(let i=0; i< listaTareas.length; i++){
        if(listaTareas[i] != tareaAborrar){
            aux.push(listaTareas[i])
        };
    };
    listaTareas = aux;    
    
    const response = await fetch(`https://listatareasback.onrender.com/api/tasks?id=${tareaAborrar.id}`, {method: "DELETE"});
    const responseData = await response.json();
    
    refrescarTareas();
    actualizarContadores();
};

const refrescarTareas=()=>{
    tareas.innerHTML ='';
    contador=0;
    
    for(let i=0; i<listaTareas.length; i++){
        renderTarea(listaTareas[i]);
    };
};

function actualizarContadores(){
    cantidad.textContent="Cantidad de tareas: " + contador;
    cantTareasPendientes.textContent="Pendientes: " + contarTareasPendientes();
    cantTareasFinalizadas.textContent="Finalizadas: " + contarTareasFinalizadas();
};

function confirmarEliminacion(tareaAborrar){
    Swal.fire({
        title: "Atención!",
        text: `Seguro de eliminar "${tareaAborrar.nombre}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
            borrarTarea(tareaAborrar);
            Swal.fire({
                title: "Eliminado!",
                text: "Has borrado la tarea",
                icon: "success"
            });
        };
    });
};

//#############################-->Eventos


agregar.addEventListener("click", ()=>{
    agregarTarea(tareaAgregada.value);
});

tareaAgregada.addEventListener("keydown", (e)=>{
    if(e.key=='Enter'){
        agregarTarea(tareaAgregada.value);
    }
});

//#############################-->Ejecuciones

tasksFromDb();
actualizarContadores();

