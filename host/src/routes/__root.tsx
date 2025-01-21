import React, { Suspense } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import Header from '../components/Header';
import supabase from '../lib/supabase';

export const Route = createRootRoute({
  component: () => <RootComponent />,
  beforeLoad: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return { user };
  },
});

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

function RootComponent() {
  const { user } = Route.useRouteContext();
  return (
    <>
      <Header user={user} />
      <div className="container">
        <Outlet />
      </div>
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
}
