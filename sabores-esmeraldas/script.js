/*==========================================================
    SABORES DE ESMERALDAS
    SCRIPT.JS
==========================================================*/

/*==========================================================
    ELEMENTOS DEL DOM
==========================================================*/

const catalogGrid = document.getElementById("catalogGrid");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const businessFilter = document.getElementById("businessFilter");
const sectorFilter = document.getElementById("sectorFilter");
const priceFilter = document.getElementById("priceFilter");
const priceValue = document.getElementById("priceValue");

const darkModeToggle = document.getElementById("darkModeToggle");

const detailsModal = document.getElementById("detailsModal");
const closeModalBtn = document.getElementById("closeModalBtn");

const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalRestaurant = document.getElementById("modalRestaurant");
const modalAddress = document.getElementById("modalAddress");
const modalHours = document.getElementById("modalHours");
const modalPrice = document.getElementById("modalPrice");

const btnWhatsapp = document.getElementById("btnWhatsapp");
const btnMaps = document.getElementById("btnMaps");

const reservationForm = document.getElementById("reservationForm");
const formFeedback = document.getElementById("formFeedback");

const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

const favFilterBtn = document.getElementById("favFilterBtn");


/*==========================================================
    ESTADO DE LA APLICACIÓN
==========================================================*/

let favoritos =
JSON.parse(localStorage.getItem("favoritos")) || [];

let mostrandoFavoritos = false;

let elementoSeleccionado = null;


/*==========================================================
    BASE DE DATOS
==========================================================*/

const catalogo = [

{
    id:1,
    nombre:"Encocado de Camarón",
    categoria:"Mariscos",
    negocio:"Restaurante",
    sector:"Las Palmas",
    restaurante:"Mar y Coco",
    direccion:"Av. Kennedy y Malecón",
    horario:"09:00 - 21:00",
    precio:12.50,
    descripcion:"Preparado con camarón fresco, leche de coco y chillangua. Uno de los platos más representativos de Esmeraldas.",
    imagen:"img/platos/encocado-camaron.jpg",
    whatsapp:"593999111111",
    maps:"https://maps.google.com"
},

{
    id:2,
    nombre:"Encocado de Pescado",
    categoria:"Pescados",
    negocio:"Restaurante",
    sector:"Centro",
    restaurante:"El Nuevo Río",
    direccion:"Av. Libertad",
    horario:"08:00 - 20:00",
    precio:11.00,
    descripcion:"Pescado fresco cocinado lentamente con leche de coco y especias tradicionales.",
    imagen:"img/platos/encocado-pescado.jpg",
    whatsapp:"593999222222",
    maps:"https://maps.google.com"
},

{
    id:3,
    nombre:"Tapao Esmeraldeño",
    categoria:"Comida tradicional",
    negocio:"Restaurante",
    sector:"Atacames",
    restaurante:"Costa Azul",
    direccion:"Malecón de Atacames",
    horario:"09:00 - 22:00",
    precio:13.00,
    descripcion:"Plato típico preparado con pescado, verde, yuca y leche de coco.",
    imagen:"img/platos/tapao.jpg",
    whatsapp:"593999333333",
    maps:"https://maps.google.com"
},

{
    id:4,
    nombre:"Ceviche de Concha",
    categoria:"Encurtidos y ceviches",
    negocio:"Emprendimiento",
    sector:"Sua",
    restaurante:"Conchas Doña Rosa",
    direccion:"Malecón de Sua",
    horario:"10:00 - 18:00",
    precio:8.00,
    descripcion:"Conchas frescas marinadas en limón con cebolla y especias.",
    imagen:"img/platos/ceviche-concha.jpg",
    whatsapp:"593999444444",
    maps:"https://maps.google.com"
},

{
    id:5,
    nombre:"Arroz Marinero",
    categoria:"Mariscos",
    negocio:"Restaurante",
    sector:"Las Palmas",
    restaurante:"La Barca",
    direccion:"Av. del Pacífico",
    horario:"11:00 - 22:00",
    precio:15.00,
    descripcion:"Arroz acompañado de camarón, calamar, pescado y conchas.",
    imagen:"img/platos/arroz-marinero.jpg",
    whatsapp:"593999555555",
    maps:"https://maps.google.com"
},

{
    id:6,
    nombre:"Corviche",
    categoria:"Comida tradicional",
    negocio:"Emprendimiento",
    sector:"Tachina",
    restaurante:"Corviches El Negro",
    direccion:"Barrio Central",
    horario:"07:00 - 16:00",
    precio:1.25,
    descripcion:"Masa de verde rellena de pescado y frita hasta quedar dorada.",
    imagen:"img/platos/corviche.jpg",
    whatsapp:"593999666666",
    maps:"https://maps.google.com"
},
{
    id:7,
    nombre:"Ensumacao",
    categoria:"Comida tradicional",
    negocio:"Restaurante",
    sector:"Centro",
    restaurante:"Sabores del Manglar",
    direccion:"Av. Simón Bolívar",
    horario:"08:00 - 20:00",
    precio:11.50,
    descripcion:"Delicioso caldo tradicional preparado con pescado, verde, yuca y leche de coco.",
    imagen:"img/platos/ensumacao.jpg",
    whatsapp:"593999777777",
    maps:"https://maps.google.com"
},

{
    id:8,
    nombre:"Ceviche de Camarón",
    categoria:"Encurtidos y ceviches",
    negocio:"Restaurante",
    sector:"Las Palmas",
    restaurante:"La Casa del Ceviche",
    direccion:"Malecón Las Palmas",
    horario:"10:00 - 21:00",
    precio:9.50,
    descripcion:"Camarón fresco marinado en limón con cebolla, tomate y cilantro.",
    imagen:"img/platos/ceviche-camaron.jpg",
    whatsapp:"593999888888",
    maps:"https://maps.google.com"
},

{
    id:9,
    nombre:"Ceviche Mixto",
    categoria:"Encurtidos y ceviches",
    negocio:"Restaurante",
    sector:"Atacames",
    restaurante:"Costa Pacífica",
    direccion:"Malecón de Atacames",
    horario:"09:00 - 22:00",
    precio:12.00,
    descripcion:"Mezcla de camarón, pescado y concha en una receta tradicional.",
    imagen:"img/platos/ceviche-mixto.jpg",
    whatsapp:"593999123456",
    maps:"https://maps.google.com"
},

{
    id:10,
    nombre:"Bolón de Verde",
    categoria:"Comida tradicional",
    negocio:"Emprendimiento",
    sector:"Centro",
    restaurante:"Bolones Mary",
    direccion:"Centro de Esmeraldas",
    horario:"06:00 - 11:30",
    precio:4.00,
    descripcion:"Bolón de verde con queso y chicharrón preparado al momento.",
    imagen:"img/platos/bolon.jpg",
    whatsapp:"593999654321",
    maps:"https://maps.google.com"
},

{
    id:11,
    nombre:"Empanada de Verde",
    categoria:"Comida tradicional",
    negocio:"Emprendimiento",
    sector:"Tachina",
    restaurante:"Doña Lupita",
    direccion:"Barrio Central",
    horario:"07:00 - 18:00",
    precio:0.50,
    descripcion:"Empanada rellena de queso y carne preparada con masa de verde.",
    imagen:"img/platos/empanada-verde.jpg",
    whatsapp:"593999112233",
    maps:"https://maps.google.com"
},

{
    id:12,
    nombre:"Cocada",
    categoria:"Dulces y bebidas",
    negocio:"Emprendimiento",
    sector:"Sua",
    restaurante:"Dulces del Pacífico",
    direccion:"Malecón de Sua",
    horario:"09:00 - 19:00",
    precio:1.50,
    descripcion:"Tradicional dulce artesanal elaborado con coco rallado y panela.",
    imagen:"img/platos/cocada.jpg",
    whatsapp:"593999445566",
    maps:"https://maps.google.com"
},

{
    id:13,
    nombre:"Jugo de Coco",
    categoria:"Dulces y bebidas",
    negocio:"Emprendimiento",
    sector:"Las Palmas",
    restaurante:"Refrescos Tropicales",
    direccion:"Av. del Pacífico",
    horario:"09:00 - 18:00",
    precio:3.00,
    descripcion:"Bebida natural preparada con coco fresco y hielo.",
    imagen:"img/platos/jugo-coco.jpg",
    whatsapp:"593999778899",
    maps:"https://maps.google.com"
},
{
    id:14,
    nombre:"Encocado de Langostino",
    categoria:"Mariscos",
    negocio:"Restaurante",
    sector:"Atacames",
    restaurante:"Mariscos Don Pepe",
    direccion:"Malecón de Atacames",
    horario:"09:00 - 22:00",
    precio:18.00,
    descripcion:"Langostinos frescos cocinados en una cremosa salsa de coco con especias tradicionales.",
    imagen:"img/platos/encocado-langostino.jpg",
    whatsapp:"593999101010",
    maps:"https://maps.google.com"
},

{
    id:15,
    nombre:"Cazuela de Mariscos",
    categoria:"Mariscos",
    negocio:"Restaurante",
    sector:"Centro",
    restaurante:"La Casa del Encocado",
    direccion:"Av. Olmedo",
    horario:"11:00 - 21:00",
    precio:16.50,
    descripcion:"Cazuela preparada con camarón, pescado, calamar y una deliciosa base de coco.",
    imagen:"img/platos/cazuela-mariscos.jpg",
    whatsapp:"593999202020",
    maps:"https://maps.google.com"
},

{
    id:16,
    nombre:"Pescado Frito",
    categoria:"Pescados",
    negocio:"Restaurante",
    sector:"Sua",
    restaurante:"El Pescador",
    direccion:"Malecón de Sua",
    horario:"10:00 - 20:00",
    precio:5.00,
    descripcion:"Pescado fresco acompañado de arroz, patacones y ensalada.",
    imagen:"img/platos/pescado-frito.jpg",
    whatsapp:"593999303030",
    maps:"https://maps.google.com"
},

{
    id:17,
    nombre:"Camarones Apanados",
    categoria:"Mariscos",
    negocio:"Restaurante",
    sector:"Las Palmas",
    restaurante:"Costa Dorada",
    direccion:"Av. del Pacífico",
    horario:"11:00 - 22:00",
    precio:7.00,
    descripcion:"Camarones empanizados y fritos, acompañados de papas y ensalada.",
    imagen:"img/platos/camarones-apanados.jpg",
    whatsapp:"593999404040",
    maps:"https://maps.google.com"
},

{
    id:18,
    nombre:"Dulce de Papaya",
    categoria:"Dulces y bebidas",
    negocio:"Emprendimiento",
    sector:"Tachina",
    restaurante:"Dulces Caseros Anita",
    direccion:"Barrio Central",
    horario:"08:00 - 18:00",
    precio:2.50,
    descripcion:"Postre artesanal elaborado con papaya verde y panela.",
    imagen:"img/platos/dulce-papaya.jpg",
    whatsapp:"593999505050",
    maps:"https://maps.google.com"
},

{
    id:19,
    nombre:"Empanada de Camarón",
    categoria:"Comida tradicional",
    negocio:"Emprendimiento",
    sector:"Centro",
    restaurante:"Sabores de Mi Tierra",
    direccion:"Mercado Central",
    horario:"07:00 - 17:00",
    precio:1.50,
    descripcion:"Empanada de verde rellena con camarón fresco y queso.",
    imagen:"img/platos/empanada-camaron.jpg",
    whatsapp:"593999606060",
    maps:"https://maps.google.com"
},

{
    id:20,
    nombre:"Bollo de Pescado",
    categoria:"Comida tradicional",
    negocio:"Emprendimiento",
    sector:"Las Palmas",
    restaurante:"El Rincón Costeño",
    direccion:"Av. Libertad",
    horario:"08:00 - 16:00",
    precio:2.50,
    descripcion:"Bollo tradicional preparado con verde, pescado y condimentos típicos de Esmeraldas.",
    imagen:"img/platos/bollo-pescado.jpg",
    whatsapp:"593999707070",
    maps:"https://maps.google.com"
}

];

/*==========================================================
    RENDERIZAR CATÁLOGO
==========================================================*/

function renderCatalogo(lista){

    catalogGrid.innerHTML = "";

    lista.forEach(item=>{

        const favorito = favoritos.includes(item.id);

        catalogGrid.innerHTML += `

        <article class="food-card">

            <div class="food-image">

                <img src="${item.imagen}" alt="${item.nombre}">

            </div>

            <div class="food-content">

                <span class="badge">${item.categoria}</span>

                <h3>${item.nombre}</h3>

                <p>${item.descripcion}</p>

                <div class="food-footer">

                    <span class="food-price">

                        $${item.precio.toFixed(2)}

                    </span>

                    <div class="food-actions">

                        <button
                            class="details-btn"
                            data-id="${item.id}">

                            Ver más

                        </button>

                        <button
                            class="favorite-btn"
                            data-id="${item.id}">

                            ${favorito ? "❤️" : "🤍"}

                        </button>

                    </div>

                </div>

            </div>

        </article>

        `;

    });

}


/*==========================================================
    INICIO
==========================================================*/

priceValue.textContent =
`$${Number(priceFilter.value).toFixed(2)}`;

renderCatalogo(catalogo);
/*==========================================================
    BUSCADOR Y FILTROS
==========================================================*/

function aplicarFiltros(){

    const texto = searchInput.value.toLowerCase().trim();

    const categoria = categoryFilter.value;

    const negocio = businessFilter.value;

    const sector = sectorFilter.value;

    const precio = Number(priceFilter.value);



    let resultado = catalogo.filter(item=>{

        const coincideTexto =

            item.nombre.toLowerCase().includes(texto) ||

            item.restaurante.toLowerCase().includes(texto);



        const coincideCategoria =

            categoria==="all" ||

            item.categoria===categoria;



        const coincideNegocio =

            negocio==="all" ||

            item.negocio===negocio;



        const coincideSector =

            sector==="all" ||

            item.sector===sector;



        const coincidePrecio =

            item.precio<=precio;



        return(

            coincideTexto &&

            coincideCategoria &&

            coincideNegocio &&

            coincideSector &&

            coincidePrecio

        );

    });



    if(mostrandoFavoritos){

        resultado = resultado.filter(item=>

            favoritos.includes(item.id)

        );

    }



    renderCatalogo(resultado);

}



/*==========================================================
    EVENTOS DE FILTROS
==========================================================*/

searchInput.addEventListener("input",aplicarFiltros);

categoryFilter.addEventListener("change",aplicarFiltros);

businessFilter.addEventListener("change",aplicarFiltros);

sectorFilter.addEventListener("change",aplicarFiltros);



priceFilter.addEventListener("input",()=>{

    priceValue.textContent =

    `$${Number(priceFilter.value).toFixed(2)}`;

    aplicarFiltros();

});



/*==========================================================
    FAVORITOS
==========================================================*/

document.addEventListener("click",(e)=>{

    if(!e.target.classList.contains("favorite-btn")) return;

    const id = Number(e.target.dataset.id);



    if(favoritos.includes(id)){

        favoritos = favoritos.filter(item=>item!==id);

    }

    else{

        favoritos.push(id);

    }



    localStorage.setItem(

        "favoritos",

        JSON.stringify(favoritos)

    );



    aplicarFiltros();

});



/*==========================================================
    BOTÓN FAVORITOS
==========================================================*/

favFilterBtn.addEventListener("click",()=>{

    mostrandoFavoritos = !mostrandoFavoritos;



    if(mostrandoFavoritos){

        favFilterBtn.textContent="❤ Mostrar Todo";

    }

    else{

        favFilterBtn.textContent="❤ Mostrar Favoritos";

    }



    aplicarFiltros();

});



/*==========================================================
    MENÚ RESPONSIVE
==========================================================*/

hamburger.addEventListener("click",()=>{

    navMenu.classList.toggle("active");

});



document.querySelectorAll(".nav-menu a")

.forEach(link=>{

    link.addEventListener("click",()=>{

        navMenu.classList.remove("active");

    });

});



/*==========================================================
    MODO OSCURO
==========================================================*/

if(localStorage.getItem("modoOscuro")==="true"){

    document.body.classList.add("dark-mode");

}



darkModeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");



    localStorage.setItem(

        "modoOscuro",

        document.body.classList.contains("dark-mode")

    );

});
/*==========================================================
    MODAL
==========================================================*/

document.addEventListener("click",(e)=>{

    /*----------------------------
        BOTÓN VER MÁS
    ----------------------------*/

    if(e.target.classList.contains("details-btn")){

        const id =
        Number(e.target.dataset.id);

        elementoSeleccionado =

        catalogo.find(item=>item.id===id);

        if(!elementoSeleccionado) return;



        modalImage.src =
        elementoSeleccionado.imagen;

        modalImage.alt =
        elementoSeleccionado.nombre;



        modalCategory.textContent =
        elementoSeleccionado.categoria;

        modalTitle.textContent =
        elementoSeleccionado.nombre;

        modalDescription.textContent =
        elementoSeleccionado.descripcion;

        modalRestaurant.textContent =
        elementoSeleccionado.restaurante;

        modalAddress.textContent =
        elementoSeleccionado.direccion;

        modalHours.textContent =
        elementoSeleccionado.horario;

        modalPrice.textContent =
        "$"+elementoSeleccionado.precio.toFixed(2);



        detailsModal.classList.add("show");

    }

});



/*==========================================================
    CERRAR MODAL
==========================================================*/

closeModalBtn.addEventListener("click",()=>{

    detailsModal.classList.remove("show");

});



window.addEventListener("click",(e)=>{

    if(e.target===detailsModal){

        detailsModal.classList.remove("show");

    }

});



document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        detailsModal.classList.remove("show");

    }

});



/*==========================================================
    WHATSAPP
==========================================================*/

btnWhatsapp.addEventListener("click",()=>{

    if(!elementoSeleccionado) return;



    const mensaje =

`Hola, estoy interesado en el plato "${elementoSeleccionado.nombre}". ¿Podrían brindarme más información?`;



    window.open(

`https://wa.me/${elementoSeleccionado.whatsapp}?text=${encodeURIComponent(mensaje)}`,

"_blank"

    );

});



/*==========================================================
    GOOGLE MAPS
==========================================================*/

btnMaps.addEventListener("click",()=>{

    if(!elementoSeleccionado) return;

    window.open(

        elementoSeleccionado.maps,

        "_blank"

    );

});
/*==========================================================
    FORMULARIO DE CONTACTO
==========================================================*/

reservationForm.addEventListener("submit",(e)=>{

    e.preventDefault();


    const nombre =
    document.getElementById("clientName").value;


    const telefono =
    document.getElementById("clientPhone").value;


    const mensaje =
    document.getElementById("clientMessage").value;



    if(nombre.trim()==="" ||
       telefono.trim()==="" ||
       mensaje.trim()===""){


        formFeedback.textContent =
        "Por favor completa todos los campos.";

        formFeedback.style.color="red";

        return;

    }



    formFeedback.textContent =
    "✅ Mensaje enviado correctamente. Nos pondremos en contacto contigo.";

    formFeedback.style.color="#00796B";



    reservationForm.reset();



    setTimeout(()=>{

        formFeedback.textContent="";

    },5000);


});



/*==========================================================
    HEADER AL HACER SCROLL
==========================================================*/


const header =
document.querySelector(".header");


window.addEventListener("scroll",()=>{


    if(window.scrollY > 50){


        header.classList.add("scrolled");


    }

    else{


        header.classList.remove("scrolled");


    }


});



/*==========================================================
    CERRAR MENÚ AL HACER CLICK FUERA
==========================================================*/


document.addEventListener("click",(e)=>{


    const clickDentroMenu =

    navMenu.contains(e.target);



    const clickBoton =

    hamburger.contains(e.target);



    if(!clickDentroMenu && !clickBoton){


        navMenu.classList.remove("active");


    }


});



/*==========================================================
    ANIMACIÓN DE TARJETAS
==========================================================*/


function animarTarjetas(){


    const tarjetas =

    document.querySelectorAll(".food-card");



    tarjetas.forEach((tarjeta,index)=>{


        tarjeta.style.opacity="0";

        tarjeta.style.transform=
        "translateY(30px)";



        setTimeout(()=>{


            tarjeta.style.transition=
            "all .5s ease";


            tarjeta.style.opacity="1";


            tarjeta.style.transform=
            "translateY(0)";


        },index*100);



    });


}



/*
    Reemplazamos renderCatalogo
    para ejecutar animaciones
*/


const renderOriginal = renderCatalogo;



renderCatalogo = function(lista){


    renderOriginal(lista);


    animarTarjetas();


};



/*==========================================================
    PROTECCIÓN DE IMÁGENES
==========================================================*/


document.addEventListener("error",(e)=>{


    if(e.target.tagName==="IMG"){


        e.target.src =
        "img/logo.png";


    }


},true);



/*==========================================================
    SCROLL SUAVE PARA ENLACES
==========================================================*/


document.querySelectorAll('a[href^="#"]')

.forEach(enlace=>{


    enlace.addEventListener("click",(e)=>{


        const destino =

        document.querySelector(
            enlace.getAttribute("href")
        );



        if(destino){


            e.preventDefault();


            destino.scrollIntoView({

                behavior:"smooth"

            });


        }


    });


});