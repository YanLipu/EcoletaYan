
//Função que adiciona os estados na caixa de seleção
function populateUFs() {

    //Criando uma variável que busca dentro do documento as tags 'select'
    const ufSelect = document.querySelector("[name=uf]")
       
    //Uma promessa da API do IBGE, transforma os dados em um json
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json()})
    .then((states) => {

        //Laço de repetição para listar todos o estados
        for(const state of states){
            ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
        }
    })
 }

 populateUFs()


 //Função que lista as cidades a partir do estado selecionado
 function getCities (event) {
    
    //Variável que acha a tag select no documento
    const citySelect = document.querySelector("[name=city]")

    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    //Inicia o campo cidades como vazio
    citySelect.innerHTML = ""
    citySelect.disabled = true



    fetch(url)
    .then( (res) => {return res.json()})
    .then((cities) => {

        //Laço de repetição para listar todos o estados
        for(const city of cities){
            citySelect.innerHTML += `<option value ="${city.nome}">${city.nome}</option>`
        }

        //Habilita a caixa de seleção de cidades
        citySelect.disabled = false
    })
 }

 document
    .querySelector("[name=uf]")
    .addEventListener("change", getCities)


//Itens de Coleta
//Pegar todos o lis
const itemsToCollect = document.querySelectorAll(".items-grid li") 

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //Adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id 

    console.log('ITEM ID: ', itemId)

    //Verificar os itens selecionados
    //Pega os itens selecionados
    const alreadSelected = selectedItems.findIndex(function(item){
        const itemFound = item == itemId //Isso será true ou false
        return itemFound
    })

     

    //Se já estiver selecionado, tirar da seleção
    if(alreadSelected >= 0){
        
        //Tirar da seleção
        const filteredItems = selectedItems.filter(function(item){
            //Quando a função for false, o item terá que ser removido do array
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems

          
    } else {
        //Se não estiver selecionado, adiconar a seleção
        selectedItems.push(itemId)
    }
    console.log('SELECTE ITEMS',selectedItems)

    //Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}
