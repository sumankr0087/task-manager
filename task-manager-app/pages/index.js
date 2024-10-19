import { useEffect, useState } from 'react';
import { tasks } from '../data/tasks';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Home = () => {
  const [taskList, setTaskList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load tasks from local storage on initial mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
    } else {
      setTaskList(tasks); // Set initial tasks if no stored tasks are found
    }
  }, []);

  // Store tasks in local storage whenever taskList changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }, [taskList]);

  const handleModalOpen = (task = null) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleEditTask = (task) => {
    handleModalOpen(task);
  };

  // Filter tasks based on the search term
  const filteredTasks = taskList.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between'>
        <h1 className="text-2xl font-bold mb-4">Task Management App</h1>
        <button 
          onClick={() => handleModalOpen()} // Open modal for adding new task
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Task
        </button>
      </div>

      {/* Search Bar */}
      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="border border-gray-300 p-2 rounded w-full mb-4"
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <span 
              className="absolute top-2 right-2 cursor-pointer text-gray-500 text-xl" 
              onClick={handleModalClose}
            >
              &times;
            </span>
            <TaskForm setTaskList={setTaskList} onClose={handleModalClose} currentTask={currentTask} />
          </div>
        </div>
      )}

      <TaskList taskList={filteredTasks} setTaskList={setTaskList} onEdit={handleEditTask} />
    </div>
  );
};

export default Home;
