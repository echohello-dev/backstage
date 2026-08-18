import { answer, CitedAnswer, Question } from './api.js';

export interface Queue {
  receive(): Promise<Question | undefined>;
  ack(question: Question, result: CitedAnswer): Promise<void>;
  nack(question: Question, error: unknown): Promise<void>;
}

const pollIntervalMs = Number(process.env.QUEUE_POLL_INTERVAL_MS ?? 5000);

export async function consume(queue: Queue): Promise<never> {
  for (;;) {
    const question = await queue.receive();
    if (!question) {
      await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
      continue;
    }
    try {
      const result = await answer(question);
      await queue.ack(question, result);
    } catch (error) {
      await queue.nack(question, error);
    }
  }
}
