import { BookList } from '@/components/BookList'
import { BookOverview } from '@/components/BookOverview'
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants'
import React from 'react'

const Home = () => {

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
