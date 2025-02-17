const express = require('express');
const router =  express.Router();
const { getContact,
     createContact,
      getContacts,
       updateContact,
        deleteContact } = require('../controllers/contactcontroller');
const validateToken = require('../middleware/validateTokenHandler');


router.use(validateToken);
router.get('/',getContact);

router.post('/',createContact);

router.get('/:id',getContacts)

router.put('/:id',updateContact);

router.delete('/:id',deleteContact);

module.exports = router;