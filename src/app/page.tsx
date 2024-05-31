'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

export default function Home() {
  const router = useRouter()
  const [username, setUsername] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!username) {
      toast.error('Username cannot be blank')
      return
    }

    router.push(`/${username}`)
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='rounded border border-gray-500 p-2'
          placeholder='Enter your username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  )
}
