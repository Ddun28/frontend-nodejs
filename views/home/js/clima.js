//selectores
const formulario = document.querySelector('#formulario');
const contenedor = document.querySelector('.container');
const resultado = document.querySelector('#resultado');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e) {
    e.preventDefault();
    //console.log('ingreso a la funcion')
    const pais = document.querySelector('#pais').value;
    const ciudad = document.querySelector('#ciudad').value;

    //console.log(pais, ciudad)
    //validar campos
    if (ciudad === '' || pais === '') {
        // console.log('campos vacios')
        mostrarError('Todos los campos estan vacios')
    } else {
        // console.log('campos llenos')
        consultarAPI(ciudad, pais);
    }
}

function consultarAPI(ciudad, pais) {
    const appid = '5ae7f8c5fe94f571f6bce920e8484a55';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`

    fetch(url)
        .then(respuesta => {
            //console.log(respuesta)
            return respuesta.json();
        })
        .then(datos => {
            // console.log(datos)

            if (datos.cod === '404') {
                mostrarError('La ciudad no ha sido encontrada, ingrese una ciudad valida')
            } else {
                mostrarClima(datos)
            }
        })
        .catch(error => {
            console.log(error)
        })
}

function mostrarClima(datos) {
    //console.log('ingrese a la funcion')
    const { name, main: { temp, temp_max, temp_min } } = datos;

    //console.log(name, temp, temp_min, temp_max)
    const tempA = kelvinCent(temp)
    const min = kelvinCent(temp_min)
    const max = kelvinCent(temp_max)

    //console.log(tempA, min, max)
    //mostrar los resultados
    const nombreCiudad = document.createElement('p');
    const tempActual = document.createElement('p');
    const tempMinima = document.createElement('p');
    const tempMaxima = document.createElement('p');

    nombreCiudad.innerHTML = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    tempActual.innerHTML = `${tempA} &#8451`;
    tempActual.classList.add('font-bold', 'text-2xl')

    tempMinima.innerHTML = `Min: ${min} &#8451`;
    tempMinima.classList.add('font-bold', 'text-2xl')

    tempMaxima.innerHTML = `Max: ${min} &#8451`;
    tempMaxima.classList.add('font-bold', 'text-2xl')


    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(tempActual);
    resultadoDiv.appendChild(tempMinima);
    resultadoDiv.appendChild(tempMaxima);
    resultado.appendChild((resultadoDiv));
}

function kelvinCent(grados) {
    return parseInt(grados - 273.15)
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');
    console.log(!alerta);
    if (!alerta) {
        const alertaMsj = document.createElement('div');
        alertaMsj.classList.add('bg-red-200', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'text-center', 'max-w-md', 'mx-auto', 'mt-6')
        alertaMsj.innerHTML = `
        <strong>Error!</strong><br><span>${mensaje}</span>
        `
        contenedor.appendChild(alertaMsj);

        setTimeout(() => {
            alertaMsj.remove();
        }, 3000)
    }
}