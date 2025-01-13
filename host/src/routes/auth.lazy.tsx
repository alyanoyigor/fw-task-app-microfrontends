import { useEffect, useRef } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { mount } from 'auth/index';

export const Route = createLazyFileRoute('/auth')({
  component: RouteComponent,
});

function RouteComponent() {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref}></div>;
}
