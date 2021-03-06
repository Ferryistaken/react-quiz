import { shuffleArray} from "./utils";

export type Question = {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
}

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
	e = "easy",
	m = "medium",
	h = "hard",
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
	const endpoint = `https://opentdb.com/api.php?amount=${amount}&$difficulty=${difficulty}&type=multiple`;

	// first await is for fetch, second is for creating json
	const data = await (await fetch(endpoint)).json();

	return data.results.map((question: Question) => ({
			...question,
			answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
	}));
};