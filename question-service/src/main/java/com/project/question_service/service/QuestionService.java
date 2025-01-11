package com.project.quizapp.service;

import com.project.quizapp.dao.QuestionDao;
import com.project.quizapp.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class QuestionService {

    private static final Logger logger = LoggerFactory.getLogger(QuestionService.class);

    @Autowired
    QuestionDao questionDao;

    public List<Question> getAllQuestions() {
        return questionDao.findAll();
    }

    public Question getQuestionById(Long id) {
        return questionDao.findById(id).orElse(null);
    }

    public List<Question> getQuestionsByCategory(String questions) {
        return questionDao.findByCategory(questions);
    }

    public String addQuestion(Question question) {
        return questionDao.save(question).toString();
    }

    public Question updateQuestion(Question updatedQuestion) {
        // Save the updated question to the database
        return questionDao.save(updatedQuestion);
    }

    public String deleteQuestionById(Long id) {
        questionDao.deleteById(id);
        return "Question w/ id " + id + " has been deleted";
    }
}
