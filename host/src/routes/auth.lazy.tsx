import { useEffect, useRef } from 'react';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { mount } from 'auth/index';
import supabase from '../lib/supabase';

export const Route = createLazyFileRoute('/auth')({
  component: RouteComponent,
});

function RouteComponent() {
  const ref = useRef(null);
  const onNavigate = useNavigate({ from: '/auth' });

  useEffect(() => {
    mount(ref.current, {
      onNavigate,
      supabase,
    });
  }, []);

  return <div ref={ref}></div>;
}
