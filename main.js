const url = 'http://localhost:5000/api/productos/'
let contenedor = document.querySelector('tbody');
let resultados = '';

let = modalProducto = new bootstrap.Modal(document.getElementById('modalProducto'));
let = formProducto = document.querySelector('form');
let = nombreProducto = document.getElementById('nombreProducto');
let = comentarios = document.getElementById('comentarios');
let = descripcion = document.getElementById('descripcion');
let = categoria = document.getElementById('categoria');
let = estatus = document.getElementById('estatus');
let opcion = ''



btnCrear.addEventListener('click', ()=>{
    nombreProducto.value=''
    comentarios.value=''
    descripcion.value=''
    categoria.value=''
    estatus.value=''
    modalProducto.show()
    opcion='crear'
})

//mostrar
const mostrar=(productos) =>{
    productos.forEach(producto => {
        resultados += `
                        <tr>
                            <td>${producto.idProducto}</td>
                            <td>${producto.NombreProducto}</td>
                            <td>${producto.Comentarios}</td>
                            <td>${producto.Descripcion}</td>
                            <td>${producto.Categoria}</td>
                            <td>${producto.Estatus}</td>
                            <td class="text-center"><button id="btnEditar" type="button" class="btn btn-primary btnEditar">Editar</button></td>
                        </tr>
        `
    })
    contenedor.innerHTML= resultados
}

fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error=> console.log(error))

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//BORRAR
/* on(document, 'click', '.btnBorrar', e =>{
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    console.log(id);
    fetch(url+id,{
        method: 'DELETE'
    })
    .then( res=>res.json())
    .then(()=> location.reload())
}) */

//EDITAR
let idForm = 0
on(document, 'click', '.btnEditar', e =>{
    const fila = e.target.parentNode.parentNode
    idForm=fila.children[0].innerHTML
    const NombreProductoForm = fila.children[1].innerHTML
    const ComentariosForm = fila.children[2].innerHTML
    const DescripcionForm = fila.children[3].innerHTML
    const CategoriaForm = fila.children[4].innerHTML
    const EstatusForm = fila.children[5].innerHTML
    nombreProducto.value=NombreProductoForm
    comentarios.value=ComentariosForm
    descripcion.value=DescripcionForm
    categoria.value=CategoriaForm
    estatus.value=EstatusForm
    opcion='editar'
    modalProducto.show()
})

formProducto.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    if(opcion=='crear'){
        //  VALIDACIONES DE FORMULARIO
    const flag = {
    nombreProducto: false,
    comentarios: false,
    descripcion: false,
    categoria: false,
    estatus: false
}

//  Validacion nombreProducto
    nombreProducto.classList.remove("is-invalid");
    nombreProducto.classList.add("is-valid");
 
    if ((nombreProducto.value.length >= 3) && (nombreProducto.value.length < 50) && !(nombreProducto.value.trim() == "") && (nombreProducto.value[0] != " ")) {
        nombreProducto.classList.add("is-valid"); 
        flag.nombreProducto = true
    }
    else{  
         nombreProducto.classList.add("is-invalid");
         flag.nombreProducto = false
    }
//  Validacion comentarios
    comentarios.classList.remove("is-invalid");
    comentarios.classList.add("is-valid");
 
    if ((comentarios.value.length >= 3) && (comentarios.value.length < 100) && !(comentarios.value.trim() == "") && (comentarios.value[0] != " ")) {
        comentarios.classList.add("is-valid"); 
        flag.comentarios = true
    }
    else{  
         comentarios.classList.add("is-invalid");
         flag.comentarios = false
    }

    //  Validacion descripcion
    descripcion.classList.remove("is-invalid");
    descripcion.classList.add("is-valid");
 
    if ((descripcion.value.length >= 3) && (descripcion.value.length < 200) && !(descripcion.value.trim() == "") && (descripcion.value[0] != " ")) {
        descripcion.classList.add("is-valid"); 
        flag.descripcion = true
    }
    else{  
         descripcion.classList.add("is-invalid");
         flag.descripcion = false
    }

    //  Validacion categoria
    categoria.classList.remove("is-invalid");
    categoria.classList.add("is-valid");
 
    if (categoria.value.length>0 && categoria.value>0) {
        categoria.classList.add("is-valid"); 
        flag.categoria = true
    }
    else{  
         categoria.classList.add("is-invalid");
         flag.categoria = false
    }

    //  Validacion estatus
    estatus.classList.remove("is-invalid");
    estatus.classList.add("is-valid");
 
    if (estatus.value.length>0) {
        estatus.classList.add("is-valid"); 
        flag.estatus = true
    }
    else{  
         estatus.classList.add("is-invalid");
         flag.estatus = false
    }

    if (flag.nombreProducto && flag.comentarios && flag.descripcion && flag.categoria && flag.estatus){
            fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                NombreProducto:nombreProducto.value,
                Comentarios:comentarios.value,
                Descripcion:descripcion.value,
                Categoria:categoria.value,
                Estatus:estatus.value
            })
        })
        .then(response => response.json())
        .then(()=> location.reload())
        .then(data => {
            const nuevoProducto = []
            nuevoProducto.push(data)
            mostrar(nuevoProducto)
        })
        nombreProducto.classList.remove("is-valid")
        comentarios.classList.remove("is-valid")
        descripcion.classList.remove("is-valid")
        categoria.classList.remove("is-valid")
        estatus.classList.remove("is-valid")
        modalProducto.hide()
    }
        
    }
    if(opcion=='editar'){
        fetch(url+idForm, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                NombreProducto:nombreProducto.value,
                Comentarios:comentarios.value,
                Descripcion:descripcion.value,
                Categoria:categoria.value,
                Estatus:estatus.value
            })
        })
        .then(response => response.json())
        .then(()=> location.reload())
    }
    
})