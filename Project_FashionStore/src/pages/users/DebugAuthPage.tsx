import React from 'react';
import { useAuth } from '../../context/AuthContext';

const DebugAuthPage: React.FC = () => {
  const { user, accessToken, isAuthenticated } = useAuth();

  const storedAuth = localStorage.getItem('fashionstore_auth');
  const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Auth Information</h1>

        <div className="bg-white rounded-lg p-6 mb-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Auth Context</h2>
          <div className="space-y-2">
            <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
            <p><strong>User ID:</strong> {user?.id || 'N/A'}</p>
            <p><strong>Full Name:</strong> {user?.fullName || 'N/A'}</p>
            <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
            <p><strong>Phone:</strong> {user?.phone || 'N/A'}</p>
            <p><strong>Role:</strong> {user?.role || 'N/A'}</p>
            <p><strong>Has Token:</strong> {accessToken ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-6 shadow">
          <h2 className="text-xl font-semibold mb-4">User Object (JSON)</h2>
          <pre className="bg-slate-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">LocalStorage Data</h2>
          <pre className="bg-slate-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(parsedAuth, null, 2)}
          </pre>
        </div>

        <div className="mt-6">
          <button
            onClick={() => {
              localStorage.removeItem('fashionstore_auth');
              window.location.reload();
            }}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
          >
            Clear Auth & Reload
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugAuthPage;
