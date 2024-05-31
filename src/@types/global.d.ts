export {}

declare global {
  export interface ISettlement {
    id: number
    partyA: string
    partyB: string
    amount: number
    status: 'pending' | 'settled' | 'disputed'
    respond: string
  }
}
