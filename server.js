var express = require("express");

var app = express();

app.disable("x-powered-by");
var device = require('express-device');
app.use(device.capture());
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    if (req.device.type.toUpperCase() == "PHONE")
        res.render("homeMobile", { layout: "Mobile" });
    else
        res.render("home");

})


app.listen(app.get("port"), function () {
    console.log("Express started on http://localhost:" + app.get("port") + " press ctr+C to terminate");
})