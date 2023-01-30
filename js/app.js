 const container = document.querySelector('.container');
 const resultado = document.querySelector('#resultado');
 const formulario = document.querySelector('#formulario');

 window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
 });

 const buscarClima = (e) => {
    e.preventDefault();

    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
       mostrarError('Ambos campos son obligatorios');

    }
    //Consultar la API
    consultarAPIGeoCode(ciudad, pais);
 }

 const mostrarError = (mensaje) => {
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        //Crear una alerta
        const alerta = document.createElement('Div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 
        'px-4', 'py-3', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        //eliminar alerta despues de 5 segundos
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
 }

 const apiId = '43f859a0420b40e1e97c2a768a5aee3b';

 const consultarAPIGeoCode = (ciudad, pais) => {

    const urlGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&appid=${apiId}`;

    fetch(urlGeo)
        .then(response => response.json())
        .then(datos => {
            consultarAPI(datos[0].lat, datos[0].lon);
        })
        .catch((error) => {
            mostrarError("Ciudad no encontrada.");
        });

 }

 const consultarAPI = (lat, lon) => {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiId}`;

    spinner();

    fetch(apiUrl)
        .then(response => response.json())
        .then(datos => {
            limpiarHTML(); //Limpiando html para busquedas anteriores

            //console.log(datos);

            //Mostrar Clima en el HTML
            mostrarClima(datos);
        });
 }

 const mostrarClima = (datos) => {
    //temp is in kelvin
    const {name, main: {temp, temp_max, temp_min}} = datos;

    const farenheit = kelvinToFarenheit(temp);
    const farenheit_max = kelvinToFarenheit(temp_max);
    const farenheit_min = kelvinToFarenheit(temp_min);

    const nombreciudad = document.createElement('p');
    nombreciudad.textContent = `El clima en ${name}`;
    nombreciudad.classList.add('font-bold', 'text-2xl');

    const actualFarenheit = document.createElement('p');
    actualFarenheit.innerHTML = `${farenheit} &#8457;`;
    actualFarenheit.classList.add('font-bold', 'text-6xl');

    const maxTemp = document.createElement('p');
    maxTemp.innerHTML = `Max: ${farenheit_max} &#8457;`;
    maxTemp.classList.add('text-xl');

    const minTemp = document.createElement('p');
    minTemp.innerHTML = `Min: ${farenheit_min} &#8457;`;
    minTemp.classList.add('text-xl');

    const resultadoDiv = document.createElement('Div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreciudad);
    resultadoDiv.appendChild(actualFarenheit);
    resultadoDiv.appendChild(maxTemp);
    resultadoDiv.appendChild(minTemp);

    resultado.appendChild(resultadoDiv);
 }

 const kelvinToCelcius = grados => parseInt(grados - 273.15);

 const kelvinToFarenheit = grados => parseInt((grados - 273.15) * 9/5) + 32;

 const limpiarHTML = () => {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
 }

 const spinner = () => {
    limpiarHTML();

    const spinner = document.createElement('Div');
    spinner.classList.add('sk-cube-grid', 'text-white');

    spinner.innerHTML = `
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>
    `;

    resultado.appendChild(spinner);
 }

