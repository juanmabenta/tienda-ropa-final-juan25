// === Catálogo de productos con imágenes ===
const productos = [
  { nombre: "PANTALÓN", precio: 100, imagen: "../img/prenda2.jpg" },
  { nombre: "CHALECO", precio: 120, imagen: "../img/prenda1.jpg" },
  { nombre: "BUZO", precio: 90, imagen: "../img/prenda3.jpg" },
  { nombre: "CAZADORA PARCHES CAPUCHA", precio: 150, imagen: "../img/prenda4.jpg" },
  { nombre: "PANTALON FIT TACHAS", precio: 130, imagen: "../img/prenda5.jpg" },
  { nombre: "CAMISETA ESTAMPADO COMBINADO", precio: 60, imagen: "../img/prenda6.jpg" },
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

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    const p = document.createElement("p");
    p.textContent = `${item.nombre} x${item.cantidad} = $${subtotal}`;
    resumen.appendChild(p);
  });

  const totalP = document.createElement("p");
  totalP.innerHTML = `<strong>Total: $${total}</strong>`;
  resumen.appendChild(totalP);

  const btn = document.createElement("button");
  btn.textContent = "Vaciar carrito";
  btn.className = "btn";
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
function mostrarCatalogo() {
  const contenedor = document.getElementById("productos");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  productos.forEach((prod, index) => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <p class="precio">${prod.nombre} - $${prod.precio}</p>
      <input type="number" min="1" value="1" id="cantidad-${index}">
      <button class="btn" onclick="agregarAlCarrito(${index})">Agregar</button>
    `;
    contenedor.appendChild(div);
  });
}

// === Vaciar el carrito ===
function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();
}

// === Inicialización al cargar la página ===
document.addEventListener("DOMContentLoaded", () => {
  mostrarCatalogo();
  mostrarCarrito();
});
