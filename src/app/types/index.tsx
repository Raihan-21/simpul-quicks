interface Quick {
  index: number;
  id: string;
  icon: string;
  iconColor: string;
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
  created_at: Date;
  updated_at: Date;
}

interface ChatSession {
  id: number;
  is_group: boolean;
  lastMessage: ChatMessage;
  members: any;
  name?: string;
  created_at: Date;
  updated_at: Date;
}

interface ChatMember {
  id: number;
  idUser: number;
  idChatSession: number;
}

interface ChatMessage {
  id: number;
  id_user: number;
  user: User;
  id_chat_session: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export type { Quick, Task, User, ChatSession, ChatMember, ChatMessage };
