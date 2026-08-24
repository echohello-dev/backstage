export interface IndexedDocument {
  id: string;
  title: string;
  url: string;
  content: string;
}

const documents: IndexedDocument[] = [];

export function indexDocument(doc: IndexedDocument): void {
  documents.push(doc);
}

export function search(query: string, limit = 5): IndexedDocument[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return documents
    .map(doc => ({
      doc,
      score: terms.filter(
        t =>
          doc.title.toLowerCase().includes(t) ||
          doc.content.toLowerCase().includes(t),
      ).length,
    }))
    .filter(hit => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(hit => hit.doc);
}
