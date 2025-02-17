const express = require('express');
const router =  express.Router();
const { getContact,
     createContact,
      getContacts,
       upateContact,
        deleteContact } = require('../controllers/contactcontroller');

router.get('/',getContact);

router.post('/',createContact);

router.get('/:id',getContacts)

router.put('/:id',upateContact);

router.delete('/:id',deleteContact);

module.exports = router;