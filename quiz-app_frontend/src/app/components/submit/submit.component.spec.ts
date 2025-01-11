import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-submit',
  standalone: true,
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css'],
})
export class SubmitComponent {
  responses = [{ id: 1, response: 'berlin' }, { id: 52, response: 'paris' }];
  result: number | null = null;

  constructor(private quizService: QuizService) {}

  submitQuiz(): void {
    this.quizService.submitQuiz(1, this.responses).subscribe(result => {
      this.result = result;
    });
  }
}
