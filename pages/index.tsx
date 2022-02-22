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
  Select,
  Progress,
  useTheme,
} from '@geist-ui/core'
import { Plus } from '@geist-ui/icons'
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
import { ApexOptions } from 'apexcharts'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import useSWR from 'swr'
import { useContext, createContext, useEffect, useState } from 'react'

const AppContext = createContext()
const useApp = () => useContext(AppContext)

const AppContextProivder = (props: any) => {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error } = useSWR('/api/portfolio', fetcher)

  return (
    <AppContext.Provider
      value={{ distribution: data?.distribution, transactions: data?.transactions }}
      {...props}
    />
  )
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Geist UI with NextJS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppContextProivder>
        <Page dotBackdrop width="1280px" padding={1}>
          <Text my={0} type="secondary">
            Portfolio value
          </Text>
          <Text h1 b>
            £13,000
          </Text>
          <div style={{ display: 'grid', gridTemplateColumns: '4fr' }}>
            <Area />
            {/* <Pie /> */}
          </div>

          <Crypto />

          <Grid.Container justify="center" gap={3} mt="100px"></Grid.Container>
        </Page>
      </AppContextProivder>
    </div>
  )
}

const Crypto = () => {
  return (
    <div style={{ marginTop: '1em' }}>
      <Tabs initialValue="distribution" leftSpace={0}>
        <Tabs.Item label="Distribution" value="distribution">
          <Text h2 b>
            Distribution
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
  const [costPlaceholder, setCostPlaceholder] = useState('$1000')
  const [type, setType] = useState()
  const [isNFT, setIsNFT] = useState(false)

  useEffect(() => {
    switch (type) {
      case 'nfts':
        setCostPlaceholder('ETH/SOL')
        setIsNFT(true)
        break

      default:
        setCostPlaceholder('$1000')
        break
    }
  }, [type])
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

            <Text font={0.9} my={0} type="secondary" mb={0.5}>
              Asset type
            </Text>
            <Select
              onChange={setType}
              placeholder="Select type"
              initialValue={'NFTs'}
              width={'100%'}>
              <Select.Option value={'nfts'}>NFTs</Select.Option>
              <Select.Option value={'cryptocurrency'}> Cryptocurrency</Select.Option>
              <Select.Option value={'stablecoins'}>Stablecoins</Select.Option>
              <Select.Option value={'fiat'}>Fiat</Select.Option>
            </Select>
            <Spacer />
            <Spacer />

            <Text font={0.9} my={0} type="secondary" mb={0.5}>
              Chain
            </Text>
            <Select disabled={!isNFT} placeholder="Select chain" width={'100%'}>
              <Select.Option value={'eth'}>ETH</Select.Option>
              <Select.Option value={'sol'}>SOL</Select.Option>
            </Select>
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

            <Input width={'100%'} placeholder={costPlaceholder}>
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

const formatNumber = n => `£${Number(n).toLocaleString()}`

const TransactionsTable = () => {
  const { transactions } = useApp()

  let data = transactions?.map(x => {
    x.quantity = x.quantity.toLocaleString()
    x.acquisitionCost = formatNumber(x.acquisitionCost)
    x.createdAt = new Date(x.createdAt).toDateString()
    x.fees = formatNumber(x.fees)
    return x
  })

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
  const theme = useTheme()
  const { distribution } = useApp()

  let data = distribution?.map(x => {
    x.total = (
      <div style={{ display: 'flex', alignItem: 'center' }}>
        <Text mr={0.5}>{x.total}</Text>{' '}
        <Text style={{ color: theme.palette.cyanDark }}>{x.change}</Text>
      </div>
    )

    const colors = {
      20: theme.palette.violet,
      40: theme.palette.violet,
      60: theme.palette.violet,
      80: theme.palette.violet,
    }

    x.target = <Progress colors={theme.palette.violet} value={x.target * 100} />
    return x
  })

  return (
    <Table data={data}>
      <Table.Column prop="name" label="name" />
      <Table.Column prop="target" label="target" />
      <Table.Column prop="actual" label="holdings" />
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
          '2018-09-18T00:00:00.000Z',
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
