import React from 'react'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'
import { CardView } from '@/app/users/components/userLists/CardView'
// import { TableView } from '@/app/users/components/userLists/TableView'

interface User {
  id: number
  name: string
  phone: string
  profileImage: string
  // birthday: string
  gender: string
  occupation: string
}

export interface CardListsProps {
  users: User[]
}

const UserDisplay = ({ users }: CardListsProps) => {
  return (
    <Tabs defaultValue="card" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="card">
          Card View
        </TabsTrigger>
        <TabsTrigger value="table">
          Table View
        </TabsTrigger>
      </TabsList>

      <TabsContent value="card">
        <CardView users={users} />
      </TabsContent>
      <TabsContent value="table">
        {/* <TableView users={users} /> */}
      </TabsContent>
    </Tabs>
  )
}

export default UserDisplay
