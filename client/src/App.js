// client/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorBoundary from './components/ErrorBoundary'; // Assuming you created this file
import BugList from './components/BugList';           // Placeholder for your bug list component
import BugForm from './components/BugForm';             // Placeholder for your bug form component
import './App.css'; 

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch bugs
  const fetchBugs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/bugs');
      setBugs(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching bugs:", err);
      // Update state for UI to show error message
      setError("Failed to fetch bugs. Check server connection."); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>🐞 MERN Bug Tracker</h1>
      </header>
      
      {/* The ErrorBoundary protects the potentially volatile components 
        like BugForm and BugList from crashing the entire application.
      */}
      <ErrorBoundary>
        <section className="bug-management">
          <h2>Report a New Bug</h2>
          <BugForm onBugAdded={fetchBugs} />
        </section>

        <section className="bug-list">
          <h2>Reported Issues</h2>
          {loading && <p>Loading bugs...</p>}
          {error && <p className="error-message">Error: {error}</p>}
          
          {/* Render BugList only if not loading and no error (or render empty list) */}
          {!loading && !error && <BugList bugs={bugs} onBugUpdated={fetchBugs} onBugDeleted={fetchBugs} />}
        </section>
      </ErrorBoundary>
      
    </div>
  );
}

export default App;