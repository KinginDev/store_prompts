import React from 'react'
import  {Feed}  from '@components/Feed';

const Home = () => {
  return (
   <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Discover & Share <br className="max:md-hidden"/> AI-Powered Prompts
    </h1>
    <p className="desctext-center">
      PromptOpita is a community for sharing and discovering AI prompts.
    </p>

    <Feed></Feed>
   </section>
  )
}

export default Home