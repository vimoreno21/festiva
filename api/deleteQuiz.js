const express = require('express');
const router = express.Router();
const Quiz = require('../models/quizModel')

router.post('/', async (req, res) => {

    const id = req.body._id
    results = await Quiz.deleteOne({_id: id})

    if (results)
    {
        return res.status(200).send({message: "Deletion successful!"})
    }
    
    else
    {
        return res.status(400).send({message: "You weren't able to delete the quiz."})
    }

})

module.exports = router;