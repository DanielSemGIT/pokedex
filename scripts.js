let texto;


const poquemon = {
    nombre: '',
    peso: '',
    altura: '',
    habilidad: ''
}

const busqueda = document.querySelector('#buscador'); //variable para seleccionar el campo html
busqueda.addEventListener('change', obtenerPoquemon); //le asignamos un evento que ejecuta una funcion


async function obtenerPoquemon(e){
    texto = e.target.value;
    console.log(texto);

    const consulta = await fetch(`https://pokeapi.co/api/v2/pokemon/${texto}`);
    const informacion = await consulta.json();

    const {abilities, name, height, weight} = informacion
    poquemon.nombre = name;
    poquemon.peso = weight
    poquemon.altura = height
    abilities.forEach(abilities => {
        if(abilities.is_hidden == true){
            poquemon.habilidad = abilities.ability.name;
        }
    });

    const heading = document.querySelector('.descripcion__contenido h1');
    heading.textContent = poquemon.nombre;

}


