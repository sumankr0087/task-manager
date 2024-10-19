const TaskList = ({ taskList = [], setTaskList, onEdit }) => {
    const handleToggleComplete = (id) => {
        const updatedTasks = taskList.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTaskList(updatedTasks);
    };

    const handleDelete = (id) => {
        const updatedTasks = taskList.filter(task => task.id !== id);
        setTaskList(updatedTasks);
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
                        <div className="flex justify-between">
                            <h3 className="text-xl text-gray-700 font-bold">{task.title}</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEdit(task)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                >
                                    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>

                        </div>

                        <p className="text-gray-700">{task.description}</p>
                        <p className="text-sm text-gray-700 font-semibold mt-2">
                            Priority: <span className={`text-sm font-semibold mt-2 ${task.priority === 'high' ? 'text-red-600' : task.priority === 'medium' ? 'text-yellow-500' : 'text-green-600'}`}> {task.priority} </span>
                        </p>
                        <p className="text-sm text-gray-700 mt-1">Status: {task.completed ? "Completed" : "Pending"}</p>
                        <div className="mt-4">
                            <button
                                onClick={() => handleToggleComplete(task.id)}
                                className={`px-3 py-1 rounded ${task.completed ? 'bg-green-500' : 'bg-blue-500'} text-white hover:${task.completed ? 'bg-green-600' : 'bg-blue-600'}`}
                            >
                                {task.completed ? "Completed" : "Mark as Completed"}
                            </button>


                        </div>
                    </div>
                ))}
        </div>
    );
};

export default TaskList;
