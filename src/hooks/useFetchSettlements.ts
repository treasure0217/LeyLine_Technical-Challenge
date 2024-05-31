import { useCallback, useEffect, useState, useTransition } from 'react'

const useFetchSettlements = (username: string) => {
  const [settlementsA, setSettlementsA] = useState<ISettlement[]>([])
  const [settlementsB, setSettlementsB] = useState<ISettlement[]>([])
  const [isFetching, startTransition] = useTransition()

  console.log(settlementsA)

  const fetchSettlements = useCallback(async () => {
    await new Promise((resolve) =>
      startTransition(async () => {
        await fetch(`/api/get-settlement-status?partyA=${username}`)
          .then((response) => response.json())
          .then(({ settlement }) => {
            setSettlementsA(
              !settlement
                ? []
                : Array.isArray(settlement)
                  ? [...settlement]
                  : [settlement],
            )
          })
          .catch(() => {
            setSettlementsA([])
          })

        await fetch(`/api/get-settlement-status?partyB=${username}`)
          .then((response) => response.json())
          .then(({ settlement }) => {
            setSettlementsB(
              !settlement
                ? []
                : Array.isArray(settlement)
                  ? [...settlement]
                  : [settlement],
            )
          })
          .catch(() => {
            setSettlementsB([])
          })

        resolve(null)
      }),
    )
  }, [username])

  useEffect(() => {
    fetchSettlements()
  }, [username, fetchSettlements])

  return {
    settlementsA,
    settlementsB,
    isFetching,
    refetch: fetchSettlements,
  }
}

export default useFetchSettlements
