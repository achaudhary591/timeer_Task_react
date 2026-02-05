import './App.css'
import TaskManager from './components/TaskManager'
import TimerManager from './components/TimerManager'
import Counter from './components/Counter'
import NoteKeeper from './components/NoteKeeper'

function App() {
  return (
    <div className="app">
      <div className="main-container">
        <h1>Productivity Hub</h1>
        
        <div className="sections">
          <TaskManager />
          <TimerManager />
          <NoteKeeper />
          
          <div className="section">
            <h2>🔢 Counters</h2>
            <div className="counters-grid">
              <Counter title="Work Sessions" initialValue={0} step={1} />
              <Counter title="Coffee Cups" initialValue={0} step={1} />
              <Counter title="Pages Read" initialValue={0} step={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
