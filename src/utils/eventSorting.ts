export interface SortableEvent {
  date?: string;
  [key: string]: any;
}

export function sortEventsByDate<T extends SortableEvent>(events: T[] = [], ascending = true): T[] {
  if (!Array.isArray(events)) return [];
  return [...events].sort((a, b) => {
    const timeA = new Date(a?.date || 0).getTime() || 0;
    const timeB = new Date(b?.date || 0).getTime() || 0;
    return ascending ? timeA - timeB : timeB - timeA;
  });
}
