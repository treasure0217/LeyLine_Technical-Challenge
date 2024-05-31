import { useTransition } from 'react'
import toast from 'react-hot-toast'

const TableRowA: React.FC<{
  settlement: ISettlement
  index: number
  refetch: React.Dispatch<void>
}> = ({ settlement, index, refetch }) => {
  const [isEditing, startEditing] = useTransition()

  const handleEdit = () => {
    const amount = window.prompt(
      'Enter amount to change',
      settlement.amount.toString(),
    )

    if (!amount) {
      return
    }

    if (isNaN(+amount)) {
      toast.error('Invalid amount')
      return
    }

    startEditing(async () => {
      await fetch('/api/modify-settlement', {
        method: 'PUT',
        body: JSON.stringify({ id: settlement.id, amount: +amount }),
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
      <td className='w-32'>
        {settlement.status !== 'settled' && (
          <button disabled={isEditing} onClick={handleEdit}>
            {isEditing
              ? 'Updating...'
              : settlement.status === 'disputed'
                ? 'Re-request'
                : 'Edit'}
          </button>
        )}
      </td>
    </tr>
  )
}

export default TableRowA
