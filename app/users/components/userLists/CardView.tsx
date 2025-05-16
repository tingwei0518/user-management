import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CardListsProps } from '@/app/users/components/userLists/UserDisplay'

export const CardView = ({ users }: CardListsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {users.map(({ id, name, profileImage, phone, gender, occupation }) => (
        <Card key={id}>
          <CardContent className="p-4 flex flex-col items-center space-y-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profileImage} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-medium text-lg">{name}</p>
              <p className="text-sm text-muted-foreground">{phone}</p>
              {/* <p className="text-sm text-muted-foreground">{birthday}</p> */}
              <p className="text-sm text-muted-foreground">{gender}</p>
              <p className="text-sm text-muted-foreground">{occupation}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default CardView
