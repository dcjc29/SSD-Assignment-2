const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const oAuth2 = require('./credentials.json')
const {google} = require('googleapis');

const CLIENT_ID = oAuth2.web.client_id
const CLIENT_SECRET = oAuth2.web.client_secret
const REDIRECT_URI = oAuth2.web.redirect_uris[1]
const oAuthClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
var isAuthenticated = false
const SCOPES = "offline https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile"

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
//connectDB();

// Route files
const users = require("./routes/users");
const books = require("./routes/books");
const googleRouter = require("./routes/google");

const app = express();

// Body parser
app.use(express.json());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100, // No of Requests
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.get('/', (req,res) => {
  console.log("here")
  if(!isAuthenticated){
      var url = oAuthClient.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES
      })
      console.log(url)
      res.send({url: url})
  }else{

  }
})
app.use("/api/v1/users", users);
app.use("/google",googleRouter);
//app.use("/api/v1/books", books);


app.post("/api/v1/auth/google", async (req, res) => {
  const { token }  = req.body
  console.log(token)
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
  });
  const { name, email, picture } = ticket.getPayload();    
  client.setCredentials(token)
  // const user = await db.user.upsert({ 
  //     where: { email: email },
  //     update: { name, picture },
  //     create: { name, email, picture }
  // })
  res.status(201)
  res.json({ name, email, picture })
})


// app.post("/api/v1/books/getDigitalCopy", async (req, res) => {
//   const drive = google.drive({version: 'v3', client});
//   drive.files.list({
//     pageSize: 10,
//     fields: 'nextPageToken, files(id, name)',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const files = res.data.files;
//     if (files.length) {
//       console.log('Files:');
//       files.map((file) => {
//         console.log(`${file.name} (${file.id})`);
//       });
//     } else {
//       console.log('No files found.');
//     }
//   });
// })

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

const server = app.listen(
  PORT,
  HOST,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err?.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
