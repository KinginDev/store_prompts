"use client"

import React, {useState, useEffect} from 'react'

import Link from 'next/link'
import Image from 'next/image'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
    const {data: session} = useSession()
    const [providers, setProviders] = useState(null)
    const [toggleDropdown, settoggleDropdown] = useState(false)

    const setUpProviders = async () => {
        const response = await getProviders();

        setProviders(response)
    }
    useEffect(() => {
       
        setUpProviders()
    }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center" >
        <Image src="assets/images/logo.svg" width={50} height={50} alt="Promptopia Logo" />
        <p className="logo_text">Promptopia</p>
        </Link>

   
        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
            {session?.user  ? (
                <div className="flex ga-3 md:gap-5">
                    <Link href="/create-prompt" className="flex gap-2 flex-center black_btn" >Create Prompt</Link>
                    
                    <button className="outline_btn" onClick={() => signOut()}>
                        Sign Out 
                    </button>
                    <Link href="/profile" >
                    <Image src={session?.user?.image}
                        width={37} height={37} alt="Profile Icon"
                        className="rounded-full"
                        />
                   
                    </Link>
                </div>
            ): (
                <>
                {providers && Object.values(providers).map((provider) => (
                    <button type="button" key={provider.id} className="black_btn" onClick={() => signIn(provider.id)}>
                        Sign in with {provider.name}
                    </button>
                ))}
                </>
            )}
        </div>
        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                    <Image src={session?.user?.image}
                        width={37} height={37} alt="Profile Icon" onClick={() => {settoggleDropdown((prev) => !prev)}} />


                        {toggleDropdown && (

                            <div className="dropdown">
                                <Link href="/profile" className="dropdown_link" 
                                onClick={() => settoggleDropdown(false)}>
                                    My Profile
                                </Link>
                                <Link href="/create-prompt" className="dropdown_link">
                                    Create Prompt
                                </Link>
                                <button 
                                type="button"
                                className="mt-5 w-full black_btn" onClick={() =>{
                                 settoggleDropdown(false)   
                                 signOut()}}>
                                    Sign Out
                                 </button>
                            </div>
                        )}
                </div>
            ) :
            (<>
                {providers && Object.values(providers).map((provider) => (
                    <button type="button" key={provider.id} className="black_btn" onClick={() => signIn(provider.id)}>
                        Sign in with {provider.name}
                    </button>
                ))} 
            </>)}
        </div>
    </nav>
  )
}

export default Nav