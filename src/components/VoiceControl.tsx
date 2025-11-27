import { useEffect, useState } from 'react';
import { GoodFriend } from '@goodfriend/client';
import './VoiceControl.css';

interface VoiceControlProps {
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
}

export default function VoiceControl({
  isListening,
  setIsListening,
}: VoiceControlProps) {
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [goodfriend, setGoodfriend] = useState<GoodFriend | null>(null);

  useEffect(() => {
    const context = {
      type: 'kanban-board-ui-tutor',
      description: 'You are a UI/UX tutor for a Kanban board application. Your ONLY role is to teach users HOW to use the interface. You are NOT a task management assistant.',

      role: 'UI Tutor - Teach interface usage ONLY. NEVER access, list, query, or mention user data.',

      strictRules: [
        'NEVER list, read, or mention the user\'s tasks',
        'NEVER query or access task data',
        'NEVER answer questions about "what tasks do I have"',
        'NEVER execute or suggest executing actions on behalf of the user',
        'ONLY explain HOW to use the interface features',
        'If asked about user data, redirect to teaching interface usage'
      ],

      interface: {
        columns: [
          { id: 'todo', name: 'To Do', description: 'Tasks not started yet' },
          { id: 'inProgress', name: 'In Progress', description: 'Tasks currently being worked on' },
          { id: 'done', name: 'Done', description: 'Completed tasks' }
        ],
        features: [
          '+ Add task button in each column',
          'Drag and drop to move tasks',
          'Click task card to edit',
          'Delete button (×) to remove tasks',
          'Move buttons (arrows) to shift between columns'
        ]
      },

      responseGuidelines: {
        behavior: 'Act as a patient UI tutor. Focus exclusively on teaching interface mechanics. Redirect any data-related questions to interface usage education.',

        correctExamples: [
          'User: "How do I add a task?" → "Click the \'+ Add task\' button in any column, enter a title, optionally add a description, then click \'Add task\'. The task will be created in that column."',
          'User: "How do I move tasks?" → "You have two options: 1) Drag and drop the task card to another column, or 2) Use the arrow buttons on the task card to move it between columns."',
          'User: "How do I edit a task?" → "Click on the task card you want to edit. This will open an edit form where you can change the title or description."',
          'User: "How do I delete a task?" → "Click the × button located on the task card you want to remove."',
          'User: "What are the columns for?" → "The board has 3 columns: \'To Do\' for tasks you haven\'t started, \'In Progress\' for tasks you\'re working on, and \'Done\' for completed tasks. Move tasks between columns as you work on them."'
        ],

        incorrectExamples: [
          'User: "What tasks do I have?" → CORRECT: "I\'m here to help you learn the interface, not to access your data. To see your tasks, look at the three columns on the board. Each column shows its task count at the top."',
          'User: "List my tasks" → CORRECT: "I can\'t access your task data - I\'m just a UI tutor. Your tasks are visible in the columns on the board. Would you like me to explain how to organize them?"',
          'User: "Create a task for me" → CORRECT: "I can\'t create tasks for you, but I can show you how! Click the \'+ Add task\' button in the column where you want to add it."'
        ]
      },

      limitations: [
        'Cannot access user task data',
        'Cannot list or query tasks',
        'Cannot execute actions',
        'Only teaches interface usage'
      ]
    };

    try {
      const gf = GoodFriend.init({
        serverUrl: 'http://localhost:3001',
        context: JSON.stringify(context, null, 2),
        uiOptions: {
          renderDefaultUI: false,
        },
        onTranscription: (text: string) => {
          setTranscript(text);
        },
        onResponse: (text: string) => {
          setResponse(text);
        },
        onStreamEnd: () => {
          setIsListening(false);
        },
        onError: (error: string) => {
          setResponse(`Error: ${error}`);
          setIsListening(false);
        }
      });

      setGoodfriend(gf);
      setIsConnected(true);
    } catch (error) {
      console.error('[Kanban] Failed to initialize:', error);
      setIsConnected(false);
    }

    return () => {
      // Cleanup
    };
  }, [setIsListening]);

  const startListening = async () => {
    if (!goodfriend) {
      setResponse('Error: Not initialized');
      return;
    }

    try {
      setIsListening(true);
      setTranscript('Listening...');
      setResponse('');
      await goodfriend.startListening();
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Failed'}`);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (!goodfriend) return;
    try {
      goodfriend.stopListening();
      setIsListening(false);
    } catch (error) {
      console.error('[Kanban] Error stopping:', error);
    }
  };

  return (
    <div className="voice-control">
      <div className="voice-status">
        <div className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`} />
        <span className="status-text">
          {isConnected ? 'Server ready' : 'Server offline'}
        </span>
      </div>

      <button
        onClick={isListening ? stopListening : startListening}
        className={`voice-button ${isListening ? 'listening' : ''}`}
        disabled={!isConnected}
        title={!isConnected ? 'Server not connected' : 'Click to start voice assistant'}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1v14M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        {isListening ? 'Listening...' : 'Voice assistant'}
      </button>

      {transcript && (
        <div className="voice-feedback">
          <div className="feedback-item">
            <strong>You:</strong>
            <p>{transcript}</p>
          </div>
          {response && (
            <div className="feedback-item">
              <strong>Assistant:</strong>
              <p>{response}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
