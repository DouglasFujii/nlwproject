
const ufSelect = document.querySelector('select[name=uf]');

ufSelect.addEventListener("change", getCities);

function populateUF() {

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUF();

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]');
    const stateInput = document.querySelector('input[name=state]');
    const ufValue = event.target.value;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    const indexOfSelectedState = event.target.selectedIndex;


    stateInput.value = event.target.options[indexOfSelectedState].text;

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            citySelect.innerHTML = "";
            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false;

        })

}

//Itens de Coleta
const itensToCollect = document.querySelectorAll('#itens-grid li');

for (const item of itensToCollect) {
    item.addEventListener('click', handleSelectedItem)

}

const collectedItems = document.querySelector('input[name=items]');

let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;

    //add or remove class
    itemLi.classList.toggle('selected')

    const itemId = itemLi.dataset.id;
    
    const alreadySelected = selectedItems.findIndex((item) => {
        const itemFound = item == itemId; //true or false
        return itemFound;
    })

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        })
        selectedItems = filteredItems;
    }else{
        selectedItems.push(itemId);
    }

    collectedItems.value = selectedItems;

}