import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      nav('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow max-w-sm w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-6 text-center">Login</h2>

        {/* Email Input */}
        <input
          type="text"
          placeholder="Email"
          className="w-full border px-4 py-2 mb-4 rounded focus:outline-none focus:ring"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />

        {/* Password Input with Show/Hide */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full border px-4 py-2 mb-4 rounded focus:outline-none focus:ring pr-10"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-2 top-2 text-sm text-gray-600"
          >
            {showPassword ? '🙈' : '👁'}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{' '}
          <Link className="text-green-500" to="/signup">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
