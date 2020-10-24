const express = require('express');

const router = express.Router();

// == CRUD Actions ==

// [1] Read/Retrive
// Getting all
router.get('/', (req, res) => {
    res.send('Hello World');
});

// Getting One
router.get('/:id', (req, res) => {

});

// [2] Create
// Creating One
router.post('/', (req, res) => {

});

// [3] Update

// Note: 
// -> I use 'patch' instead of 'put' because I want to update only based on what user passed.
// -> On the other hand, 'put' changes all existing fields even if a user only changes one field.

// Updating One
router.patch('/:id', (req, res) => {

});

// [4] Delete
// Deleting One
router.delete('/:id', (req, res) => {

});

module.exports = router;
