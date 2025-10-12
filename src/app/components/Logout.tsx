'use client'
import React from 'react'
import { authClient } from '@/lib/auth-client'
import { router } from 'better-auth/api'
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
const Logout = () => {
    const router = useRouter()
    const handleLogout = async()=>{
    try {
      await authClient.signOut({
            fetchOptions:{
                onSuccess:()=>{
                   router.push('/auth/signup')
                },
                onError:(err)=>{
                    console.log(err)
                }
            }
        })
    } catch (error) {
        console.log(error)
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