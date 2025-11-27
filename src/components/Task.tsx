import { useState } from 'react';
import { Task as TaskType, TaskStatus } from '../types/kanban';
import './Task.css';

interface TaskProps {
  task: TaskType;
  onMove: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, title: string, description?: string) => void;
}

export default function Task({ task, onMove, onDelete, onEdit }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  const handleSave = () => {
    if (title.trim()) {
      onEdit(task.id, title.trim(), description.trim() || undefined);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || '');
    setIsEditing(false);
  };

  const moveLeft = () => {
    if (task.status === 'inProgress') onMove(task.id, 'todo');
    if (task.status === 'done') onMove(task.id, 'inProgress');
  };

  const moveRight = () => {
    if (task.status === 'todo') onMove(task.id, 'inProgress');
    if (task.status === 'inProgress') onMove(task.id, 'done');
  };

  const canMoveLeft = task.status !== 'todo';
  const canMoveRight = task.status !== 'done';

  if (isEditing) {
    return (
      <div className="task editing">
        <input
          type="text"
          className="task-edit-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          className="task-edit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={2}
        />
        <div className="task-edit-actions">
          <button onClick={handleCancel} className="task-edit-cancel">
            Cancel
          </button>
          <button onClick={handleSave} className="task-edit-save" disabled={!title.trim()}>
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="task"
      draggable
      onDragStart={handleDragStart}
      onClick={() => setIsEditing(true)}
    >
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <button
          className="task-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          aria-label="Delete task"
        >
          ×
        </button>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-actions">
        <button
          className="task-move"
          onClick={(e) => {
            e.stopPropagation();
            moveLeft();
          }}
          disabled={!canMoveLeft}
          aria-label="Move left"
        >
          ←
        </button>
        <button
          className="task-move"
          onClick={(e) => {
            e.stopPropagation();
            moveRight();
          }}
          disabled={!canMoveRight}
          aria-label="Move right"
        >
          →
        </button>
      </div>
    </div>
  );
}
