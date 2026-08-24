import { search, IndexedDocument } from './indexer.js';

export interface Question {
  id: string;
  text: string;
}

export interface CitedAnswer {
  questionId: string;
  answer: string;
  sources: Array<{ title: string; url: string }>;
}

const aiHubUrl = process.env.AI_HUB_URL;

async function callAiHub(prompt: string): Promise<string> {
  if (!aiHubUrl) {
    return 'AI Hub is not configured (set AI_HUB_URL). This is a stub answer.';
  }
  const res = await fetch(`${aiHubUrl}/v1/answer`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) {
    throw new Error(`AI Hub responded ${res.status}`);
  }
  const body = (await res.json()) as { text?: string };
  return body.text ?? '';
}

function buildPrompt(question: string, context: IndexedDocument[]): string {
  const passages = context
    .map(d => `# ${d.title}\n${d.content}`)
    .join('\n\n');
  return [
    'Answer the question using only the context below. Cite sources.',
    '',
    '## Context',
    passages || '(no context found)',
    '',
    `## Question\n${question}`,
  ].join('\n');
}

export async function answer(question: Question): Promise<CitedAnswer> {
  const context = search(question.text);
  const text = await callAiHub(buildPrompt(question.text, context));
  return {
    questionId: question.id,
    answer: text,
    sources: context.map(d => ({ title: d.title, url: d.url })),
  };
}
