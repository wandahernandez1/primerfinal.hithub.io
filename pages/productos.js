"use strict"


//Informacion de variables con sus nombres, precio y stock en cada arreglo

let arrProductos = ["Dulce de leche", "Knorr", "Pasta de mani", "Cadbury", "Nescafe",
    "Nesquik", "Oreo", "Mantecol", "Sin culpa", "Alfajor pepitos"];

let arrPrecioProducto = [2240, 1960, 3740, 1750, 14975,
    5240, 3750, 550, 450, 1290]

let arrStock = [5, 3, 10, 20, 9, 6, 1, 4, 8, 7];

let arrImagenes = ["../img/producto1.webp", "../img/producto2.jpg", "../img/producto3.webp",
                  "../img/producto4.webp", "../img/producto5.jpg", "../img/producto6.jpg",
                  "../img/producto7.webp", "../img/producto8.webp", "../img/producto9.webp",
                                                                  "../img/producto10.webp"];

let carrito = [];

//Creo funcion que llena la informacion 
function crearCard(producto, precios, stock, imagenes) {
    const sectionProductos = document.getElementById('section-productos');
    sectionProductos.innerHTML = ''; //  borra cualquier contenido existente

    for (let i = 0; i < producto.length; i++) {

        //Creamos el contenedor de las card
        const containerProducto = document.createElement('div');
        containerProducto.className = 'container-producto';

        //Creo la Card
        const cardProducto = document.createElement('div');
        cardProducto.className = 'card-producto';

        // Crea imagen 
        const imgProducto = document.createElement('img');
        imgProducto.src = imagenes[i];
        imgProducto.alt = '';
        imgProducto.className = 'img-producto';
        cardProducto.appendChild(imgProducto);


        // Creo y agrego el contenedor del texto y 
        //Crea la Descripcion del Producto
        const txtProducto = document.createElement('div');
        txtProducto.className = 'txt-producto';

        const titleCard = document.createElement('h3');
        titleCard.className = 'title-card';
        titleCard.textContent = producto[i];
        txtProducto.appendChild(titleCard);

        const precioProducto = document.createElement('p');
        precioProducto.className = 'precioProducto';
        precioProducto.textContent = '$ ' + precios[i];
        txtProducto.appendChild(precioProducto);

        const stockProducto = document.createElement('p');
        stockProducto.textContent = 'Stock: ' + stock[i];
        stockProducto.id='stockProducto' + [i];
        txtProducto.appendChild(stockProducto);

        const totalSpan = document.createElement('span');
        totalSpan.id = 'total' + [i];
        txtProducto.appendChild(totalSpan);
        cardProducto.appendChild(txtProducto);

        // Crea el contenedor del input
        const inputProducto = document.createElement('div');
        inputProducto.className = 'input-producto';

        const cantidadInput = document.createElement('input');
        cantidadInput.type = 'number';
        cantidadInput.name = 'cantidad';
        cantidadInput.id = 'cantidadProducto' + [i];
        cantidadInput.min = '1';
        inputProducto.appendChild(cantidadInput);

        // crea input de agregar 

        const agregarButton = document.createElement('input');
        agregarButton.type = 'button';
        agregarButton.className = 'btn-agregar';
        agregarButton.value = 'Agregar al Carrito';
        inputProducto.appendChild(agregarButton);

        cardProducto.appendChild(inputProducto);
        containerProducto.appendChild(cardProducto);
        sectionProductos.appendChild(containerProducto);

    }

    //Creo el evento EventListener para el boton
    let sumaPrecios = 0;
    let botonAgregar= document.querySelectorAll('.btn-agregar');
    for (let i = 0; i < botonAgregar.length; i++) {
        botonAgregar[i].addEventListener('click', ()=> {
        let cantidadInput= document.getElementById('cantidadProducto' + [i])
        let cantidad = 0;

        if(cantidadInput){
            cantidad = cantidadInput.value;
        } 
        if (cantidad <= 0) {
            alert('Porfavor, ingrese una cantidad valida.');
            return;
        }
        if (cantidad <= arrStock[i]) {
            arrStock[i] -= cantidad; //Me va a disminuir el stock
            let stockProducto = document.getElementById('stockProducto' + [i]);
            if (stockProducto) {
                stockProducto.textContent= 'Stock: '+ arrStock[i];
            }
            
            let total = cantidad * arrPrecioProducto[i];
            document.getElementById('total' + [i]).textContent = 'total: $ ' + total;
            
            //llamo a la funcion agregar al carrito
            agregarAlCarrito(arrProductos[i], cantidad, total);
            alert('Producto agregado al carrito.')
        } else{
            alert('No hay suficiente stock disponible.');
        }
        sumaPrecios++; //Esto me va a incrementar el contador 
        //console.log(`Boton clickeado ${sumaPrecios}veces`);
        
    
      });  
    }
}

//Creamos una funcion para agregar al carrito los productos

function agregarAlCarrito(producto,cantidad,total) {
    carrito.push({producto,cantidad,total});
    actualizarCarrito();
}

function actualizarCarrito() {
 const carritoDiv = document.getElementById('carrito');
 carritoDiv.innerHTML = '';
 let totalCompra=0;
 for (let i = 0; i < carrito.length; i++) {
    const contenidoCarrito = carrito[i];

    const itemDiv = document.createElement('div');
    itemDiv.className='carrito-item';
    itemDiv.textContent= `${contenidoCarrito.producto} - Cantidad: ${contenidoCarrito.cantidad} - Total $ ${contenidoCarrito.total}`;
    carritoDiv.appendChild(itemDiv);

    totalCompra += contenidoCarrito.total;
 }   
 const totalDiv = document.createElement('div');
 totalDiv.className = 'total-compra';
 totalDiv.textContent= `Total de la compra: $ ${totalCompra}`;
 carritoDiv.appendChild(totalDiv);
}

// Llamada a la función para crear las tarjetas
crearCard(arrProductos, arrPrecioProducto, arrStock, arrImagenes);