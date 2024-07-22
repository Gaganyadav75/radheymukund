"use client"
import React from 'react'
import { RecoilRoot } from 'recoil'
import { SubmitButton } from './Inputs/SubmitButton'
import { getURL } from 'next/dist/shared/lib/utils'
import { useEffect,useState } from 'react'
import Header from './header/Header'

function Application({children}) {



  return (
    <main  className="flex bg-gray-600 relative min-h-screen flex-col items-center px-28 py-5">
      <Header/>
        <div id={"print"} className="w-full flex items-center justify-center" >
        <RecoilRoot>
          {children}
        </RecoilRoot>
        </div>
        
      </main>
  )
}

export default Application