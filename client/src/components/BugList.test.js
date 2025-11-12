import { render, screen, fireEvent } from '@testing-library/react';
import BugList from './BugList';
import '@testing-library/jest-dom';

const mockUpdate = jest.fn();
const mockDelete = jest.fn();

// --- Test Case 1: Empty List State ---
test('should render the empty state message when the bugs array is empty', () => {
  render(
    <BugList 
      bugs={[]} 
      onBugUpdated={mockUpdate} 
      onBugDeleted={mockDelete} 
    />
  );
  
  // Check for the specific empty state text
  expect(screen.getByText(/No bugs have been reported yet/i)).toBeInTheDocument();
  // Ensure bug items are NOT rendered
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
});

// --- Test Case 2: Rendering with Data ---
test('should render a list of bugs and handle button clicks', () => {
  const mockBugs = [
    { _id: 'a1', title: 'Login Failed', description: 'User cannot login.', status: 'open' },
    { _id: 'b2', title: 'CSS Glitch', description: 'Button looks wrong.', status: 'resolved' },
  ];

  render(
    <BugList 
      bugs={mockBugs} 
      onBugUpdated={mockUpdate} 
      onBugDeleted={mockDelete} 
    />
  );
  
  // Check if both bugs are rendered
  expect(screen.getByText(/Login Failed/i)).toBeInTheDocument();
  expect(screen.getByText(/CSS Glitch/i)).toBeInTheDocument();
  
  // Simulate clicking the "Delete" button on the first bug
  const deleteButtons = screen.getAllByText(/Delete/i);
  fireEvent.click(deleteButtons[0]);
  
  // Verify that the delete handler was called with the correct ID
  expect(mockDelete).toHaveBeenCalledTimes(1);
  expect(mockDelete).toHaveBeenCalledWith('a1');
});