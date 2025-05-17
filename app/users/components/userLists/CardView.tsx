import React from 'react'
import { Cake, User as UserIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CardListsProps } from '@/app/users/components/userLists/UserDisplay'
import UserActionButtons from '@/app/users/components/userLists/UserActionButtons'

export const CardView = ({ users }: CardListsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {users.map((user) => {
        const { id, name, profileImage, phone, gender, occupation, birthday } = user
        return (
          <Card key={id} className="bg-white border border-gray-200">
            <CardContent className="px-4 py-5 flex flex-col items-center space-y-4">
              <div className="w-full flex justify-end">
                <UserActionButtons userData={user} />
              </div>
              <Avatar className="h-30 w-30 border border-gray-100">
                <AvatarImage src={profileImage} alt={name} className="object-cover" />
                <AvatarFallback>
                  <UserIcon className="w-10 h-10 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="text-center w-full">
                <p className="font-medium text-lg">{name}</p>
                <p className="text-sm text-muted-foreground">{gender}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 justify-center">
                  <Cake className="w-4 h-4" />
                  {birthday.toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">{occupation}</p>
                <p className="text-sm text-muted-foreground">{phone}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default CardView
