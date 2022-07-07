const busqueda = document.querySelector('#buscador'); 
busqueda.addEventListener('change', cargarPoquemones); 

const pokemonImagen = document.querySelector('.imagen img'); 
const pokemonNombre = document.querySelector('.informacion h1'); 
const pokemonDescripcion = document.querySelectorAll('.informacion p'); 
const pokemonTipo = document.querySelector('.informacion__tipos'); 
const habilidadNombre = document.querySelector('.habilidad p'); 
const locacionNombre = document.querySelector('.locacion p'); 
const pokemonEstadistica = document.querySelectorAll('.estadisticas__texto p'); 
const pokemonEstadisticaDatos = document.querySelectorAll('.estadisticas__datos p'); 


async function cargarPoquemones(e){
    const resultados = await Promise.all([obtenerPoquemon(e),obtenerDescripcion(e)]);

    const {sprites, name, height, weight, types, abilities, stats} = resultados[0]
    const{flavor_text_entries} = resultados[1]

    pokemonImagen.src = sprites.front_default;
    pokemonNombre.textContent = `#001 ${name}`
    pokemonDescripcion[0].textContent = `${height}m,` 
    pokemonDescripcion[1].textContent = `${weight}kg`
    flavor_text_entries.some(flavor_text_entries => {
        if(flavor_text_entries.language.url == 'https://pokeapi.co/api/v2/language/7/'){
            pokemonDescripcion[2].textContent = flavor_text_entries.flavor_text;
        }
    });

    CrearTypes(types)

    habilidadNombre.textContent = abilities[1].ability.name;
    locacionNombre.textContent = abilities[1].ability.name

    pokemonEstadistica[0].textContent = stats[0].stat.name
    pokemonEstadistica[1].textContent = stats[1].stat.name
    pokemonEstadistica[2].textContent = stats[2].stat.name
    pokemonEstadistica[3].textContent = stats[3].stat.name
    pokemonEstadistica[4].textContent = stats[4].stat.name
    pokemonEstadistica[5].textContent = stats[5].stat.name

    pokemonEstadisticaDatos[0].textContent = stats[0].base_stat
    pokemonEstadisticaDatos[1].textContent = stats[1].base_stat
    pokemonEstadisticaDatos[2].textContent = stats[2].base_stat
    pokemonEstadisticaDatos[3].textContent = stats[3].base_stat
    pokemonEstadisticaDatos[4].textContent = stats[4].base_stat
    pokemonEstadisticaDatos[5].textContent = stats[5].base_stat

}

async function obtenerPoquemon(e){
    e.preventDefault();
    texto = e.target.value;

    const consulta = await fetch(`https://pokeapi.co/api/v2/pokemon/${texto}`);
    const informacion = await consulta.json();

    return informacion
}

async function obtenerDescripcion(e){
    e.preventDefault();
    texto2 = e.target.value;

    const consulta2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${texto2}`);
    const informacion2 = await consulta2.json();

    return informacion2
}

function CrearTypes( tipos){
    pokemonTipo.innerHTML='';
    tipos.forEach( tipos => {
        const div = document.createElement('DIV');
        const parrafo = document.createElement('P');

        if (tipos.type.name == 'grass') {
            pokemonTipo.appendChild(div);
            div.classList.add('div--grass');
            div.appendChild(parrafo);
            parrafo.classList.add('div-texto');
            parrafo.textContent = tipos.type.name
        }else if(tipos.type.name == 'poison') {
            pokemonTipo.appendChild(div);
            div.classList.add('div--poison');
            div.appendChild(parrafo);
            parrafo.classList.add('div-texto');
            parrafo.textContent = tipos.type.name
        }else{
            pokemonTipo.appendChild(div);
            div.classList.add('div--bug');
            div.appendChild(parrafo);
            parrafo.classList.add('div-texto');
            parrafo.textContent = tipos.type.name
        }
    });
}


