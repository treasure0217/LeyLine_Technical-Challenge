import { FormEvent, useState, useTransition } from 'react'
import toast from 'react-hot-toast'
import cx from 'classnames'
import useFetchSettlements from '@/hooks/useFetchSettlements'

interface Props {
  className?: string
  username: string
  refetch: React.Dispatch<void>
}

const CreateSettlementForm: React.FC<Props> = ({
  className,
  username,
  refetch,
}) => {
  const [amount, setAmount] = useState<string>('')
  const [usernameB, setUsernameB] = useState<string>('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!usernameB || usernameB === username) {
      toast.error('Invalid username')
      return
    }

    if (!amount || isNaN(+amount)) {
      toast.error('Invalid amount')
      return
    }

    startTransition(async () => {
      await fetch('/api/submit-settlement', {
        method: 'POST',
        body: JSON.stringify({
          amount: Math.trunc(+amount),
          partyA: username,
          partyB: usernameB,
        }),
      })

      refetch()

      setUsernameB('')
      setAmount('')
    })
  }

  return (
    <form className={cx('space-y-2', className)} onSubmit={handleSubmit}>
      <p className='text-sm font-medium'>Create Settlement</p>
      <input
        type='text'
        className='w-full rounded border border-gray-500 p-2 text-sm'
        placeholder='Enter username'
        value={usernameB}
        onChange={(e) => setUsernameB(e.target.value)}
      />
      <input
        type='text'
        className='w-full rounded border border-gray-500 p-2 text-sm'
        placeholder='Enter amount'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        type='submit'
        className='mx-auto block w-24 rounded bg-purple-600 p-2 text-sm text-white disabled:pointer-events-none disabled:opacity-50'
        disabled={isPending}
      >
        Submit
      </button>
    </form>
  )
}

export default CreateSettlementForm
