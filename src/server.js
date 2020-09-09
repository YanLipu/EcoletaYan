const express = require("express")
const server = express()

//Pegar o banco de dados
const db = require("./database/db")

//Configurar ppasta publica
server.use(express.static("public"))

//Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({extended: true}))

//Chamando o template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar os caminhos da aplicação
//req: Requisição
//res: Resposta
//Rota inicial para carregar o arquivo index.html
server.get("/", (req, res)=> {
    return res.render("index.html", {title: "Um título"})
})

//Rota para carregar a página create-point.html
server.get("/create-point", (req, res)=> {

    //req.query é o nome dado as strings da URL
    console.log("entrou  nessa função")
    console.log(req.query)

    return res.render("create-point.html")
})

server.post("/save-point", (req, res) => {

    //req.body: O corpo do formulario usando post
    //console.log(req.body)

    //Inserir dados no banco de dados
    //Inserir dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    //Função para verificar a existência de erros
    function afterInsertData(err) {
        if(err) {
            return console.log(err)
            return res.send("Erro no cadastro.")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)


    
})

//Rota para página de busca
server.get("/search", (req, res)=> {

    const search = req.query.search

    if(search == "") {
        //Pesquisa vazia
        return res.render("search-results.html", { total: 0})
    }
    //Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err,rows){
        if(err){
            return console.log(err)
        }

        console.log("Aqui estão seus registos: ")
        console.log(rows)

        //Constante que recebe o numero total de objetos encontrados
        const total = rows.length
        //Mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total})
    })
    
})

// Ligar o servidor
server.listen(3000)

