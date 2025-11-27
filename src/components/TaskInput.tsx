import { useState } from 'react';
import './TaskInput.css';

interface TaskInputProps {
  onAddTask: (title: string, description?: string) => void;
  placeholder?: string;
}

export default function TaskInput({ onAddTask, placeholder = "Task name" }: TaskInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
      onAddTask(title.trim(), description.trim() || undefined);
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <button
        className="task-input-trigger"
        onClick={() => setIsExpanded(true)}
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Add task
      </button>
    );
  }

  return (
    <form className="task-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input-title"
        placeholder={placeholder}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />

      <textarea
        className="task-input-description"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
      />

      <div className="task-input-actions">
        <button
          type="button"
          className="task-input-cancel"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="task-input-submit"
          disabled={!title.trim()}
        >
          Add task
        </button>
      </div>
    </form>
  );
}
