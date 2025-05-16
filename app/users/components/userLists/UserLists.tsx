import React from 'react'
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import { prisma } from '@/prisma/client';
import SearchBar from '@/app/users/components/userLists/SearchBar';
import { Gender, Occupation } from '@/app/types/enums';

interface UserListsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const UserLists = async ({ searchParams }: UserListsProps) => {
  const currentPage = Math.max(1, parseInt(searchParams.page as string) || 1);
  const PER_PAGE = 6;
  const skip = (currentPage - 1) * PER_PAGE;

  const query = (searchParams.query as string || '').toUpperCase();

  const whereConditions = {
    OR: [
      { name: { contains: query } },
      { phone: { contains: query } },
      { gender: query.toUpperCase() in Gender ? { equals: query.toUpperCase() as Gender } : undefined },
      { occupation: query.toUpperCase() in Occupation ? { equals: query.toUpperCase() as Occupation } : undefined },
    ].filter(Boolean),
  };


  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: whereConditions,
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: PER_PAGE,
    }),
    prisma.user.count({ where: whereConditions })
  ]);

  return (
    <div className="h-[inherit] flex flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto p-6">
        <SearchBar />
        <div className="space-y-4">
          {users.map(({ id, name }) => (
            <div key={id}>
              <h2>{name}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-shrink-0 p-4 border-t bg-background h-[73px]">
        {total > 0 && <PaginationWithLinks page={currentPage} totalCount={total} pageSize={PER_PAGE} />}
      </div>
    </div>
  )
}

export default UserLists
