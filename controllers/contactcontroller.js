const ContactModel = require("../models/contactmodel");

const getContact = async(req,res)=>{
   try{
    const contact = await ContactModel.find();
    res.status(200).send(contact);
   }catch(e){
    res.status(404).send({message:e.message});
   }
};

const createContact = async(req,res)=>{
    try {console.log("The request body is :",req.body);
        const {name, email , phone} = req.body;
      
        if(!name || !email || !phone){
          res.status(400).json("All fields are require")
        }

        const contact = await ContactModel.create({
            name,
            email,
            phone
        });
        
          res.status(200).json(contact);
      }catch(e){
        res.status(404).send({message:e.message});
    }
      }

const getContacts = async(req,res)=>{
    try{
        const contact =await ContactModel.findById(req.params.id);
        if(!contact){
            return res.status(404).json("Contact not found");
        }
        res.status(200).send(contact);
    }catch(e){
        res.status(404).send({message:e.message});
       }
};

const upateContact = async(req,res)=>{
    try{
        const contact = await ContactModel.findById(req.params.id);
        if(!contact){
            return res.status(404).json("Contact not found");
        }
       contact.name = req.body.name || contact.name;
        contact.email = req.body.email || contact.email;
        contact.phone = req.body.phone || contact.phone;
        await contact.save();
        
        //another logic
        /*const updateContact = await ContactModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )*/
        /*await updateContact.save();
        res.status(200).send(updateContact);*/
        res.status(200).send(contact);
    }catch(e){
        res.status(404).send({message:e.message});
       }
    
};

const deleteContact = async(req,res)=>{
    try{
        const contact = await ContactModel.findById(req.params.id);
        if(!contact){
            res.status(404).json("Contact not found");
        }
        await ContactModel.deleteOne({ _id: req.params.id });
        res.status(200).send({message:`Contact is deleted`});
    }catch(e){
        res.status(404).send({message:e.message});
       }
};

module.exports = {
getContact,
createContact,
getContacts,
upateContact,
 deleteContact};