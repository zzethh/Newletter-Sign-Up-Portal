const express = require('express');
const bodyParser = require('body-parser');
const https = require('node:https');

const app = express()

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html')
})

app.post("/", function(req, res) {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname
      }
    }]
  };
  const jsonData = JSON.stringify(data)
  const url = "https://us13.api.mailchimp.com/3.0/lists/6494e398c4"
  const options = {
    method: "POST",
    auth: "zenith:f93c2e000c6ce8df6f222afc500ce9cd-us13"
  }
  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname+"/success.html")
    } else {
      res.sendFile(__dirname+"/failure.html")
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData)
  request.end()
})

app.listen(process.env.PORT||3000, () => {
  console.log(`App listening on port ${port}`)
})


// f93c2e000c6ce8df6f222afc500ce9cd-us13

// 6494e398c4
