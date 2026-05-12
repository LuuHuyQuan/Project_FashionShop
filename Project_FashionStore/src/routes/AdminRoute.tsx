import React, { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
interface AdminRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  redirects?: {
    unauthenticated?: string;
    unauthorized?: string;
  };
}
const AdminRouteSkeleton: React.FC = () => (
  <div
    role="status"
    aria-label="Đang xác thực quyền truy cập"
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '12px',
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        border: '3px solid #e5e7eb',
        borderTop: '3px solid #6366f1',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
    <span style={{ fontSize: 14, color: '#6b7280', letterSpacing: '0.01em' }}>
      Đang xác thực...
    </span>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);
type GuardResult =
  | { status: 'loading' }
  | { status: 'redirect'; to: string }
  | { status: 'allowed' };
function useAdminGuard(
  requiredRoles: string[],
  redirects: Required<NonNullable<AdminRouteProps['redirects']>>
): GuardResult {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Tạm thời bypass cho development
  if (import.meta.env.DEV) {
    return { status: 'allowed' };
  }

  if (isLoading) return { status: 'loading' };
  if (!isAuthenticated) {
    return { status: 'redirect', to: redirects.unauthenticated };
  }
  const hasRole = requiredRoles.includes(user?.role ?? '');
  if (!hasRole) {
    return { status: 'redirect', to: redirects.unauthorized };
  }
  return { status: 'allowed' };
}
const AdminRoute: React.FC<AdminRouteProps> = ({
  children,
  requiredRoles = ['admin'],
  redirects = {},
}) => {
  const location = useLocation();
  const resolvedRedirects: Required<NonNullable<AdminRouteProps['redirects']>> = {
    unauthenticated: redirects.unauthenticated ?? '/login',
    unauthorized: redirects.unauthorized ?? '/',
  };

  const guard = useAdminGuard(requiredRoles, resolvedRedirects);

  // Log unauthorized access attempts (dev-only)
  const { user } = useAuth();
  const hasLoggedRef = useRef(false);

  useEffect(() => {
    if (
      guard.status === 'redirect' &&
      guard.to === resolvedRedirects.unauthorized &&
      !hasLoggedRef.current
    ) {
      hasLoggedRef.current = true;
      if (import.meta.env.DEV) {
        console.warn(
          `[AdminRoute] Unauthorized access attempt by user "${user?.role ?? 'unknown'}" at "${location.pathname}"`
        );
      }
    }
  }, [guard, location.pathname, resolvedRedirects.unauthorized, user?.role]);

  if (guard.status === 'loading') return <AdminRouteSkeleton />;

  if (guard.status === 'redirect') {
    return (
      <Navigate
        to={guard.to}
        replace
        state={{ from: location }} // Preserve return path for post-login redirect
      />
    );
  }

  return <>{children}</>;
};

export default AdminRoute;