import { Task, TaskStatus } from '../types/kanban';
import TaskCard from './Task';
import TaskInput from './TaskInput';
import './Column.css';

interface ColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  onMoveTask: (taskId: string, newStatus: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string, title: string, description?: string) => void;
  onAddTask: (title: string, description: string | undefined, status: TaskStatus) => void;
}

export default function Column({
  id,
  title,
  tasks,
  onMoveTask,
  onDeleteTask,
  onEditTask,
  onAddTask,
}: ColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onMoveTask(taskId, id);
    }
  };

  const handleAddTask = (title: string, description?: string) => {
    onAddTask(title, description, id);
  };

  return (
    <div className="column">
      <div className="column-header">
        <h2>{title}</h2>
        <span className="task-count">{tasks.length}</span>
      </div>

      <div
        className="column-content"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <TaskInput onAddTask={handleAddTask} placeholder={`Task for ${title}`} />

        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onMove={onMoveTask}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
