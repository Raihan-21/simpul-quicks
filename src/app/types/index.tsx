interface action {
  id: string;
  icon: string;
  buttonColor: string;
  onClick: () => void;
}

interface task {
  id: number;
  title: string;
  description?: string;
  isNew?: boolean;
  type: string;
  completed: boolean;
  createdAt: Date;
  dueDate: Date | null;
}

export type { action, task };
