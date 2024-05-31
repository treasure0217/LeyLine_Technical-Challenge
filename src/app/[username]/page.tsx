'use client'

import { useTransition } from 'react'
import toast from 'react-hot-toast'
import CreateSettlementForm from '@/components/CreateSettlementForm'
import TableRowA from '@/components/TableRowA'
import TableRowB from '@/components/TableRowB'
import useFetchSettlements from '@/hooks/useFetchSettlements'

interface Props {
  params: {
    username: string
  }
}

const Settlements: React.FC<Props> = ({ params: { username } }) => {
  const { settlementsA, settlementsB, refetch } = useFetchSettlements(username)

  // console.log(settlementsA)

  return (
    <div className='py-10'>
      <div className='container space-y-10'>
        <CreateSettlementForm
          username={username}
          className='mx-auto w-full max-w-lg'
          refetch={refetch}
        />
        <div className='grid grid-cols-2 gap-5'>
          <table className='h-fit'>
            <thead>
              <tr>
                <th className='text-center'>#</th>
                <th>Party A</th>
                <th>Party B</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {settlementsA.length === 0 ? (
                <tr>
                  <td className='text-center' colSpan={6}>
                    No settlements found
                  </td>
                </tr>
              ) : (
                settlementsA.map((settlement, i) => (
                  <TableRowA
                    settlement={settlement}
                    index={i + 1}
                    refetch={refetch}
                    key={settlement.id}
                  />
                ))
              )}
              <tr></tr>
            </tbody>
          </table>
          <table className='h-fit'>
            <thead>
              <tr>
                <th className='text-center'>#</th>
                <th>Party A</th>
                <th>Party B</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {settlementsB.length === 0 ? (
                <tr>
                  <td className='text-center' colSpan={6}>
                    No settlements found
                  </td>
                </tr>
              ) : (
                settlementsB.map((settlement, i) => (
                  <TableRowB
                    settlement={settlement}
                    index={i + 1}
                    refetch={refetch}
                    key={settlement.id}
                  />
                ))
              )}
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Settlements
