function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done': // ✅ FIXED
        return 'text-green-600 dark:text-green-400';
      case 'In Progress':
        return 'text-amber-500 dark:text-amber-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  return (<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow"> <div className="flex justify-between items-start mb-3">
    <h3
      className={`text-lg font-bold ${task.status === 'Done'
        ? 'line-through text-gray-400 dark:text-gray-500'
        : 'text-gray-900 dark:text-white'
        }`}
    >
      {task.title} </h3>
    <span
      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
        task.priority
      )}`}
    >
      {task.priority || 'Low'} </span> </div>


    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
      {task.description?.replace(/```/g, '')}
    </p>

    <div className="flex justify-between items-center text-sm mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
      <div className="flex flex-col space-y-1">
        <span
          className={`font-medium flex items-center gap-1 ${getStatusColor(
            task.status
          )}`}
        >
          {task.status === 'Done' && (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          {/* Show user-friendly label */}
          {task.status === 'Done' ? 'Completed' : task.status}
        </span>

        {task.dueDate && (
          <span className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {task.status !== 'Done' && (
          <button
            onClick={() => onStatusChange(task._id, 'Done')} // ✅ FIXED
            className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
            title="Mark Completed"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        )}

        <button
          onClick={() => onEdit(task)}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
          title="Edit Task"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
          title="Delete Task"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>


  );
}

export default TaskCard;
