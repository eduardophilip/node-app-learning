const express = require("express");
const app = express();
const connection = require('./database/database');

//MODEL FILMES
const Filmes = require("./database/Filmes");

connection.authenticate().then(() => {
    console.log("Conexão feita com a base de dados!")
}).catch(msErro => {
    console.log(msErro);
});

app.set('view engine', 'ejs');

// body-parser
app.use(express.json());
app.use(express.urlencoded({
extended: true
}));


app.get("/", function(req, res) {

    Filmes.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(filmes => {
        res.render("index", {
            filmes: filmes
        });
    })

});

app.get("/addmovie", function(req, res) {
    res.render("addmovie");
});

app.post("/storemovie", function(req, res) {

    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    let ano = req.body.ano;
    let imdb = req.body.imdb;

    Filmes.create({
        titulo: titulo,
        descricao: descricao,
        ano: ano,
        imdb: imdb
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/movie/:id", function(req, res) {

    const id = req.params.id;

    Filmes.findOne({
        where: {id: id}
    }).then(filme => {

        if(filme != undefined) {
            
            res.render("showmovie", {
                filme: filme
            });
            
        } else { // not found
            res.redirect("/");
        }

    });

});

app.listen(8000, () => {console.log("Servidor ativo!")});