// import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
// import { createClient } from '@/lib/supabase/server';
// import { signOutAction } from '@/actions/auth.actions';

const Header = () => {
  // const supabase = await createClient();
  // const { data } = await supabase.auth.getUser();

  return (
    <header className="container py-4 mb-8">
      <nav className="flex justify-center">
        <ul className="flex gap-12">
          <li>
            <Link to="/" className="flex gap-2 items-center text-lg">
              <span>Home</span> <ArrowRight height={16} width={16} />
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="flex gap-2 items-center text-lg">
              <span>Tasks</span> <ArrowRight height={16} width={16} />
            </Link>
          </li>
          <li>
            <Link to="/auth" className="flex gap-2 items-center text-lg">
              <span>Sign out</span> <ArrowRight height={16} width={16} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
