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

const loader = document.getElementById("loader");
const backToTop = document.getElementById("backToTop");
const resultadosCount = document.getElementById("resultadosCount");
const btnExplorarNav = document.getElementById("btnExplorarNav");
const toastContainer = document.getElementById("toastContainer");

/*==========================================================
    INTERSECTION OBSERVER PARA TARJETAS
==========================================================*/
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });


/*==========================================================
    TOASTS (retroalimentación visual breve)
==========================================================*/

function mostrarToast(mensaje, tipo = "add"){
    if(!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast ${tipo === "remove" ? "toast-remove" : ""}`;
    toast.innerHTML = `<i class="fa-solid ${tipo === "remove" ? "fa-heart-crack" : "fa-heart"}"></i><span>${mensaje}</span>`;

    toastContainer.appendChild(toast);

    // Forzar reflow para que la animación de entrada se ejecute
    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 350);
    }, 2500);
}

/*==========================================================
    NORMALIZAR TEXTO (quita tildes para búsquedas)
==========================================================*/

function normalizarTexto(texto){
    return texto
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

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
    whatsapp:"593999111111"
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
    whatsapp:"593999222222"
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
    whatsapp:"593999333333"
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
    whatsapp:"593999444444"
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
    whatsapp:"593999555555"
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
    whatsapp:"593999666666"
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
    whatsapp:"593999777777"
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
    whatsapp:"593999888888"
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
    whatsapp:"593999123456"
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
    whatsapp:"593999654321"
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
    whatsapp:"593999112233"
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
    whatsapp:"593999445566"
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
    whatsapp:"593999778899"
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
    whatsapp:"593999101010"
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
    whatsapp:"593999202020"
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
    whatsapp:"593999303030"
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
    whatsapp:"593999404040"
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
    whatsapp:"593999505050"
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
    whatsapp:"593999606060"
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
    whatsapp:"593999707070"
}

];

/*==========================================================
    RENDERIZAR CATÁLOGO
==========================================================*/

function renderCatalogo(lista){

    if(resultadosCount) {
        resultadosCount.textContent = `Mostrando ${lista.length} resultado${lista.length === 1 ? "" : "s"}`;
    }

    // Vista especial cuando se muestran solo los favoritos
    catalogGrid.classList.toggle("favorites-view", mostrandoFavoritos);

    // Estado vacío elegante para "Mis Favoritos"
    if(mostrandoFavoritos && lista.length === 0){
        catalogGrid.innerHTML = `
            <div class="favorites-empty">
                <i class="fa-regular fa-heart" aria-hidden="true"></i>
                <h3>Aún no has agregado platos favoritos.</h3>
                <p>Toca el corazón 🤍 en cualquier plato para guardarlo aquí.</p>
            </div>
        `;
        return;
    }

    // Construir el HTML en un array y asignarlo una sola vez
    // (evita múltiples reflows por cada tarjeta agregada)
    const tarjetas = lista.map(item => {

        const favorito = favoritos.includes(item.id);

        return `
        <article class="food-card">

            <div class="food-image">

                <img src="${item.imagen}" alt="${item.nombre}" loading="lazy">

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
                            data-id="${item.id}"
                            aria-label="${favorito ? "Quitar de favoritos" : "Agregar a favoritos"}"
                            aria-pressed="${favorito}">

                            ${favorito ? "❤️" : "🤍"}

                        </button>

                    </div>

                </div>

            </div>

        </article>
        `;
    });

    catalogGrid.innerHTML = tarjetas.join("");

    // Observar las nuevas tarjetas insertadas para la animación
    document.querySelectorAll(".food-card").forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all 0.5s ease";
        cardObserver.observe(card);
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

    const texto = normalizarTexto(searchInput.value.trim());

    const categoria = categoryFilter.value;

    const negocio = businessFilter.value;

    const sector = sectorFilter.value;

    const precio = Number(priceFilter.value);



    let resultado = catalogo.filter(item=>{

        const coincideTexto =
            texto === "" ||
            normalizarTexto(item.nombre).includes(texto) ||
            normalizarTexto(item.categoria).includes(texto) ||
            normalizarTexto(item.restaurante).includes(texto) ||
            normalizarTexto(item.sector).includes(texto) ||
            normalizarTexto(item.descripcion).includes(texto);



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
    const plato = catalogo.find(p=>p.id===id);



    if(favoritos.includes(id)){

        favoritos = favoritos.filter(item=>item!==id);

        if(plato) mostrarToast(`"${plato.nombre}" eliminado de favoritos`, "remove");

    }

    else{

        favoritos.push(id);

        if(plato) mostrarToast(`"${plato.nombre}" agregado a favoritos`, "add");

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

    favFilterBtn.setAttribute("aria-pressed", mostrandoFavoritos);
    favFilterBtn.classList.toggle("active-fav", mostrandoFavoritos);



    if(mostrandoFavoritos){

        favFilterBtn.textContent="⭐ Ver Todo el Catálogo";

    }

    else{

        favFilterBtn.textContent="⭐ Ver Mis Favoritos";

    }



    aplicarFiltros();

    if(mostrandoFavoritos){
        document.getElementById("catalogo").scrollIntoView({behavior:"smooth"});
    }

});



/*==========================================================
    MENÚ RESPONSIVE
==========================================================*/

hamburger.addEventListener("click",()=>{

    navMenu.classList.toggle("active");

});



document.querySelectorAll(".nav-menu a")

.forEach(link=>{

    if(link.classList.contains("dropdown-toggle")) return; // El toggle abre/cierra su submenú, no debe cerrar el menú móvil

    link.addEventListener("click",()=>{

        navMenu.classList.remove("active");

    });

});



/*==========================================================
    DROPDOWNS DEL MENÚ (Platos / Negocios)
    Funciona con clic/tap en cualquier dispositivo, no solo hover
==========================================================*/

document.querySelectorAll(".dropdown-toggle").forEach(toggle=>{

    toggle.addEventListener("click",(e)=>{

        e.preventDefault();
        e.stopPropagation();

        const parentLi = toggle.closest(".dropdown");
        const yaAbierto = parentLi.classList.contains("active");

        document.querySelectorAll(".dropdown.active").forEach(d=>{
            if(d !== parentLi) d.classList.remove("active");
        });

        parentLi.classList.toggle("active", !yaAbierto);

    });

});

document.addEventListener("click",(e)=>{

    document.querySelectorAll(".dropdown.active").forEach(d=>{
        if(!d.contains(e.target)) d.classList.remove("active");
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

function cerrarModal(){

    if(!detailsModal.classList.contains("show")) return;

    detailsModal.classList.add("closing");

    setTimeout(()=>{
        detailsModal.classList.remove("show");
        detailsModal.classList.remove("closing");
    }, 250);

}

closeModalBtn.addEventListener("click", cerrarModal);



window.addEventListener("click",(e)=>{

    if(e.target===detailsModal){

        cerrarModal();

    }

});



document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        cerrarModal();

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

"_blank",
"noopener"

    );

});



/*==========================================================
    GOOGLE MAPS
==========================================================*/

// No usamos coordenadas inventadas: como muchos negocios no
// tienen geolocalización registrada, generamos una búsqueda
// de Google Maps con el nombre del restaurante + dirección +
// sector. Esto abre directamente el resultado más relevante
// y es la práctica recomendada cuando no hay lat/lng reales.
btnMaps.addEventListener("click",()=>{

    if(!elementoSeleccionado) return;

    const consulta = `${elementoSeleccionado.restaurante}, ${elementoSeleccionado.direccion}, ${elementoSeleccionado.sector}, Esmeraldas, Ecuador`;

    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consulta)}`;

    window.open(url, "_blank", "noopener");

});
/*==========================================================
    FORMULARIO DE CONTACTO
==========================================================*/

function mostrarErrorCampo(campo, mensaje){
    campo.style.borderColor = "#e53935";
    formFeedback.textContent = mensaje;
    formFeedback.style.color = "#e53935";
    campo.focus();
}

function limpiarErrorCampo(campo){
    campo.style.borderColor = "";
}

reservationForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const campoNombre = document.getElementById("clientName");
    const campoEmail = document.getElementById("clientEmail");
    const campoTelefono = document.getElementById("clientPhone");
    const campoMensaje = document.getElementById("clientMessage");

    [campoNombre, campoEmail, campoTelefono, campoMensaje].forEach(limpiarErrorCampo);

    const nombre = campoNombre.value.trim();
    const email = campoEmail.value.trim();
    const telefono = campoTelefono.value.trim();
    const mensaje = campoMensaje.value.trim();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Acepta números, espacios, guiones, paréntesis y un + inicial opcional
    const regexTelefono = /^\+?[\d\s-()]{7,15}$/;

    if(nombre === "" || nombre.length < 3){
        mostrarErrorCampo(campoNombre, "Por favor ingresa tu nombre completo (mínimo 3 caracteres).");
        return;
    }

    if(email === "" || !regexEmail.test(email)){
        mostrarErrorCampo(campoEmail, "Por favor ingresa un correo electrónico válido.");
        return;
    }

    if(telefono === "" || !regexTelefono.test(telefono)){
        mostrarErrorCampo(campoTelefono, "Por favor ingresa un número telefónico válido (mínimo 7 dígitos).");
        return;
    }

    if(mensaje === "" || mensaje.length < 10){
        mostrarErrorCampo(campoMensaje, "Tu mensaje debe tener al menos 10 caracteres.");
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
    ANIMACIÓN DE TARJETAS (Eliminado el antiguo método)
==========================================================*/
// Se utiliza IntersectionObserver directamente en renderCatalogo.



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

/*==========================================================
    LOADER Y VOLVER ARRIBA
==========================================================*/
window.addEventListener("load", () => {
    setTimeout(() => {
        if(loader) loader.classList.add("hidden");
    }, 1500); // 1.5s loader duration
});

window.addEventListener("scroll", () => {
    // Volver arriba
    if(backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }

    // Active link
    let current = "";
    const sections = document.querySelectorAll("section, .hero");
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });
    
    document.querySelectorAll(".nav-menu a:not(.nav-filter)").forEach(link => {
        link.classList.remove("active-link");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active-link");
        }
    });
});

if(backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

if(btnExplorarNav) {
    btnExplorarNav.addEventListener("click", () => {
        const cat = document.getElementById("catalogo");
        if(cat) cat.scrollIntoView({behavior: "smooth"});
    });
}

// Filtros desde el Navbar
document.querySelectorAll(".nav-filter").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const type = e.target.dataset.type;
        const value = e.target.dataset.value;
        if(type === 'category' && categoryFilter) categoryFilter.value = value;
        if(type === 'business' && businessFilter) businessFilter.value = value;

        const dropdownAbierto = link.closest(".dropdown");
        if(dropdownAbierto) dropdownAbierto.classList.remove("active");

        if(type === 'favorites' && favFilterBtn){
            if(!mostrandoFavoritos){
                favFilterBtn.click();
            } else {
                document.getElementById("catalogo").scrollIntoView({behavior:"smooth"});
            }
            return;
        }
        aplicarFiltros();
        document.getElementById("catalogo").scrollIntoView({behavior:"smooth"});
    });
});