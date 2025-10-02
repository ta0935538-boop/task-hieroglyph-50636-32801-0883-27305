export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  parentId: string | null;
  order: number;
  createdAt: number;
  updatedAt: number;
  promptMode?: 'full-code' | 'code-changes' | 'notes';
  technologies?: string[];
  notes?: string;
  fontSize?: number;
}

export interface Workspace {
  id: string;
  name: string;
  todos: Todo[];
  createdAt: number;
}

export interface ContextMenuPosition {
  x: number;
  y: number;
}

export interface SavedTask {
  id: string;
  text: string;
  usageCount: number;
}
