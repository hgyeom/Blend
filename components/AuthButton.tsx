import { supabaseServer } from '@/utils/supabase/server';
import Link from 'next/link';
import { Button } from './ui/button';
import { signOut } from '@/utils/supabase/actions';

export default async function AuthButton() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <Button variant="outline">Logout</Button>
      </form>
    </div>
  ) : (
    <Button variant="outline">
      <Link href="/login">Login</Link>
    </Button>
  );
}
