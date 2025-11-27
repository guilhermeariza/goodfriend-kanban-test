import { useState, useEffect } from 'react';
import Board from './components/Board';
import VoiceControl from './components/VoiceControl';
import HelpPanel from './components/HelpPanel';
import { Task, TaskStatus } from './types/kanban';
import './App.css';

const STORAGE_KEY = 'goodfriend-kanban-tasks';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTaskWithStatus = (title: string, description?: string, status: TaskStatus = 'todo') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status,
      createdAt: Date.now(),
    };
    setTasks([...tasks, newTask]);
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const editTask = (taskId: string, title: string, description?: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, title, description } : task
    ));
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Kanban Board</h1>
          <p className="subtitle">Organize your tasks</p>
        </div>
        <VoiceControl
          isListening={isListening}
          setIsListening={setIsListening}
        />
      </header>

      <main className="app-main">
        <Board
          tasks={tasks}
          onMoveTask={moveTask}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          onAddTask={addTaskWithStatus}
        />
      </main>

      <footer className="app-footer">
        <p>
          Click <strong>+ Add task</strong> to create tasks, or use the <strong>voice assistant</strong> to learn how to use the interface
        </p>
      </footer>

      <HelpPanel />
    </div>
  );
}

export default App;
