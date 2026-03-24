import { useState, useEffect } from 'react';
import api from '../api/axios';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

function Dashboard() {
  // ================= STATE =================
  const [tasks, setTasks] = useState({
    tasks: [],
    pages: 1,
    page: 1,
    total: 0,
  });

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);

  // ================= STYLES =================
  const inputClass =
    "px-3 py-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600";

  const selectClass = inputClass;

  // ================= FETCH =================
  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');

    try {
      const statsRes = await api.get('/tasks/analytics');
      setStats(statsRes.data);

      const queryParams = new URLSearchParams({
        page,
        limit: 9,
        sortBy: sortField,
        order: sortOrder,
      });

      if (search) queryParams.append('search', search);
      if (statusFilter) queryParams.append('status', statusFilter);
      if (priorityFilter) queryParams.append('priority', priorityFilter);

      const tasksRes = await api.get(`/tasks?${queryParams.toString()}`);
      setTasks(tasksRes.data);

    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // ================= EFFECT =================
  useEffect(() => {
    fetchDashboardData();
    window.scrollTo(0, 0);
  }, [page, sortField, sortOrder, statusFilter, priorityFilter]);

  // ================= HANDLERS =================
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchDashboardData();
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, taskData);
      } else {
        await api.post('/tasks', taskData);
      }
      setIsModalOpen(false);
      fetchDashboardData();
    } catch {
      alert('Failed to save task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Delete this task?')) {
      await api.delete(`/tasks/${taskId}`);
      fetchDashboardData();
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    await api.put(`/tasks/${taskId}`, { status: newStatus });
    fetchDashboardData();
  };

  // ================= UI =================
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>
        <button
          onClick={handleCreateTask}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          New Task
        </button>
      </div>

      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* ANALYTICS */}
      {stats && (
        <div className="grid md:grid-cols-4 gap-4">
          <div className="card">
            <h3>Total Tasks</h3>
            <p>{stats.total}</p>
          </div>
          <div className="card">
            <h3>Completed</h3>
            <p className="text-green-500">{stats.completed}</p>
          </div>
          <div className="card">
            <h3>Pending</h3>
            <p className="text-yellow-500">{stats.pending}</p>
          </div>
          <div className="card">
            <h3>Completion %</h3>
            <p className="text-indigo-500">
              {stats.total > 0
                ? Math.round((stats.completed / stats.total) * 100)
                : 0}%
            </p>
          </div>
        </div>
      )}

      {/* FILTERS */}
      <form onSubmit={handleSearchSubmit} className="flex gap-3 flex-wrap">

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputClass}
        />

        <select value={sortField} onChange={(e) => setSortField(e.target.value)} className={selectClass}>
          <option value="createdAt">Newest</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={selectClass}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectClass}>
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Completed</option>
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className={selectClass}>
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button
          disabled={!search && !statusFilter && !priorityFilter}
          className={`px-4 py-2 rounded text-white transition ${!search && !statusFilter && !priorityFilter
            ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
            }`}
        >
          Search
        </button>

      </form>

      {/* TASK LIST */}
      {loading ? (
        <p className="text-center mt-6">Loading tasks...</p>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-4">
            {tasks.tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>

          {tasks.tasks.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No tasks found 😔
            </p>
          )}

          {/* PAGINATION */}
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Prev
            </button>

            {[...Array(tasks.pages || 1)].map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded ${page === p ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                    }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === tasks.pages}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* MODAL */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />

    </div>
  );
}

export default Dashboard;