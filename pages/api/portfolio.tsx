import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ transactions, distribution })
}

const transactions = [
  {
    name: 'Doodles',
    chain: 'ETH',
    type: 'NFT',
    quantity: 1,
    acquisitionCost: 3653.461,
    fees: 500,
    createdAt: '2022-02-19T16:06:19.828Z',
  },
  {
    name: 'SolPunks',
    chain: 'SOL',
    type: 'NFT',
    quantity: 1,
    acquisitionCost: 1000,
    fees: 10,
    createdAt: '2022-02-19T16:06:19.828Z',
  },
  {
    name: 'BTC',
    type: 'CRYPTOCURRENCY',
    quantity: 3,
    acquisitionCost: 30000,
    fees: 10,
    createdAt: '2022-02-19T16:06:19.828Z',
  },
  {
    name: 'ETH',
    type: 'CRYPTOCURRENCY',
    quantity: 1,
    acquisitionCost: 3000,
    fees: 500,
    createdAt: '2022-02-19T16:06:19.828Z',
  },
  {
    name: 'SOL',
    type: 'CRYPTOCURRENCY',
    quantity: 10,
    acquisitionCost: 100,
    fees: 50,
    createdAt: '2022-02-18T16:06:19.828Z',
  },
  {
    name: 'GBP',
    type: 'FIAT',
    quantity: 1000,
    acquisitionCost: 1.36,
    fees: 0,
    createdAt: '2022-02-19T16:06:19.828Z',
  },
]

const distribution = [
  {
    name: 'Stablecoins',
    target: 0.3,
    change: '30.00%',
    actual: '0.00%',
    total: '£0.00',
    correction: '£12,952.25',
  },
  {
    name: 'Cryptocurrency',
    target: 0.3,
    change: '15.71%',
    actual: '14.29%',
    total: '£6,170.45',
    correction: '£6,781.80',
  },
  {
    name: 'NFTs',
    target: 0.2,
    change: '-64.75%',
    actual: '84.75%',
    total: '£36,588.24',
    correction: '-£27,953.40',
  },
  {
    name: 'FIAT',
    target: 0.1,
    change: '9.31%',
    actual: '0.69%',
    total: '£300.00',
    correction: '£4,017.42',
  },
]
