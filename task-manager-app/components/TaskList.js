const TaskList = ({ taskList = [], setTaskList, onEdit }) => {
    const handleToggleComplete = (id) => {
      setTaskList(taskList.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    };
  
    const handleDelete = (id) => {
      setTaskList(taskList.filter(task => task.id !== id));
    };
  
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {taskList
          .sort((a, b) => {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          })
          .map(task => (
            <div key={task.id} className='bg-white shadow-lg rounded-lg p-4 border'>
              <h3 className="text-xl text-gray-700 font-bold">{task.title}</h3>
              <p className="text-gray-700">{task.description}</p>
              <p className={`text-sm font-semibold mt-2 ${task.priority === 'high' ? 'text-red-600' : task.priority === 'medium' ? 'text-yellow-500' : 'text-green-600'}`}>
                Priority: {task.priority}
              </p>
              <p className="text-sm text-gray-700 mt-1">Status: {task.completed ? "Completed" : "Pending"}</p>
              <div className="mt-4 flex space-x-2">
                <button 
                  onClick={() => handleToggleComplete(task.id)} 
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Toggle Complete
                </button>
                <button 
                  onClick={() => onEdit(task)} 
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(task.id)} 
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    );
  };
  
  export default TaskList;
  