const express = require('express');
const { addQuestion, getQuestion, getQuestionsByDifficulty, deleteQuestion, updateQuestion } = require('./dboperations');

const router = express.Router();

router.post('/questions', async (req, res) => {
    try {
        await addQuestion(req.body);
        res.status(201).send({ message: "Question added" });
    } catch (error) {
        res.status(500).send({ error: "Could not add question" });
    }
});

router.get('/questions/:id', async (req, res) => {
    try {
        const question = await getQuestion(req.params.id);
        if (question) {
            res.status(200).send(question);
        } else {
            res.status(404).send({ message: "Question not found" });
        }
    } catch (error) {
        res.status(500).send({ error: "Could not retrieve question" });
    }
});

router.get('/questions/difficulty/:level', async (req, res) => {
    try {
        const questions = await getQuestionsByDifficulty(req.params.level);
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send({ error: "Could not retrieve questions" });
    }
});

router.put('/questions/:id', async (req, res) => {
    try {
        await updateQuestion(req.params.id, req.body);
        res.status(200).send({ message: "Question updated" });
    } catch (error) {
        res.status(500).send({ error: "Could not update question" });
    }
});

router.delete('/questions/:id', async (req, res) => {
    try {
        await deleteQuestion(req.params.id);
        res.status(200).send({ message: "Question deleted" });
    } catch (error) {
        res.status(500).send({ error: "Could not delete question" });
    }
});

module.exports = router;