export interface Task {
  id: number;
  body: string;
  priority?: boolean;
  completed?: boolean;
}