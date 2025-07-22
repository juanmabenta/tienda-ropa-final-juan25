// === Catálogo de productos con imágenes ===
const productos = [
  { nombre: "PANTALÓN", precio: 100, imagen: "../img/prenda2.jpg" },
  { nombre: "CHALECO", precio: 120, imagen: "../img/prenda1.jpg" },
  { nombre: "BUZO", precio: 90, imagen: "../img/prenda3.jpg" },
  { nombre: "CAZADORA PARCHES CAPUCHA", precio: 150, imagen: "../img/prenda4.jpg" },
  { nombre: "PANTALON FIT TACHAS", precio: 130, imagen: "../img/prenda5.jpg" },
  { nombre: "CAMISETA ESTAMPADO", precio: 60, imagen: "../img/prenda6.jpg" },
  { nombre: "GORRA LAVADA BORDADO", precio: 30, imagen: "../img/prenda7.jpg" },
  { nombre: "SUDADERA CAPUCHA", precio: 80, imagen: "../img/prenda8.jpg" },
  { nombre: "CAZADORA PLUMÍFERO", precio: 200, imagen: "../img/prenda9.jpg" }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// === Muestra el contenido del carrito ===
function mostrarCarrito() {
  const resumen = document.getElementById("resumen");
  if (!resumen) return;

  if (carrito.length === 0) {
    resumen.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  resumen.innerHTML = "<h2>🛒 Carrito de Compras</h2>";
  let total = 0;

  carrito.forEach((item, i) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const p = document.createElement("p");
    p.textContent = `${item.nombre} x${item.cantidad} = $${subtotal}`;

    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.className = "btn";
    eliminarBtn.style.marginLeft = "1rem";
    eliminarBtn.onclick = () => {
      carrito.splice(i, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    };

    p.appendChild(eliminarBtn);
    resumen.appendChild(p);
  });

  const totalP = document.createElement("p");
  totalP.innerHTML = `<strong>Total: $${total}</strong>`;
  resumen.appendChild(totalP);

  const inputNombre = document.createElement("input");
  inputNombre.type = "text";
  inputNombre.id = "nombreCliente";
  inputNombre.placeholder = "nombre";
  inputNombre.className = "cliente-input";
  inputNombre.pattern = "[A-Za-zÁÉÍÓÚáéíóúÑñ ]+";
  inputNombre.title = "Solo letras y espacios";
  resumen.appendChild(inputNombre);

  const inputNumero = document.createElement("input");
  inputNumero.type = "tel";
  inputNumero.id = "numeroCliente";
  inputNumero.placeholder = "número";
  inputNumero.className = "cliente-input";
  inputNumero.pattern = "\\d{6,}";
  inputNumero.title = "Debe contener al menos 6 números";
  resumen.appendChild(inputNumero);

  let mensajeError = document.getElementById("mensajeError");
  if (!mensajeError) {
    mensajeError = document.createElement("p");
    mensajeError.id = "mensajeError";
    mensajeError.style.color = "red";
    mensajeError.style.fontWeight = "600";
    mensajeError.style.marginTop = "0.5rem";
    resumen.appendChild(mensajeError);
  }

  const finalizarBtn = document.createElement("button");
  finalizarBtn.textContent = "Finalizar compra";
  finalizarBtn.className = "btn";
  finalizarBtn.style.marginTop = "0.5rem";
  finalizarBtn.addEventListener("click", finalizarCompra);
  resumen.appendChild(finalizarBtn);

  const btn = document.createElement("button");
  btn.textContent = "Vaciar carrito";
  btn.className = "btn";
  btn.style.marginTop = "0.5rem";
  btn.onclick = vaciarCarrito;
  resumen.appendChild(btn);
}

// === Agrega productos al carrito ===
function agregarAlCarrito(index) {
  const cantidad = parseInt(document.getElementById(`cantidad-${index}`).value);
  if (cantidad > 0) {
    const producto = productos[index];
    carrito.push({ ...producto, cantidad });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  }
}

// === Renderiza los productos en el DOM ===
function renderizarCatalogo(lista) {
  const contenedor = document.getElementById("productos");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  lista.forEach((prod, index) => {
    const div = document.createElement("div");
    div.className = "producto";

    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <p class="precio">${prod.nombre} - $${prod.precio}</p>
      <input type="number" min="1" value="1" id="cantidad-${index}">
    `;

    const boton = document.createElement("button");
    boton.textContent = "Agregar";
    boton.className = "btn";
    boton.addEventListener("click", () => agregarAlCarrito(index));
    div.appendChild(boton);

    contenedor.appendChild(div);
  });
}

// === Vaciar el carrito ===
function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();
}

// === Finalizar la compra ===
function finalizarCompra() {
  const nombre = document.getElementById("nombreCliente")?.value.trim();
  const numero = document.getElementById("numeroCliente")?.value.trim();
  const mensajeError = document.getElementById("mensajeError");

  const nombreValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nombre);
  const numeroValido = /^\d{6,}$/.test(numero);

  if (!nombreValido || !numeroValido) {
    if (mensajeError) {
      mensajeError.textContent = "⚠️ Ingresá un nombre válido (solo letras) y un número correcto (mín. 6 cifras).";
    }
    return;
  }

  if (mensajeError) mensajeError.textContent = "";

  carrito = [];
  localStorage.removeItem("carrito");

  const resumen = document.getElementById("resumen");
  resumen.innerHTML = `
    <h2>✅ Compra realizada</h2>
    <p>¡Gracias por tu compra, ${nombre}! Te contactaremos al número ${numero}.</p>
  `;

  const seguirBtn = document.createElement("button");
  seguirBtn.textContent = "Seguir comprando";
  seguirBtn.className = "btn";
  seguirBtn.style.marginTop = "1rem";
  seguirBtn.onclick = () => {
    renderizarCatalogo(productos);
    mostrarCarrito();
  };
  resumen.appendChild(seguirBtn);
}

// === Inicialización al cargar la página ===
document.addEventListener("DOMContentLoaded", () => {
  renderizarCatalogo(productos);
  mostrarCarrito();
});

// === Buscador dinámico ===
document.getElementById("busqueda")?.addEventListener("input", e => {
  const valor = e.target.value.toLowerCase();
  const resultados = productos.filter(p =>
    p.nombre.toLowerCase().includes(valor)
  );
  renderizarCatalogo(resultados);
});
