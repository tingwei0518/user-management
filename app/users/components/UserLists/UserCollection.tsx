import React from 'react';
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';
import { prisma } from '@/prisma/client';
import UserDisplay from '@/app/users/components/UserLists/UserDisplay';
import { Gender, Occupation } from '@/app/types/enums';

interface UserCollectionProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const UserCollection = async ({ searchParams }: UserCollectionProps) => {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page as string) || 1);
  const PER_PAGE = 6;
  const skip = (currentPage - 1) * PER_PAGE;

  const query = ((params.query as string) || '').toUpperCase();

  const whereConditions = {
    OR: [
      { name: { contains: query } },
      { phone: { contains: query } },
      {
        gender:
          query.toUpperCase() in Gender ? { equals: query.toUpperCase() as Gender } : undefined,
      },
      {
        occupation:
          query.toUpperCase() in Occupation
            ? { equals: query.toUpperCase() as Occupation }
            : undefined,
      },
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
    prisma.user.count({ where: whereConditions }),
  ]);

  return (
    <div className="h-[inherit] flex flex-col bg-gray-100">
      <div className="flex-1 p-6 flex flex-col min-h-0">
        <UserDisplay users={users} />
      </div>
      <div className="flex-none p-4 border-t bg-white">
        {total > 0 && (
          <PaginationWithLinks page={currentPage} totalCount={total} pageSize={PER_PAGE} />
        )}
      </div>
    </div>
  );
};

export default UserCollection;
