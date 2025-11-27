import { useState } from 'react';
import './HelpPanel.css';

export default function HelpPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="help-trigger"
        onClick={() => setIsOpen(!isOpen)}
        title="Help"
        aria-label="Open help panel"
      >
        ?
      </button>

      {isOpen && (
        <div className="help-overlay" onClick={() => setIsOpen(false)}>
          <div className="help-panel" onClick={(e) => e.stopPropagation()}>
            <div className="help-header">
              <h2>How to use</h2>
              <button
                className="help-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close help"
              >
                ×
              </button>
            </div>

            <div className="help-content">
              <section className="help-section">
                <h3>Voice Assistant</h3>
                <p>Ask questions about how to use the interface:</p>
                <ul>
                  <li>"How do I create a task?"</li>
                  <li>"How do I move tasks?"</li>
                  <li>"How do I edit or delete tasks?"</li>
                  <li>"What are the columns for?"</li>
                </ul>
                <div className="help-note">
                  <strong>Note:</strong> The assistant teaches you how to use the interface.
                  It does not access your data or perform actions for you.
                </div>
              </section>

              <section className="help-section">
                <h3>Manual Actions</h3>
                <ul>
                  <li><strong>Add task:</strong> Click "+ Add task" in any column</li>
                  <li><strong>Move task:</strong> Drag and drop between columns</li>
                  <li><strong>Edit task:</strong> Click on a task card</li>
                  <li><strong>Delete task:</strong> Click the × icon</li>
                </ul>
              </section>

              <section className="help-section">
                <h3>Columns</h3>
                <ul>
                  <li><strong>To Do:</strong> Tasks not started yet</li>
                  <li><strong>In Progress:</strong> Currently working on</li>
                  <li><strong>Done:</strong> Completed tasks</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
