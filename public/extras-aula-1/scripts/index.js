// Cria uma constante que recebe os itens da #page home do HTML
const buttonSearch = document.querySelector("#page-home main a")

// Cria uma constante que recebe os itens do #modal do HTML 
const modal = document.querySelector("#modal")

// Cria uma constante que recebe os itens da clase a dentro do #modal no HTML
const close = document.querySelector("#modal .header a")

// Função que remove a classe 'hide' a partir de um click
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})


// Função que adiciona a classe 'hide' no HTML quando clica no X
close.addEventListener("click", () => {
    modal.classList.add("hide")
})