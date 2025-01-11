export interface Question {
  id: number;
  questionText: string;
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  correctOption: string;
  difficultyLevel: string;
  category: string;
  selectedOption?: string; // Track user's selected answer
  options?: string[];      // Optional, for convenience
  isIncorrect?: boolean;   // Flag to indicate if the answer is incorrect
}
