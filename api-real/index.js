let express = require("express");
let cors = require("cors");
let app = express();
bodyParser = require("body-parser");
let fs = require("fs");

// var corsOptions = {
//   origin: 'http://localhost:4200',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],

// }

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// app.use(cors(corsOptions))

app.post("/", function(req, res, next) {
    console.log(req.body);
    let jsonFile = require("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/segurança de sistemas/trabalho pratico/api-real/dados.json");

    jsonFile[req.body["nome"]] = {
      sobre: req.body["sobre"],
      valor: req.body["valor"]
    };

    fs.writeFileSync(
      "C:/Users/Sergio Souza Novak/Documents/IF GOIANO/segurança de sistemas/trabalho pratico/api-real/dados.json"
    ,JSON.stringify(jsonFile));
    res.statusCode = 200;
    res.send({ data: "dados cadastrados com sucesso" });
    return;

});

app.get("/", function(req, res, next) {
  try {
    let jsonFile = require("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/segurança de sistemas/trabalho pratico/api-real/dados.json");
    res.statusCode = 200;
    res.send({ data: jsonFile });
  } catch (e) {
    res.statusCode = 500;
    res.send({ data: "falha" });
  }
});

app.listen(8080, function() {
  console.log("CORS-enabled web server listening on port 8080");
});
