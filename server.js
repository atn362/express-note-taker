const express = require("express");

//const to utilize the express app and send app to the local host at a desired port
const app = express();
var PORT = process.env.PORT || 3000;

//add encoded into readable source, and converting into json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./apiRoutes")(app);
require("./htmlRoutes")(app);

//listening on the specified port above
app.listen(PORT, function () {
    console.log(`App listening on http://localhost:${PORT}`);
});