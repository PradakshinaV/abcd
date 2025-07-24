import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const nav = useNavigate();
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) nav('/');
  }, [token, nav]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl mb-4">Welcome, {username}!</h1>
      <button
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        onClick={() => { localStorage.clear(); nav('/'); }}
      >
        Logout
      </button>
    </div>
  );
}
export default Dashboard;
