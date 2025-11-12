import React from 'react';

const BugList = ({ bugs, onBugUpdated, onBugDeleted }) => {
    
    // Handler placeholders (to be fleshed out with API calls later)
    const handleUpdateStatus = (id, currentStatus) => {
        // Logic to toggle status (e.g., open -> in-progress -> resolved)
        console.log(`Updating bug ${id} status from ${currentStatus}`);
        // In a real app: axios.put(`/api/bugs/${id}`, { status: newStatus }).then(onBugUpdated);
    };

    const handleDelete = (id) => {
        console.log(`Deleting bug ${id}`);
        // In a real app: axios.delete(`/api/bugs/${id}`).then(onBugDeleted);
    };

    // Requirement: Ensure proper rendering of UI elements under different states (e.g., empty list)
    if (!bugs || bugs.length === 0) {
        return (
            <div className="bug-list-empty-state">
                <p>🎉 All clear! No bugs have been reported yet.</p>
                <p>Use the form above to report a new issue.</p>
            </div>
        );
    }

    return (
        <ul className="bug-list">
            {bugs.map(bug => (
                <li key={bug._id} className={`bug-item status-${bug.status}`}>
                    <div className="bug-item-header">
                        <span className={`bug-status status-${bug.status}`}>{bug.status.toUpperCase()}</span>
                        <h3>{bug.title}</h3>
                    </div>
                    <p className="bug-description">{bug.description || 'No description provided.'}</p>
                    <div className="bug-actions">
                        <button 
                            onClick={() => handleUpdateStatus(bug._id, bug.status)}
                            className="btn-update"
                        >
                            Change Status
                        </button>
                        <button 
                            onClick={() => handleDelete(bug._id)}
                            className="btn-delete"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default BugList;