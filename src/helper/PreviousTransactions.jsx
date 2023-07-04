import { useAccount, useNetwork } from 'wagmi';

const toStoreTransactions1 = [
  { date: '2023-06-01', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-22', skimAmount: '0.0123', dateRange: '-', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2023-06-29', skimAmount: '0.0123', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  // More people...
]

const toStoreTransactions2 = [
  { date: '2024-06-01', skimAmount: '0.0245', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2024-06-22', skimAmount: '0.0245', dateRange: '-', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  { date: '2024-06-29', skimAmount: '0.0245', dateRange: '2023-05-23 ~ 2023-06-22', rETHRemaining: '0.1', eqETHRemaining: '1.1' },
  // More people...
]
function storeDummyTransactions() {
  const { address } = useAccount()
  let transactionsObject = {}
  transactionsObject['Goerli'] = toStoreTransactions1
  transactionsObject['Ethereum'] = toStoreTransactions2

  localStorage.setItem(address, JSON.stringify(transactionsObject))
}

export function getPreviousTransactions() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const chainName = chain ? chain.name : 'Ethereum';
  // storeDummyTransactions()
  let transactionsWithChains = JSON.parse(localStorage.getItem(address))
  if (!transactionsWithChains) {
    transactionsWithChains = {}
  }
  if (!transactionsWithChains[chainName]) {
    transactionsWithChains[chainName] = []
  }
  return transactionsWithChains[chainName]
}

export function addTransaction(address, chainName, transaction) {


  let transactionsWithChains = JSON.parse(localStorage.getItem(address))
  if (!transactionsWithChains) {
    transactionsWithChains = {}
  }
  if (!transactionsWithChains[chainName]) {
    transactionsWithChains[chainName] = []
  }

  transactionsWithChains[chainName].unshift(transaction)

  localStorage.setItem(address, JSON.stringify(transactionsWithChains))
}

function createISODateString(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return year + '-' + month + '-' + day;
}

export function createTransactionEntry(dateRange, rETHToSkim, rETHInWallet, eqETHRemaining) {
  let dateRangeString = '-'
  if ((dateRange.startDate && dateRange.endDate)) {
    let startDate = createISODateString(dateRange.startDate);
    let endDate = createISODateString(dateRange.endDate);
    dateRangeString = startDate + ' ~ ' + endDate
  }

  let rETHRemaining = rETHInWallet - rETHToSkim
  let now = new Date()
  const transactionToAdd = {
    date: now.toDateString() + ' ' + now.toLocaleTimeString(),
    skimAmount: rETHToSkim.toPrecision(4),
    dateRange: dateRangeString,
    rETHRemaining: rETHRemaining.toPrecision(4),
    eqETHRemaining: eqETHRemaining.toPrecision(4)
  }
  // console.log("Transaction Entry; ", transactionToAdd)
  return transactionToAdd
}