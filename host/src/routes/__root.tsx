import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

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

const RootComponent = () => {
  const { user } = Route.useRouteContext();
  return (
    <>
      <Header user={user} />
      <div className="container">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  );
};
