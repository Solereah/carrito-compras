//selectores
let cart;
let cartTable = document.querySelector('#cart-table tbody');
let cartProduct = document.querySelector('.btn-close');
let productos;

const listaProductos = document.querySelector('#product-list');
const searchForm = document.querySelector('.search-form');
const clearCart = document.querySelector('div .clear-btn');
const iconoCarrito = document.querySelector('#cart-icon');
const cartContainer = document.querySelector('#table-container');


//Funciones
//Filtrar por precio 
const filtrarMenorPrecio=(e)=>{
  e.preventDefault();
  let resultado = productos.sort( (a, b) =>{
if(a.price < b.price){
   return -1
}
 
})
renderProducts(resultado)
}

const filtrarMayorPrecio=(e)=>{
  e.preventDefault();
  let resultado = productos.sort( (a, b) =>{
if(a.price > b.price){
   return 1
}
 
})
renderProducts(resultado)
}

//if(a.price < b.price){
  //return resultado = -1

//if(a.title.toLowerCase() >b.title.toLowerCase()){

//}
//if(a.name.toLowerCase() < b.name.toLowerCase()){
  //return resultado = -1
//}



//display carrito
const displayCart = (e) =>{
  e.preventDefault();
  cartContainer.classList.toggle('ocultar');
}


// Vaciar Carrito
const vaciarCarrito = (e) => {

  cart = [];
  
  actualizarCartHtml();

  actualizarStorage();

}
//Borrar productos del carrito
const sacarItem= (e) => {
  
  cartProduct = e.target.dataset.id
  
  const filteredCart = cart.filter (product => product.id !== cartProduct);
   cart = [...filteredCart];

  actualizarCartHtml();

  actualizarStorage();



}

//Buscador de productos
const buscarProductos = (e) =>{
  e.preventDefault();
  const inputSearch = document.querySelector('#search').value;
  const inputFilter = inputSearch.toLowerCase().trim();
  const result = productos.filter(producto => producto.title.toLowerCase().includes(inputFilter));
  renderProducts(result);
  searchForm.reset();
}

// Agregar productos al carrito
const addToCart = (e) => {
    e.preventDefault();

  if(e.target.classList.contains('add-cart')){
      const cardProduct = e.target.parentElement.parentElement;
      
      //(productoAgregado)
      const addToCartClicked = {
        id: cardProduct.querySelector('a').dataset.id,
        img: cardProduct.querySelector('img.img-product').src,
        title: cardProduct.querySelector('.card-body h5').textContent,
        price: cardProduct.querySelector('.card-price span').textContent,
        cantidad: 1
          
      }
    const index =cart.findIndex(producto => producto.id === addToCartClicked.id);

    if(index !== -1){
        cart[index].cantidad++

    }
    
    else{
        cart.push(addToCartClicked);
    }
  

      actualizarCartHtml();
      actualizarStorage();
  };
}


const actualizarCartHtml = () => {
    cartTable.innerHTML = '';
    cart.forEach( producto =>{
        const { id, img, title, price, cantidad} = producto;
       /* const row = document.createElement('tr');

        row.innerHTML = `
        <tr> 
           
          </td>
          <img src="${img}" width="15%">
          <td>
            ${title}
          </td>

          <td>
          ${price}
          </td>

          <td>
            ${cantidad}
          </td>
        
          <td>
            <button type="button" class="btn-close" aria-label="Close" data-id="${id}"></button>
          </td>
        </tr>
`*/
const html =`

<tr> 

  <td>
    <img src="${img}" width="50%">
  </td>
  
  <td>
    ${title}
  </td>

  <td> 
  ${price}
  </td>

  <td>
  ${cantidad}
  </td>
  
  
  <td>
    <button type="button" class="btn-close" aria-label="Close" data-id="${id}"></button>
  </td>
</tr>
`
 
    $('#cart-table tbody').append(html);

        //cartTable.appendChild(row);
    });

}


const actualizarStorage = () =>{
localStorage.setItem('cart', JSON.stringify(cart))
}

const renderProducts = (productosCoffee) =>{
  listaProductos.innerHTML = '';
productosCoffee.forEach(producto =>{
    const hmtl =`
    <div class="card" style="width: 16rem;">
        <img src="${producto.img}" class="card-img-top img-product">
        <div class="card-body">
            <h5 class="card-title">${producto.title}</h5>
            <p class="card-text">Some quick example text to build on the card title.</p>
            <h6 class="card-title card-price">Price: <span>${producto.price}</span></h6>
            <a href="#" class="btn btn-primary add-cart" data-id="${producto.id}">Add to cart</a>
        </div>
    </div>
    
    `
    listaProductos.innerHTML += hmtl
});


};

function comentarioUsuarios(usuarios){
let userComent = document.querySelector('#user-coment');

usuarios.forEach(usuario =>{

  userComent.innerHTML +=`
  
  <div class="card">
  <img src="${usuario.picture.large}" class="card-img-top" alt="foto de cliente">
  <div class="card-body">
    <h5 class="card-title">${usuario.name.first} ${usuario.name.last}</h5>
    <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, hic pariatur cumque, fugiat neque.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
</div>
  
  
  `
})


}


//Listeners



document.addEventListener('DOMContentLoaded',() => {
    const cartStorage = JSON.parse(localStorage.getItem('cart'));
    cart = cartStorage || [];

      actualizarCartHtml();
    
  // renderProducts(productosCoffee);

});


$.ajax({
  url:'productos.json',
  success: function(productosJson, textStatus, xhr){
    
    productos = productosJson;
    renderProducts(productos);

  },
  error: function(xhr, textStatus, error){
   
  }


});

$.ajax({
  url: 'https://randomuser.me/api/?results=5',
  method:"GET",
  dataType: 'json',
  success: function(data){
   
    comentarioUsuarios(data.results)

  },

error: function(xhr, status, error){
 
}


});


$('.higher-price').click(filtrarMayorPrecio);
$('.lower-price').click(filtrarMenorPrecio);
$('#title-fade').fadeIn(2000);
$('#texto-fade').fadeIn(4000);
$('#product-list').click(addToCart);
$('#cart-icon').on('click', displayCart);

searchForm.addEventListener('submit', buscarProductos);
cartTable.addEventListener('click', sacarItem);
clearCart.addEventListener('click', vaciarCarrito);



//listaProductos.addEventListener('click', addToCart);
//iconoCarrito.addEventListener('click', displayCart);


