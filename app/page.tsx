import CreateUserModal from '@/app/users/components/userModal/CreateUserModal';
import UserLists from '@/app/users/components/userLists/UserLists';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-6 border-b">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <CreateUserModal />
      </div>
      <div className="flex-1 h-[calc(100vh-88px)]">
        <UserLists searchParams={searchParams} />
      </div>
    </div>
  );
}
