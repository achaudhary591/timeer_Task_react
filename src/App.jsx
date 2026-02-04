import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState('all')
  const [timers, setTimers] = useState([])
  const [timerName, setTimerName] = useState('')
  const [timerMinutes, setTimerMinutes] = useState('')

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: inputValue, 
        completed: false 
      }])
      setInputValue('')
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const addTimer = () => {
    if (timerName.trim() && timerMinutes > 0) {
      const newTimer = {
        id: Date.now(),
        name: timerName,
        totalSeconds: parseInt(timerMinutes) * 60,
        remainingSeconds: parseInt(timerMinutes) * 60,
        isRunning: false,
        isCompleted: false
      }
      setTimers([...timers, newTimer])
      setTimerName('')
      setTimerMinutes('')
    }
  }

  const startTimer = (id) => {
    setTimers(timers.map(timer => 
      timer.id === id ? { ...timer, isRunning: true } : timer
    ))
  }

  const pauseTimer = (id) => {
    setTimers(timers.map(timer => 
      timer.id === id ? { ...timer, isRunning: false } : timer
    ))
  }

  const resetTimer = (id) => {
    setTimers(timers.map(timer => 
      timer.id === id ? { 
        ...timer, 
        remainingSeconds: timer.totalSeconds, 
        isRunning: false, 
        isCompleted: false 
      } : timer
    ))
  }

  const deleteTimer = (id) => {
    setTimers(timers.filter(timer => timer.id !== id))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => 
        prevTimers.map(timer => {
          if (timer.isRunning && timer.remainingSeconds > 0) {
            const newRemaining = timer.remainingSeconds - 1
            if (newRemaining === 0) {
              // Timer completed - show alert
              alert(`⏰ Timer "${timer.name}" completed!`)
              return { ...timer, remainingSeconds: 0, isRunning: false, isCompleted: true }
            }
            return { ...timer, remainingSeconds: newRemaining }
          }
          return timer
        })
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <div className="app">
      <div className="main-container">
        <h1>Productivity Hub</h1>
        
        <div className="sections">
          {/* Task Manager Section */}
          <div className="section">
            <h2>📝 Task Manager</h2>
            <div className="input-section">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="Add a new task..."
                className="task-input"
              />
              <button onClick={addTask} className="add-btn">Add</button>
            </div>

            <div className="filters">
              <button 
                className={filter === 'all' ? 'active' : ''} 
                onClick={() => setFilter('all')}
              >
                All ({tasks.length})
              </button>
              <button 
                className={filter === 'active' ? 'active' : ''} 
                onClick={() => setFilter('active')}
              >
                Active ({tasks.filter(t => !t.completed).length})
              </button>
              <button 
                className={filter === 'completed' ? 'active' : ''} 
                onClick={() => setFilter('completed')}
              >
                Completed ({tasks.filter(t => t.completed).length})
              </button>
            </div>

            <div className="task-list">
              {filteredTasks.map(task => (
                <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="task-text">{task.text}</span>
                  <button 
                    onClick={() => deleteTask(task.id)} 
                    className="delete-btn"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {filteredTasks.length === 0 && (
                <p className="empty-state">No tasks found</p>
              )}
            </div>
          </div>

          {/* Timer Section */}
          <div className="section">
            <h2>⏱️ Timer Manager</h2>
            <div className="input-section">
              <input
                type="text"
                value={timerName}
                onChange={(e) => setTimerName(e.target.value)}
                placeholder="Timer name..."
                className="timer-input"
              />
              <input
                type="number"
                value={timerMinutes}
                onChange={(e) => setTimerMinutes(e.target.value)}
                placeholder="Minutes"
                min="1"
                className="timer-minutes"
              />
              <button onClick={addTimer} className="add-btn">Add Timer</button>
            </div>

            <div className="timer-list">
              {timers.map(timer => (
                <div key={timer.id} className={`timer-card ${timer.isCompleted ? 'completed' : ''}`}>
                  <div className="timer-header">
                    <h3>{timer.name}</h3>
                    <button 
                      onClick={() => deleteTimer(timer.id)} 
                      className="delete-btn"
                    >
                      ✕
                    </button>
                  </div>
                  <div className={`timer-display ${timer.remainingSeconds <= 10 && timer.remainingSeconds > 0 ? 'warning' : ''}`}>
                    {formatTime(timer.remainingSeconds)}
                  </div>
                  <div className="timer-controls">
                    {!timer.isRunning ? (
                      <button 
                        onClick={() => startTimer(timer.id)} 
                        className="start-btn"
                        disabled={timer.remainingSeconds === 0}
                      >
                        ▶️ Start
                      </button>
                    ) : (
                      <button 
                        onClick={() => pauseTimer(timer.id)} 
                        className="pause-btn"
                      >
                        ⏸️ Pause
                      </button>
                    )}
                    <button 
                      onClick={() => resetTimer(timer.id)} 
                      className="reset-btn"
                    >
                      🔄 Reset
                    </button>
                  </div>
                  {timer.isCompleted && (
                    <div className="completion-badge">✅ Completed!</div>
                  )}
                </div>
              ))}
              {timers.length === 0 && (
                <p className="empty-state">No timers created</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
