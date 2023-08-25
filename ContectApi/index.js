const express= require('express');//  this framework is used to create web application in node js
const bodyparser= require('body-parser'); 
const cors =require('cors');  // to give permission to frontend application access api
const multer = require('multer');  // this module is used for read file 

const PORT=8000;
require('dotenv').config();// to read data from .env file
const app = express();
require('./db')

app.use(bodyparser.json());
app.use(cors());
const {contact  }= require('./models/Contact')

//const storage = multer.memoryStorage();
//const upload = multer({ storage });
const upload =multer({dest :'uploads/'})

//const contactR = require('./Routes/ContactRoutes');

//app.use('/contacts' , contactR);


 //get all contact
app.get('/getContacts', async(req , res)=>{
    const allcontacts= await contact.find();// find will return collection in javascript object
    res.json(allcontacts);    //converting javascript object to json format and send it
})


// create contact
app.post('/addContact', upload.single('photo'), async (req, res) => {
  const { FirstName, LastName, NickName, Email, PhoneNo, photo } = req.body;

  try {
    const newContact = new contact({
      FirstName,
      LastName,
      NickName,
      PhoneNo,
      Email,
      photo,
    });

    const savedContact = await newContact.save();
    res.json(savedContact);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating contact');
  }
});



//  get Single contact
app.get('/contacts/:contactId', async (req, res) => {
    try {
      const contactId = req.params.contactId;
      console.log(contactId);
      const foundcontact = await contact.findById(contactId);
      if (!foundcontact) {
        return res.status(404).send('contact not found');
      }
      res.json(foundcontact);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching contact');
    }
  });

    // delete contact
    
    app.delete('/contacts/:id', async (req, res) => {
      try {
        const deletedcontact = await contact.findByIdAndRemove(req.params.id);
        if (!deletedcontact) {
          return res.status(404).json({ error: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });


  // update contact
  app.put('/contacts/:id', async (req, res) => {
    try {
      const updatecontact = await contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatecontact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      res.json(updatecontact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });





  // application running on port num 8000
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
});



