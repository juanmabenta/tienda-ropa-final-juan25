// Array de productos reales del catálogo
const productos = [
  { nombre: "Pantalón", precio: 100 },
  { nombre: "Chaleco", precio: 120 },
  { nombre: "Buzo", precio: 90 },
  { nombre: "Campera Azul", precio: 180 },
  { nombre: "Camisa Blanca", precio: 140 },
  { nombre: "Jean Celeste", precio: 160 },
  { nombre: "Sweater Gris", precio: 130 },
  { nombre: "Remera Negra", precio: 80 }
];

let carrito = [];

function seleccionarProductos() {
  let seguir = true;

  while (seguir) {
    console.clear();
    console.log("📦 CATÁLOGO DE PRODUCTOS:");
    productos.forEach((p, i) => {
      console.log(`${i + 1}. ${p.nombre} — $${p.precio}`);
    });

    let opcion = prompt(
      "¿Qué producto querés comprar? (1 a " + productos.length + ")\nEscribí 'salir' para terminar."
    );

    if (!opcion || opcion.toLowerCase() === "salir") break;

    const index = parseInt(opcion) - 1;

    if (index >= 0 && index < productos.length) {
      let cantidad = parseInt(prompt(`¿Cuántos "${productos[index].nombre}" querés?`));
      if (!isNaN(cantidad) && cantidad > 0) {
        carrito.push({
          nombre: productos[index].nombre,
          precio: productos[index].precio,
          cantidad: cantidad
        });
        alert(`✔ Agregado: ${productos[index].nombre} x${cantidad}`);
      } else {
        alert("❌ Cantidad inválida.");
      }
    } else {
      alert("❌ Opción inválida.");
    }

    seguir = confirm("¿Querés agregar otro producto?");
  }
}

function mostrarResumen() {
  if (carrito.length === 0) {
    alert("No agregaste productos al carrito.");
    return;
  }

  console.log("🛒 RESUMEN DE TU COMPRA:");
  let total = 0;
  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    console.log(`- ${item.nombre} x${item.cantidad} = $${subtotal}`);
  });
  console.log(`💰 TOTAL A PAGAR: $${total}`);
  alert(`Gracias por tu compra.\nTotal: $${total}`);
}

function iniciarSimulador() {
  alert("¡Bienvenido/a a Tienda Moderna!");
  if (confirm("¿Querés iniciar el simulador de compras?")) {
    seleccionarProductos();
    mostrarResumen();
  } else {
    alert("¡Gracias por visitarnos!");
  }
}

// Espera al clic del usuario
document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("iniciarSimulador");
  if (boton) {
    boton.addEventListener("click", iniciarSimulador);
  }
});
