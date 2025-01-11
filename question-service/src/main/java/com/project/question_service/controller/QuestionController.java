package com.project.quizapp.controller;

import com.project.quizapp.model.Question;
import com.project.quizapp.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("question/")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @GetMapping("allQuestions")
    public ResponseEntity<List<Question>> getAllQuestion() {
        return new ResponseEntity<>(questionService.getAllQuestions(), HttpStatus.OK);
    }

    @GetMapping("question")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        return new ResponseEntity<>(questionService.getQuestionById(id), HttpStatus.OK);
    }

    @GetMapping("category/{category}")
    public ResponseEntity<List<Question>> getQuestionsByCategory(@PathVariable String category) {
        return new ResponseEntity<>(questionService.getQuestionsByCategory(category), HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity<String> addQuestion(@RequestBody Question question) {
        System.out.println("Received question: " + question);
        return new ResponseEntity<>(questionService.addQuestion(question), HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question updatedQuestion) {
        // Find the existing question by ID
        Question existingQuestion = questionService.getQuestionById(id);

        // If the question doesn't exist, return a NOT_FOUND status
        if (existingQuestion == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Update the existing question with the new data
        existingQuestion.setQuestionText(updatedQuestion.getQuestionText());
        existingQuestion.setOptionOne(updatedQuestion.getOptionOne());
        existingQuestion.setOptionTwo(updatedQuestion.getOptionTwo());
        existingQuestion.setOptionThree(updatedQuestion.getOptionThree());
        existingQuestion.setCorrectOption(updatedQuestion.getCorrectOption());
        existingQuestion.setDifficultyLevel(updatedQuestion.getDifficultyLevel());

        // Save the updated question back to the database
        Question savedQuestion = questionService.updateQuestion(existingQuestion);

        // Return the updated question in the response
        return new ResponseEntity<>(savedQuestion, HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteQuestionById(@PathVariable Long id) {
        return new ResponseEntity<>(questionService.deleteQuestionById(id), HttpStatus.OK);
    }
}
