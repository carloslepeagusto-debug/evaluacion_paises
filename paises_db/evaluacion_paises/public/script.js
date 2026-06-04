const API =
'http://localhost:3000';

let offset = 0;

async function cargarPaises(){

    offset = 0;

    await mostrarPagina();

}

async function siguientePagina(){

    const limite =
    document.getElementById(
    'limite'
    ).value;

    offset =
    offset + Number(limite);

    await mostrarPagina();

}

async function mostrarPagina(){

    const limite =
    document.getElementById(
    'limite'
    ).value;

    const respuesta =
    await fetch(
    `${API}/paises?limite=${limite}&offset=${offset}`
    );

    const datos =
    await respuesta.json();

    document.getElementById(
    'resultado'
    ).textContent =
    JSON.stringify(
    datos,
    null,
    2
    );

}


async function agregarPais(){

    const body = {

        nombre:
        document.getElementById(
        'nombre'
        ).value,

        continente:
        document.getElementById(
        'continente'
        ).value,

        poblacion:
        document.getElementById(
        'poblacion'
        ).value,

        pib_2019:
        document.getElementById(
        'pib2019'
        ).value,

        pib_2020:
        document.getElementById(
        'pib2020'
        ).value

    };

    const respuesta =
    await fetch(
    `${API}/paises`,
    {
        method:'POST',

        headers:{
            'Content-Type':
            'application/json'
        },

        body:
        JSON.stringify(body)
    });

    const resultado =
    await respuesta.json();

    alert(
    resultado.mensaje
    );

}


async function eliminarPais(){

    const nombre =
    document.getElementById(
    'nombreEliminar'
    ).value;

    const respuesta =
    await fetch(
    `${API}/paises/${nombre}`,
    {
        method:'DELETE'
    });

    const resultado =
    await respuesta.json();

    alert(
    resultado.mensaje
    );

}