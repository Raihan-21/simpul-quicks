interface Action {
  id: string;
  icon: string;
  buttonColor: string;
  onClick: () => void;
}

interface Task {
  id: number;
  title: string;
  description?: string;
  isNew?: boolean;
  type: string;
  completed: boolean;
  createdAt: Date;
  dueDate: Date | null;
}

interface User {
  id: number;
  name: string;
}

interface ChatSession {
  id: number;
  name?: string;
  createdAt: Date;
}

interface ChatMember {
  id: number;
  idUser: number;
  idChatSession: number;
}

interface ChatMessage {
  id: number;
  idUser: number;
  content: string;
  idMessage?: string;
}

export type { Action, Task, User, ChatSession, ChatMember, ChatMessage };
