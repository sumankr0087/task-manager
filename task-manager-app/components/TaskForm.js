import { useState, useEffect } from 'react';

const TaskForm = ({ setTaskList, onClose, currentTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');

    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.title);
            setDescription(currentTask.description);
            setPriority(currentTask.priority);
        } else {
            setTitle('');
            setDescription('');
            setPriority('low');
        }
    }, [currentTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: currentTask ? currentTask.id : Date.now(),
            title,
            description,
            priority,
            completed: currentTask ? currentTask.completed : false,
        };

        setTaskList(prev => {
            if (currentTask) {
                return prev.map(task => (task.id === currentTask.id ? newTask : task));
            } else {
                return [...prev, newTask];
            }
        });

        setTitle('');
        setDescription('');
        setPriority('low');
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className='flex justify-between'>
            <p className='text-xl text-gray-700 font-bold'>Add Task</p>
            <span onClick={onClose} className='text-xl cursor-pointer text-gray-700 '>X</span>
            </div>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                required
                className="w-full border text-black border-gray-300 p-2 rounded"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
                required
                className="w-full border text-black border-gray-300 p-2 rounded"
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border text-black border-gray-300 p-2 rounded"
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
                {currentTask ? 'Update Task' : 'Save Task'}
            </button>
        </form>
    );
};

export default TaskForm;
