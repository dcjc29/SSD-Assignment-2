const asyncHandler = require("../middleware/async");
const Book = require("../models/Book");
const {google} = require('googleapis');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client('15360167138-4jkt4038tefp5ivj9rke9lj3rdp65uep.apps.googleusercontent.com')

const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkOTI5YzYzZmYxMDgyYmJiOGM5OWY5OTRmYTNmZjRhZGFkYTJkMTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTUzNjAxNjcxMzgtNGprdDQwMzh0ZWZwNWl2ajlya2U5bGozcmRwNjV1ZXAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxNTM2MDE2NzEzOC00amt0NDAzOHRlZnA1aXZqOXJrZTlsajNyZHA2NXVlcC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNTgwNTgxNjYwNjM5MjMyNjM0NCIsImVtYWlsIjoiZHdndWlkZXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJjRi1yYXNoazZHclJYN2pCVjBpbzZRIiwibmFtZSI6IkQgR3VpZGVzIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdnVzJSVWFINllJblVBVl84bXk1cm16S05rRGRjRW1aa04tQXFPRj1zOTYtYyIsImdpdmVuX25hbWUiOiJEIiwiZmFtaWx5X25hbWUiOiJHdWlkZXMiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTYzMzI2MzkyNCwiZXhwIjoxNjMzMjY3NTI0LCJqdGkiOiJlZjViYjQ0MWRjYzkzMGVhODcyYjc2NzVjMzE2MjA4MTU4OTY3MTYzIn0.O-jcF0Lma7k75giPi0ZzOi3YAeq5qqR7JwzNRnkA1wd34pkyfpmLxYvPLQmu7Dnm8gaFib_LjlYvZndY9GySokm4Req7vjbn2lQYsHoskEd67CrbhqRJyCWSUorfvPhgf5G0FLFDWWA4yNBJ5p96XW6rfirg-EwwivzkDgci4Eu0yCMWcYlQ2vjhz_eUqxDgVelMvd7ITlq30BKk6wiPzGMf6TvSoheeUEZKQsvGtPS_VRWCKf1d5-YAqljitoe9SfrbJ_5tzSIuYdmjiXIb_4LMvMVsUYgeAR6g0m2iXVY9TTyN025x5bsNb2unHA5hrEgGa3DLlIXCt6tySbOrYQ"
const fs = require('fs');
const readline = require('readline');

// @desc    Add Book
// @route   POST /api/v1/books
// @access  Public
exports.addBook = asyncHandler(async (req, res, next) => {
  const book = await Book.create(req.body);
  res.status(201).json({
    success: true,
    data: book
  });
});

exports.getDigitalCopy = asyncHandler(async (req,res,next)=>{

//   const driveObj = google.drive({
//     auth:client,
//     version:'v3'
// })
// const fileMetadata = {
//     name: 'Sample'
// }

// const media = {
//     body: fs.createReadStream('/Users/durekshawasala/SLIIT/4th Year/SSD/SSD-Assignment-2/server/controllers/sample.pdf')
// }
// driveObj.files.create({
//     resource: fileMetadata,
//     media:media,
//     fields: "id"
// },(error,file) => {
//     if(error){
//         res.send({status:500, msg:"Upload Failed. Something went wrong"})
//     }else{
//         fs.unlinkSync(req.file.path)
//         res.send({status:200, msg: "File Successfully uploaded"})
//     }
// })
})

// @desc    Get all books
// @route   GET /api/v1/books
// @access  Public
exports.getBooks = asyncHandler(async (req, res, next) => {
  const books = await Book.find();
  
  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
});

// @desc    Get single book
// @route   GET /api/v1/books/:id
// @access  Public
exports.getBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: book
  });
});

