import { useTransition } from 'react'
import toast from 'react-hot-toast'

const TableRowB: React.FC<{
  settlement: ISettlement
  index: number
  refetch: React.Dispatch<void>
}> = ({ settlement, index, refetch }) => {
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (response: string) => {
    startTransition(async () => {
      await fetch('/api/respond-settlement', {
        method: 'PUT',
        body: JSON.stringify({ id: settlement.id, response }),
      })
      refetch()
    })
  }

  return (
    <tr className='h-12'>
      <td className='text-center'>{index}</td>
      <td>{settlement.partyA}</td>
      <td>{settlement.partyB}</td>
      <td>{settlement.amount}</td>
      <td className='capitalize'>{settlement.status}</td>
      <td className='w-44'>
        {settlement.status === 'pending' && (
          <span className='grid w-full grid-cols-2 gap-2'>
            <button disabled={isPending} onClick={() => handleSubmit('agree')}>
              Settle
            </button>
            <button
              disabled={isPending}
              onClick={() => handleSubmit('disagree')}
            >
              Disagree
            </button>
          </span>
        )}
      </td>
    </tr>
  )
}

export default TableRowB
