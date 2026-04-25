import React, { useState } from 'react';
import { authApi } from '../../lib/api';

const TestAuthPage: React.FC = () => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('Test123!');
  const [fullName, setFullName] = useState('Test User');
  const [phone, setPhone] = useState('0912345678');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testRegister = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await authApi.register({
        fullName,
        email,
        phone,
        password,
      });
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await authApi.login({
        email,
        password,
      });
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Test Auth API Connection</h1>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={testRegister}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Test Register
          </button>
          <button
            onClick={testLogin}
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Test Login
          </button>
        </div>

        {loading && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="text-blue-700">Loading...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded mb-4">
            <p className="text-red-700 font-medium">Error:</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {result && (
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-green-700 font-medium mb-2">Success:</p>
            <pre className="text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">
            <strong>Backend URL:</strong> {import.meta.env.VITE_API_AUTH_URL || 'https://localhost:7264/api'}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Endpoints:</strong>
          </p>
          <ul className="text-sm text-gray-600 list-disc list-inside ml-2">
            <li>POST /Auth/register</li>
            <li>POST /Auth/login</li>
            <li>POST /Auth/refresh</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestAuthPage;
