// Trello REST API client
const TRELLO_API_KEY = process.env.TRELLO_API_KEY!;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN!;
const BASE_URL = 'https://api.trello.com/1';

function authParams() {
  return `key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`;
}

async function trelloFetch(path: string, options?: RequestInit) {
  const sep = path.includes('?') ? '&' : '?';
  const url = `${BASE_URL}${path}${sep}${authParams()}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Trello API error ${res.status}: ${text}`);
  }
  return res.json();
}

export interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  due: string | null;
  labels: { id: string; name: string; color: string }[];
  idList: string;
  url: string;
  shortUrl: string;
}

export async function getBoardCards(boardId: string): Promise<TrelloCard[]> {
  return trelloFetch(`/boards/${boardId}/cards?fields=id,name,desc,due,labels,idList,url,shortUrl`);
}

export async function getCard(cardId: string): Promise<TrelloCard> {
  return trelloFetch(`/cards/${cardId}?fields=id,name,desc,due,labels,idList,url,shortUrl`);
}

export async function moveCardToList(cardId: string, listId: string): Promise<void> {
  await trelloFetch(`/cards/${cardId}?idList=${listId}`, { method: 'PUT' });
}

export async function addComment(cardId: string, text: string): Promise<void> {
  await trelloFetch(`/cards/${cardId}/actions/comments?text=${encodeURIComponent(text)}`, { method: 'POST' });
}

export async function addAttachment(cardId: string, url: string, name: string): Promise<void> {
  await trelloFetch(`/cards/${cardId}/attachments?url=${encodeURIComponent(url)}&name=${encodeURIComponent(name)}`, { method: 'POST' });
}

export async function getBoardLists(boardId: string): Promise<{ id: string; name: string }[]> {
  return trelloFetch(`/boards/${boardId}/lists?fields=id,name`);
}
