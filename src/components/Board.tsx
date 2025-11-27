import { Task, TaskStatus } from '../types/kanban';
import Column from './Column';
import './Board.css';

interface BoardProps {
  tasks: Task[];
  onMoveTask: (taskId: string, newStatus: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string, title: string, description?: string) => void;
  onAddTask: (title: string, description: string | undefined, status: TaskStatus) => void;
}

const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export default function Board({ tasks, onMoveTask, onDeleteTask, onEditTask, onAddTask }: BoardProps) {
  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="board">
      {COLUMNS.map(column => (
        <Column
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={getTasksByStatus(column.id)}
          onMoveTask={onMoveTask}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
          onAddTask={onAddTask}
        />
      ))}
    </div>
  );
}
