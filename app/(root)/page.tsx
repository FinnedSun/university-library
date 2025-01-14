import { BookList } from '@/components/BookList'
import { BookOverview } from '@/components/BookOverview'
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants'
import { db } from '@/database/drizzle'
import { usersTable } from '@/database/schema'
import React from 'react'

const Home = async () => {
  const result = await db.select().from(usersTable)
  console.log(JSON.stringify(result, null, 2))

  return (
    <>
      {/* @ts-ignore */}
      <BookOverview {...sampleBooks[0]} />


      <BookList
        title="Latest Books"
        //@ts-ignore
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  )
}

export default Home
