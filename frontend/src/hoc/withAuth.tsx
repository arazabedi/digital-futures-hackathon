"use client"
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>, adminOnly: boolean = false) => {
  const ComponentWithAuth = (props: P) => {
		const { user, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
    }, [user, isAdmin, router]);

    if (!user || (adminOnly && !isAdmin)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
