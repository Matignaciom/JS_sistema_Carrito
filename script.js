document.addEventListener('DOMContentLoaded', () => {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const productList = document.getElementById('product-list');
  const buyButton = document.getElementById('buy-btn');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  actualizarCarrito();

  productList.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('add-to-cart')) {
      const producto = evento.target.parentElement;
      const idProducto = producto.dataset.id;
      const precioProducto = parseFloat(producto.dataset.price);

      const itemExistente = cart.find(item => item.id === idProducto);
      if (itemExistente) {
        itemExistente.cantidad += 1;
      } else {
        cart.push({ id: idProducto, precio: precioProducto, cantidad: 1 });
      }

      actualizarCarrito();
    }
  });

  cartItems.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('remove')) {
      const idItem = evento.target.parentElement.dataset.id;
      const cantidadEliminar = parseInt(prompt('Ingrese la cantidad a eliminar:', '1'));

      if (!isNaN(cantidadEliminar) && cantidadEliminar > 0) {
        const item = cart.find(item => item.id === idItem);
        if (item) {
          if (cantidadEliminar >= item.cantidad) {
            cart = cart.filter(item => item.id !== idItem);
          } else {
            item.cantidad -= cantidadEliminar;
          }

          actualizarCarrito();
        }
      }
    }
  });

  buyButton.addEventListener('click', () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Compra realizada. Los productos se han guardado en el carrito.');
    cart = [];
    actualizarCarrito();
  });

  function actualizarCarrito() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('cart-item');
      li.dataset.id = item.id;
      li.innerHTML = `${item.cantidad}x Producto ${item.id} - $${item.precio * item.cantidad} <button class="remove btn btn-danger">Eliminar</button>`;
      cartItems.appendChild(li);
      total += item.precio * item.cantidad;
    });

    cartTotal.textContent = total.toFixed(2);
  }
});
