// News fetcher - Server side only
// This module should be imported only in Node.js context

export function loadNews() {
  return { articles: [], lastUpdated: null };
}

export async function refreshNews() {
  return [];
}
