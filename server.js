// init project
const express = require('express')
const app = express()

app.use(express.static('public'))

app.get("/", (req,res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get("/myInfo", (request, response) => {
  // Get information from header
  var ipAddress = request.header("x-forwarded-for");
  var language = request.header("accept-language");
  var software = request.header("user-agent");

  // Test for missing info (ex: Postman request)
  if(ipAddress !== undefined) {
    ipAddress = ipAddress.split(',')[0];
  } else {
    ipAddress = "Unavailable";
  }
  
  if (language !== undefined) {
    language = language.split(',')[0]
  } else {
    language = "Not specified";
  }
  
  if (software.indexOf("(") !== -1) {
    software = software.substring(software.indexOf("(")+ 1, software.indexOf(")"));
  }

  // Put it all together
  var headerInfo = {
    ipaddress: ipAddress,
    language: language,
    software: software
  }

  response.status(200).send(headerInfo);
})

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})