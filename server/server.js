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
//const {google} = require('googleapis');

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client('15360167138-4jkt4038tefp5ivj9rke9lj3rdp65uep.apps.googleusercontent.com','D_RPmNtIn1WbEZbmKdwdOEPr')

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
//connectDB();

// Route files
const users = require("./routes/users");
const books = require("./routes/books");
const google = require("./routes/google");

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
app.use("/api/v1/users", users);
app.use("/google",google);
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
