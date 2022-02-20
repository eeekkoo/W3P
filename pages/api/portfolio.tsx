import { NextRequest, NextResponse } from 'next/server'

interface Snapshot {
  timestamp: string
  valueUSD: Number
}

interface Item {
  name: string
  target: Number
  entires: Entry[]
}

interface Entry {
  name: string
  quantity: Number
  value: Number
}

// export default function hey(req: NextRequest, res: NextResponse) {
//   // [] totalValueUSD
//   // [] entry.valueUSD
//   // [] entry.correctionUSD
//   // [] entry.change
//   // [] entry.actual
//   let output = data.map(({ snapshots, items }) => {
//     return
//   })
//   return res.json(output)
// }

const data = {
  portfolioValueUSD: 65009.67,
  snapshots: [
    {
      timestamp: '2022-02-19T14:48:00.426Z',
      valueUSD: 23160.73,
    },
    {
      timestamp: '2022-02-18T14:48:00.426Z',
      valueUSD: 20160.73,
    },
    {
      timestamp: '2022-02-17T14:48:00.426Z',
      valueUSD: 18160.73,
    },
  ],
  items: [
    {
      name: 'Stablecoins',
      target: 0.3,
      entries: [
        {
          name: 'GUSD',
          quantity: 100,
        },
        {
          name: 'TETHER',
          quantity: 50,
        },
        {
          name: 'Dai',
          quantity: 500,
        },
      ],
    },
    {
      name: 'ETH/SOL',
      target: 0.3,
    },
    {
      name: 'NFTs',
      target: 0.2,
      entries: [
        {
          name: 'Doodle',
          type: 'NFT',
          chain: 'ETH',
          quantity: 1,
          value: 13,
        },
        {
          name: 'Creature World',
          type: 'NFT',
          chain: 'ETH',
          quantity: 1,
        },
        {
          name: 'SolPunks',
          type: 'NFT',
          chain: 'SOL',
          quantity: 1,
        },
      ],
    },
    {
      name: 'Strong Alts',
      target: 0.1,
      entires: [
        {
          name: 'Litecoin',
          quantity: 124,
        },
      ],
    },
    {
      name: 'FIAT',
      target: 0.1,
      entires: [
        {
          name: 'GBP',
          quantity: 1000,
        },
        {
          name: 'USD',
          quantity: 1000,
        },
      ],
    },
  ],
}
