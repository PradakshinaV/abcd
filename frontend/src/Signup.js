import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      nav('/');
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
        <h2 className="text-2xl mb-6 text-center">Register</h2>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          className="w-full border px-4 py-2 mb-4 rounded focus:outline-none focus:ring"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          required
        />

        {/* Email Input */}
        <input
          type="text"
          placeholder="Email"
          className="w-full border px-4 py-2 mb-4 rounded focus:outline-none focus:ring"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />

        {/* Password Input with Eye Icon */}
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link className="text-blue-500" to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
