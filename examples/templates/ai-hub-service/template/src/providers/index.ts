export interface AnswerRequest {
  prompt: string;
  model?: string;
}

export interface Answer {
  text: string;
  model: string;
  provider: string;
}

export interface Provider {
  name: string;
  complete(request: AnswerRequest): Promise<Answer>;
}
