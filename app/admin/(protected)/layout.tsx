import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { AdminNav } from '@/components/admin/AdminNav';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen flex-col bg-brand-bg text-brand-cream md:flex-row">
      <AdminNav />
      <div className="flex-1 overflow-x-hidden p-6 md:p-10">{children}</div>
    </div>
  );
}
