import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { setUser } from '../../redux/authSlice';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!name || !email || !password) {
      setMessage('All fields are required');
      return;
    }
    
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Registration failed');
        return;
      }

      dispatch(setUser({ token: data.token, user: data.user }));
      window.location.href = '/';
      
    } catch {
      setMessage('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Create Account</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-500 text-black font-semibold py-2 rounded-md hover:bg-lime-400 transition disabled:opacity-60"
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        {message && (
          <div className="text-center text-sm text-gray-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
