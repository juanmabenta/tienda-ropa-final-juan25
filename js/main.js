let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// === Cargar productos desde JSON ===
fetch("../data/productos.json")
  .then(res => res.json())
  .then(data => {
    productos = data;
    renderizarCatalogo(productos);
    mostrarCarrito();
  })
  .catch(err => {
    console.error("Error al cargar productos:", err);
  });

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

      Toastify({
        text: "Producto eliminado del carrito",
        duration: 2000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#ff4d4f"
      }).showToast();
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
  inputNombre.placeholder = "Nombre";
  inputNombre.className = "cliente-input";
  inputNombre.pattern = "[A-Za-zÁÉÍÓÚáéíóúÑñ ]+";
  inputNombre.title = "Solo letras y espacios";
  resumen.appendChild(inputNombre);

  const inputNumero = document.createElement("input");
  inputNumero.type = "tel";
  inputNumero.id = "numeroCliente";
  inputNumero.placeholder = "Número de telefono";
  inputNumero.className = "cliente-input";
  inputNumero.pattern = "\\d{6,}";
  inputNumero.title = "Debe contener al menos 6 números";
  resumen.appendChild(inputNumero);

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

    Toastify({
      text: `${producto.nombre} agregado al carrito`,
      duration: 2000,
      gravity: "bottom",
      position: "right",
      backgroundColor: "#000"
    }).showToast();
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

  Toastify({
    text: "Carrito vaciado",
    duration: 2000,
    gravity: "bottom",
    position: "right",
    backgroundColor: "#ff4d4f"
  }).showToast();
}

// === Finalizar la compra ===
function finalizarCompra() {
  const nombre = document.getElementById("nombreCliente")?.value.trim();
  const numero = document.getElementById("numeroCliente")?.value.trim();

  const nombreValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nombre);
  const numeroValido = /^\d{6,}$/.test(numero);

  if (!nombreValido || !numeroValido) {
    Toastify({
      text: "⚠️ Ingresá un nombre válido y un número correcto",
      duration: 2500,
      gravity: "top",
      position: "center",
      backgroundColor: "#ff4d4f"
    }).showToast();
    return;
  }

  carrito = [];
  localStorage.removeItem("carrito");

  Swal.fire({
    title: '✅ Compra realizada',
    text: `¡Gracias por tu compra, ${nombre}! Te contactaremos al número ${numero}.`,
    icon: 'success',
    confirmButtonText: 'Seguir comprando',
    confirmButtonColor: '#000'
  }).then(() => {
    renderizarCatalogo(productos);
    mostrarCarrito();
  });
}


// === Buscador dinámico ===
document.getElementById("busqueda")?.addEventListener("input", e => {
  const valor = e.target.value.toLowerCase();
  const resultados = productos.filter(p =>
    p.nombre.toLowerCase().includes(valor)
  );
  renderizarCatalogo(resultados);
});
