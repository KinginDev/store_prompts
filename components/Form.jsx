import React from 'react'
import Link from 'next/link'
import { Input } from 'postcss'


const Form = ({type,
  post,
  setPost,
  submitting,
  handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
    <h1 className="head_text text-left">
      <span className="blue_gradient">{type} Post</span>
    </h1>
    <p className="desc yexy-left max-w-md">
      {type} a post to Promptopia and share your thoughts with the world!
    </p>

    <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
    <span className="font-statoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
    <textarea value={post.prompt} onChange={(e) => setPost({
      ...post,prompt: e.target.value
    })} placeholder="write your prompt here" className="form_textarea"></textarea>

    {/**Tags */}
    <span className="font-statoshi font-semibold text-base text-gray-700">Tags: {` `} <span className="font-normal">#product, #webdev, #finance</span></span>
    <input value={post.tag} onChange={(e) => setPost({
      ...post,tag: e.target.value
    })} placeholder="#tag" className="form_input"></input>

    {/**Submit */}
    <div className="flex-end mx-3 mb-5 gap-4">
      <Link href="/" className="text-gray-700 text-sm">Cancel</Link>

      <button className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white" type="submit" disabled={submitting}>
        {submitting ? `${type}...` : type}
      </button>
    </div>
    </form>
    </section>
  )
}

export default Form