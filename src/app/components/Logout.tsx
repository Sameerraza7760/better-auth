'use client'
import React from 'react'
import { authClient } from '@/lib/auth-client'
import { router } from 'better-auth/api'
import { redirect } from 'next/navigation'
const Logout = () => {
    const handleLogout = async()=>{
    try {
      await authClient.signOut({
            fetchOptions:{
                onSuccess:()=>{
                    redirect('/')
                },
                onError:(err)=>{
                    console.log(err)
                }
            }
        })
    } catch (error) {
        
    }
    }
  return (
    <div>
        <button onClick={handleLogout}>
            Logout
        </button>
    </div>
  )
}

export default Logout