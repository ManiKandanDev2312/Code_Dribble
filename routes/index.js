// this line is importing the express module
const express = require('express');

// In this snippet, the code is refactored to use the express Router
const router = express.Router();

// this line is importing the mongoose module
const mongoose = require('mongoose');

// this line is used to use the id to object id
const { ObjectId } = require("mongodb");

// this line is importing the multer module
const multer = require("multer");

// this line is importing the xlsx module
const excelFile = require("xlsx");

// this line is importing the path module
const path = require("path");



// environmentFile is used to load the environment variables
const environmentFile = require("dotenv");

// this is the configuration of the environment variables
environmentFile.config(
    {
        path:"./environments/.env"
    }
);


// this line is connecting to the database
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

// this line is displaying the error message when the database is not connected
db.on('error', (error) => console.error(error));

// this line is displaying the message when the database is connected
db.once('open', () => console.log('Connected to Database'));



// this method is used store the Excel file with date as a file name
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'excelSheets/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });


  const upload = multer({ storage:fileStorage });


// this method is used to retrieve the Data from Mongodb
router.get("/impactTraineeDetails",(req,res)=>{
   db.collection('impact-trainee').find().toArray().then((traineeDetails)=>{
    res.status(200).send(traineeDetails);
   }).catch((error)=>{
    res.status(400).send(error);
   })
})

// this method is used to retrieve the Data from Mongodb
router.get("/internshipDetails",(req,res)=>{
   db.collection('internship').find().toArray().then((traineeDetails)=>{
    res.status(200).send(traineeDetails);
   }).catch((error)=>{
    res.status(400).send(error);
   })
})
// this method is used to retrieve the Data from Mongodb
router.get("/reviewDetails",(req,res)=>{
   db.collection('reviewDetails').find().toArray().then((traineeDetails)=>{
    res.status(200).send(traineeDetails);
   }).catch((error)=>{
    res.status(400).send(error);
   })
})
// this method is used to retrieve the Data from Mongodb
router.get("/TNDetails",(req,res)=>{
   db.collection('TNDetails').find().toArray().then((traineeDetails)=>{
    res.status(200).send(traineeDetails);
   }).catch((error)=>{
    res.status(400).send(error);
   })
})
// this method is used to retrieve the Data from Mongodb
router.post("/reviewFormDetails",(req,res)=>{
    console.log(req.body);
   db.collection('reviewDetails').insertOne(req.body).then((traineeDetails)=>{
    res.status(200).send(traineeDetails);
   }).catch((error)=>{
    res.status(400).send(error);
   })
})

// this method is used to delete the Data from Impact trainee Details
router.post("/deleteImpactTrainee",(req,res)=>{
    const traineeId = new ObjectId(req.body._id);
    db.collection('impact-trainee').findOneAndDelete({_id: traineeId}).then(()=>{
        res.status(200).send("successfully deleted");
    }).catch((error)=>{
        console.log(error);
        res.status(400).send(error);
    })
})

// this method is used to delete all the Data from Impact trainee Details
router.post("/deleteAllImpactTrainee",(req,res)=>{
    db.collection('impact-trainee').drop().then(() => {
        res.status(200).send("Successfully deleted multiple trainees");
    }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
})


// this method is used to upload the trainee data with the help of multer
router.post('/impactTraineeExcelToDatabase', upload.single('file'), (req, res)=>{
    console.log(req.file);
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    try {
      const workbook = excelFile.readFile(req.file.path);
      const sheetName = workbook.SheetNames[1];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = excelFile.utils.sheet_to_json(worksheet);
      
      db.collection('impact-trainee').insertMany(jsonData, function(err, res) {
        if (err) throw err;
        console.log('Number of documents inserted: ' + res.insertedCount);
      });
  
      res.status(200).send({ message: 'File uploaded and processed', data: jsonData });
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).send('Error processing the Excel file');
    }
});

router.use('/uploads', express.static('uploads'));


// this block is display the message when the server is running
router.get('/', async(req, res) => {
    res.send("codeDribble API is working");
});


// this method is used to upload the trainee data with the help of multer
router.post('/internshipExcelToDatabase', upload.single('file'), (req, res)=>{
    console.log(req.file);
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    try {
      const workbook = excelFile.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = excelFile.utils.sheet_to_json(worksheet);
      
      db.collection('internship').insertMany(jsonData, function(err, res) {
        if (err) throw err;
        console.log('Number of documents inserted: ' + res.insertedCount);
      });
  
      res.status(200).send({ message: 'File uploaded and processed', data: jsonData });
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).send('Error processing the Excel file');
    }
});
// this method is used to upload the trainee data with the help of multer
router.post('/reviewDetailsExcelToDatabase', upload.single('file'), (req, res)=>{
    console.log(req.file);
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    try {
      const workbook = excelFile.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = excelFile.utils.sheet_to_json(worksheet);
      
      db.collection('reviewDetails').insertMany(jsonData, function(err, res) {
        if (err) throw err;
        console.log('Number of documents inserted: ' + res.insertedCount);
      });
  
      res.status(200).send({ message: 'File uploaded and processed', data: jsonData });
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).send('Error processing the Excel file');
    }
});
// this method is used to upload the trainee data with the help of multer
router.post('/internshipExcelToDatabase', upload.single('file'), (req, res)=>{
    console.log(req.file);
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    try {
      const workbook = excelFile.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = excelFile.utils.sheet_to_json(worksheet);
      
      db.collection('internship').insertMany(jsonData, function(err, res) {
        if (err) throw err;
        console.log('Number of documents inserted: ' + res.insertedCount);
      });
  
      res.status(200).send({ message: 'File uploaded and processed', data: jsonData });
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).send('Error processing the Excel file');
    }
});
// this method is used to upload the trainer data with the help of multer
router.post('/TNDetailsExcelToDatabase', upload.single('file'), (req, res)=>{
    console.log(req.file);
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    try {
      const workbook = excelFile.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = excelFile.utils.sheet_to_json(worksheet);
      
      db.collection('TNDetails').insertMany(jsonData, function(err, res) {
        if (err) throw err;
        console.log('Number of documents inserted: ' + res.insertedCount);
      });
  
      res.status(200).send({ message: 'File uploaded and processed', data: jsonData });
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).send('Error processing the Excel file');
    }
});

// this method is used to delete the Data from Impact trainee Details
router.post("/deleteInternship",(req,res)=>{
    const traineeId = new ObjectId(req.body._id);
    db.collection('internship').findOneAndDelete({_id: traineeId}).then(()=>{
        res.status(200).send("successfully deleted");
    }).catch((error)=>{
        console.log(error);
        res.status(400).send(error);
    })
})
// this method is used to delete the Data from Impact trainee Details
router.post("/deleteTNDetails",(req,res)=>{
    const traineeId = new ObjectId(req.body._id);
    db.collection('TNDetails').findOneAndDelete({_id: traineeId}).then(()=>{
        res.status(200).send("successfully deleted");
    }).catch((error)=>{
        console.log(error);
        res.status(400).send(error);
    })
})

// this method is used to delete all the Data from Intern trainee Details
router.post("/deleteAllInternship",(req,res)=>{
    db.collection('internship').drop().then(() => {
        res.status(200).send("Successfully deleted multiple trainees");
    }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
})
// this method is used to delete all the Data from Review Details
router.post("/deleteAllReviewDetails",(req,res)=>{
    db.collection('reviewDetails').drop().then(() => {
        res.status(200).send("Successfully deleted multiple trainees");
    }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
})
// this method is used to delete all the Data from Review Details
router.post("/deleteAllTNDetails",(req,res)=>{
    db.collection('TNDetails').drop().then(() => {
        res.status(200).send("Successfully deleted multiple trainees");
    }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
})



// this line is exporting the router
module.exports = router;