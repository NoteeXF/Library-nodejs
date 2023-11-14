const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Books = require("./routes/bookrouter")


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/books', Books);


let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
