const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express()//new instance of express

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

  const firstName = req.body.Fname;
  const lastName = req.body.Lname;
  const email = req.body.Email;


  const data = {
    members :[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us5.api.mailchimp.com/3.0/lists/b49a67a557";
  const options = {
    method: "POST",
    auth: "gaurish1:e9d0b8a159a23d684c67e0fa09d85f69-us5"
  }

  const request = https.request(url, options, function(response){
    if (response.statusCode ===200){
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));

    })
  })

  request.write(jsonData);
  request.end();

});
app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("server is up AND running");
})
// use process.env.PORT WHILE DEPLOYING
