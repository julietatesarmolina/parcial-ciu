const listaProductos = document.getElementById('productos');
const filtro = document.getElementById('filtro');
const btnAgregar = document.getElementById('btnAgregar');
const btnGuardar = document.getElementById('btnGuardarNuevo');
const seccionAgregar = document.getElementById('seccionAgregar');
const contador = document.getElementById('contadorSeleccionados');
const nombreInput = document.getElementById('nuevoNombre');
const precioInput = document.getElementById('nuevoPrecio');
const recomendaciones = document.getElementById('recomendaciones');
let productos = [];
let ultId = 0;

function cargarProductosJson() {
  fetch('productos.json')
    .then(res => res.json())
    .then(data => {
      productos = data;
      ultId = max(productos.map(p => p.id), 0);
      mostrarProductos();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function mostrarProductos() {
  listaProductos.innerHTML = ''; 
  productos.forEach(producto => {
    const li = document.createElement('li');
    li.dataset.id = producto.id;
    li.innerHTML = `
      <input type="checkbox" class="check">
      <span>${producto.nombre} - $${producto.precio}</span>
      <button class="quitar">Quitar</button>
      <button class="modificar">Modificar</button>
    `;
    listaProductos.appendChild(li);
  });
  actualizarContador();
}

filtro.addEventListener('input', () => {
  const texto = filtro.value.toLowerCase();
  document.querySelectorAll('#productos li').forEach(li => {
    const nombre = li.querySelector('span').textContent.toLowerCase();
    li.style.display = nombre.includes(texto) ? '' : 'none';
  });
});


btnAgregar.addEventListener('click', () => {
  seccionAgregar.style.display = 'block';
});

btnGuardar.addEventListener('click', () => {
  const nombre = nombreInput.value;
  const precio = parseFloat(precioInput.value);

  if (!nombre || isNaN(precio)) {
    alert("Ingrese datos válidos");
    return;
  }
  ultId+=1;
  const nuevoProducto = { 
    id: ultId, 
    nombre, 
    precio 
    };
  
    productos.push(nuevoProducto);
  nombreInput.value = '';
  precioInput.value = '';

  seccionAgregar.style.display = 'none';
  mostrarProductos(); 

});



listaProductos.addEventListener('click', e => {
  const li = e.target.closest('li');
  const id = parseInt(li.dataset.id);

  if (e.target.classList.contains('quitar')) {
    productos = productos.filter(producto => producto.id !== id);
    mostrarProductos();
  }

  if (e.target.classList.contains('modificar')) {
    const producto = productos.find(p => p.id === id);
    const nuevoPrecio = parseFloat(prompt("Nuevo precio:", producto.precio));
    
    if (!isNaN(nuevoPrecio)) {
      producto.precio = nuevoPrecio;
      mostrarProductos();
    }
    
  }

  actualizarContador();
});


function actualizarContador() {
  const productosSeleccionados = document.querySelectorAll('.check:checked').length;
  contador.textContent = productosSeleccionados;
}


listaProductos.addEventListener('mouseover', e => {
  const li = e.target.closest('li');
  if (li) li.style.backgroundColor = '#f5f5dc';
});


listaProductos.addEventListener('mouseout', e => {
  const li = e.target.closest('li');
  if (li) li.style.backgroundColor = '';
});


window.addEventListener('load', () => {
  cargarProductosJson();

  setTimeout(() => {
    recomendaciones.innerHTML = `
      <h3>Recomendaciones del día</h3>
      <p>Proba nuestro Flat White con medialunas!</p>
    `;
  }, 2000);
});





