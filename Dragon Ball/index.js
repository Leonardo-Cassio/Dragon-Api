const characterId = document.getElementById('characterId');
const btnGo = document.getElementById('btn-go');
const btnReset = document.getElementById('btn-reset');
const content = document.getElementById('content');
const conteinerResult = document.getElementById('result-style');
const image = document.getElementById('img');

const fetchApi = (value) => {
  const result = fetch(`https://dragonball-api.com/api/characters/${value}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    return data;
  });

  return result;
}

const keys = ['name', 'ki', 'maxKi', 'race', 'gender', 'affiliation', 'originPlanet'];
const newKeys = {
  name: 'Nome',
  ki: 'Ki',
  maxKi: 'Max Ki',
  race: 'Raça',
  gender: 'Gênero',
  affiliation: 'Afiliação',
  originPlanet: 'Planeta de origem'
}

const buildResult = (result) => {
  return keys.map((key) => document.getElementById(key))
    .map((elem) => {
      if(elem.checked === true && (Array.isArray(result[elem.name])) === true){
        const arrayResult = result[elem.name].join('\r\n');
        console.log(arrayResult);
        const newElem = document.createElement('p');
        newElem.innerHTML = `${newKeys[elem.name]}: ${arrayResult}`;
        content.appendChild(newElem);
      } else if(elem.checked === true && (elem.name === 'origin')){
        const newElem = document.createElement('p');
        newElem.innerHTML = `${newKeys[elem.name]}: ${result[elem.name].name}`;
        content.appendChild(newElem);
      } else if(elem.checked === true && typeof(result[elem.name]) !== 'object'){
        const newElem = document.createElement('p');
        newElem.innerHTML = `${newKeys[elem.name]}: ${result[elem.name]}`;
        content.appendChild(newElem);
      }
    });
}

btnGo.addEventListener('click', async (event) => {
  event.preventDefault();

  if(characterId.value === ''){
    return content.innerHTML = 'É necessário inserir um ID.';
  }

  const result = await fetchApi(characterId.value);
  if(content.firstChild === null){
    conteinerResult.className = 'result-style';
    image.src = `${result.image}`;
    buildResult(result);
  } else {
    content.innerHTML = '';
    conteinerResult.className = 'result-style';
    image.src = `${result.image}`;
    buildResult(result);
  }
});

btnReset.addEventListener('click', () => location.reload());

document.getElementById('btn-select-all').addEventListener('click', function() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function(checkbox) {
    checkbox.checked = true;
  });
});