
var path = require('path');
//feli stren utilizado para ler arquivos e para ler diretórios
var fs = require('fs');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://root:info03_mysql@localhost:3306/tasks_list');
var lodash = require('lodash');
var db = [];

//fs.readdirSync = leia meu diretório
//__dirname = variavel global que especifica o diretório corrente
fs.readdirSync(__dirname)
    //.filter = filre para mim todos os arquivos que o nome dele seja diferente de index.js
    .filter(function (file) {
       return (file !== 'index.js')
    })
    //me retorne um array que sera interado, e a cada interação o sequelize será importado para dentro da instancia corrente
    .forEach(function (file, key) {
        //importe o meu diretório padrão / o meu arquivo atual
        var model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model;
    })

Object.keys(db)
      .forEach(function (model) {
          if(!db[model].hasOwnProperty('associate')){
              return;
          }

          return db[model].associate(db)
      })

//funcao lodash.extends vai executar e unir tudo que for informado dentro dela
//Ou seja, informe o método Sequelize a intância sequelize e una ao objeto db
module.exports = lodash.extend({
    Sequelize: Sequelize,
    sequelize: sequelize
}, db);