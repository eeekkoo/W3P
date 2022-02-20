import Head from 'next/head'
import {
  Page,
  Text,
  Button,
  Grid,
  Tabs,
  Input,
  Table,
  useModal,
  Modal,
  Spacer,
  Dot,
  Select,
} from '@geist-ui/core'
import { Plus } from '@geist-ui/icons'
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { ApexOptions } from 'apexcharts'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

type Target = {
  type: AssetType
  target: Number
}

type Transaction = {
  name: string
  chain?: string
  type: AssetType
  quantity: Number
  acquisitionCost: Number
  fees: Number
  createdAt: string
}

enum AssetType {
  CRYPTOCURRENCY,
  STABLECOIN,
  NFT,
  FIAT,
}

let targets: Target[] = [
  {
    type: AssetType.CRYPTOCURRENCY,
    target: 0.4,
  },
  {
    type: AssetType.NFT,
    target: 0.4,
  },
  {
    type: AssetType.STABLECOIN,
    target: 0.1,
  },
  {
    type: AssetType.FIAT,
    target: 0.1,
  },
]

export default function Home() {
  return (
    <div>
      <Head>
        <title>Geist UI with NextJS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page dotBackdrop width="1280px" padding={1}>
        <Text my={0} type="secondary">
          Balance
        </Text>
        <Text h1 b>
          £13,0000
        </Text>
        <div style={{ display: 'grid', gridTemplateColumns: '4fr' }}>
          <Area />
          {/* <Pie /> */}
        </div>

        <Crypto />

        <Grid.Container justify="center" gap={3} mt="100px"></Grid.Container>
      </Page>
    </div>
  )
}

const Crypto = () => {
  return (
    <div style={{ marginTop: '1em' }}>
      <Tabs initialValue="assets" leftSpace={0}>
        <Tabs.Item label="Assets" value="assets">
          <Text h2 b>
            Assets
          </Text>
          <AssetsTable />
        </Tabs.Item>
        <Tabs.Item label="Transactions" value="transactions">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Text h2 b mr={1}>
              Transactions
            </Text>
            <AddTransaction />
          </div>

          <TransactionsTable />
        </Tabs.Item>
      </Tabs>
    </div>
  )
}

const AddTransaction = () => {
  const { visible, setVisible, bindings } = useModal()
  return (
    <>
      <Button
        type="success"
        auto
        scale={7 / 8}
        icon={<Plus />}
        onClick={() => setVisible(true)}>
        Add
      </Button>
      <Modal {...bindings}>
        <Modal.Title>Add Transaciton</Modal.Title>
        {/* <Modal.Subtitle>This is a modal</Modal.Subtitle> */}
        <Modal.Content>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Input width={'100%'} placeholder="Doodle">
              Name
            </Input>
            <Spacer />
            <Spacer />

            <div>
              <Text font={0.9} my={0} type="secondary" mb={0.5}>
                Asset type
              </Text>
              <Select placeholder="NFTs" width={'100%'}>
                <Select.Option value={'nfts'}>NFTs</Select.Option>
                <Select.Option value={'cryptocurrency'}> Cryptocurrency</Select.Option>
                <Select.Option value={'stablecoins'}>Stablecoins</Select.Option>
                <Select.Option value={'fiat'}>Fiat</Select.Option>
              </Select>
            </div>
            <Spacer />
            <Spacer />

            <DatePicker />
            <Spacer />
            <Spacer />

            <Input width={'100%'} placeholder="100">
              Quantity
            </Input>
            <Spacer />
            <Spacer />
            <Input width={'100%'} placeholder="$1000">
              Acquisition cost
            </Input>
            <Spacer />
            <Spacer />

            <Input width={'100%'} placeholder="$50">
              Fees
            </Input>
            <Spacer />
            <Spacer />
          </div>
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action>Save</Modal.Action>
      </Modal>
    </>
  )
}

const DatePicker = () => {
  return (
    <div>
      <Text font={0.9} my={0} type="secondary" mb={0.5}>
        Date added
      </Text>
      <DayPickerInput onDayChange={day => console.log(day)} />
    </div>
  )
}

const TransactionsTable = () => {
  const data = [
    {
      name: 'Doodles',
      chain: 'ETH',
      type: AssetType[AssetType.NFT],
      quantity: 1,
      acquisitionCost: 3653.461,
      fees: 500,
      createdAt: '2022-02-19T16:06:19.828Z',
    },
    {
      name: 'SolPunks',
      chain: 'SOL',
      type: AssetType[AssetType.NFT],
      quantity: 1,
      acquisitionCost: 1000,
      fees: 10,
      createdAt: '2022-02-19T16:06:19.828Z',
    },
    {
      name: 'BTC',
      type: AssetType[AssetType.CRYPTOCURRENCY],
      quantity: 3,
      acquisitionCost: 30000,
      fees: 10,
      createdAt: '2022-02-19T16:06:19.828Z',
    },
    {
      name: 'ETH',
      type: AssetType[AssetType.CRYPTOCURRENCY],
      quantity: 1,
      acquisitionCost: 3000,
      fees: 500,
      createdAt: '2022-02-19T16:06:19.828Z',
    },
    {
      name: 'SOL',
      type: AssetType[AssetType.CRYPTOCURRENCY],
      quantity: 10,
      acquisitionCost: 100,
      fees: 50,
      createdAt: '2022-02-18T16:06:19.828Z',
    },
    {
      name: 'GBP',
      type: AssetType[AssetType.FIAT],
      quantity: 1000,
      acquisitionCost: 1.36,
      fees: 0,
      createdAt: '2022-02-19T16:06:19.828Z',
    },
  ]
  return (
    <Table data={data}>
      <Table.Column prop="name" label="name" />
      <Table.Column prop="type" label="asset Type" />
      <Table.Column prop="quantity" label="quantity" />
      <Table.Column prop="acquisitionCost" label="acquisition Cost" />
      <Table.Column prop="fees" label="fees" />
      <Table.Column prop="createdAt" label="created At" />
    </Table>
  )
}

const Pie = () => {
  const state = {
    series: [44, 55, 13, 43],
    options: {
      chart: {
        //width: 380,
        type: 'pie',
      },
      labels: ['Cryptocurrency', 'NFTs', 'Fiat', 'Stablecoins'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  }
  return (
    <ReactApexChart
      options={state.options as ApexOptions}
      series={state.series}
      type="pie"
      width={380}
    />
  )
}

const AssetsTable = () => {
  const data = [
    {
      name: 'Stablecoins',
      target: '30%',
      change: '30.00%',
      actual: '0.00%',
      total: '£0.00',
      correction: '£12,952.25',
    },
    {
      name: 'Cryptocurrency',
      target: '30.00%',
      change: '15.71%',
      actual: '14.29%',
      total: '£6,170.45',
      correction: '£6,781.80',
    },
    {
      name: 'NFTs',
      target: '20.00%',
      change: '-64.75%',
      actual: '84.75%',
      total: '£36,588.24',
      correction: '-£27,953.40',
    },
    {
      name: 'FIAT',
      target: '10.00%',
      change: '9.31%',
      actual: '0.69%',
      total: '£300.00',
      correction: '£4,017.42',
    },
  ]
  return (
    <Table data={data}>
      <Table.Column prop="name" label="name" />
      <Table.Column prop="target" label="target" />
      <Table.Column prop="change" label="change" />
      <Table.Column prop="actual" label="actual" />
      <Table.Column prop="total" label="total" />
      <Table.Column prop="correction" label="correction" />
    </Table>
  )
}

const Area = () => {
  let state = {
    series: [
      {
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
    options: {
      grid: {
        show: false,
      },
      chart: {
        animations: {
          enabled: true,
        },
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    },
  }
  return (
    <ReactApexChart
      options={state.options as ApexOptions}
      series={state.series}
      type="area"
      height={350}
    />
  )
}
