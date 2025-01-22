import { Link, useNavigate } from '@tanstack/react-router';
import { FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';

import supabase from '../lib/supabase';
import { Button } from './ui/button';

const Header = ({ user }: any) => {
  const navigate = useNavigate();

  const handleSignOut = async (event: FormEvent) => {
    event.preventDefault();

    await supabase.auth.signOut();

    navigate({ to: '/auth' });
  };

  return (
    <header className="container py-2 mb-8">
      <nav className="flex justify-center">
        <ul className="flex gap-4">
          <li>
            <Button variant="link">
              <Link to="/" className="flex gap-2 items-center text-lg">
                <span>Home</span> <ArrowRight />
              </Link>
            </Button>
          </li>
          {user ? (
            <>
              <li>
                <Button variant="link">
                  <Link to="/tasks" className="flex gap-2 items-center text-lg">
                    <span>Tasks</span> <ArrowRight />
                  </Link>
                </Button>
              </li>
              <li>
                <form onSubmit={handleSignOut}>
                  <Button
                    type="submit"
                    variant="link"
                    className="flex gap-2 items-center text-lg"
                  >
                    <span>Sign out</span> <ArrowRight />
                  </Button>
                </form>
              </li>
            </>
          ) : (
            <>
              <li>
                <Button variant="link">
                  <Link to="/auth" className="flex gap-2 items-center text-lg">
                    <span>Sign in</span> <ArrowRight />
                  </Link>
                </Button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
