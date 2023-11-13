import { ConnectWallet, Web3Button,useAddress, useContract } from '@thirdweb-dev/react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { NextPage } from 'next'

const contractAddress = "0xd6c52f213eb2859c0120623ff74f3618ca90d815"

const Home: NextPage = () => {
  const myWalletAddress = useAddress()

  const { contract } = useContract(contractAddress)
  const [counter, setCounter] = useState<string | underfined>("")

  async function getCounter() {
    if (!contract) return
    const counter = await contract.call('getCounter')
    setCounter(counter.toString())
  }
  getCounter()
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.title}>
          <h3>My counter dApp</h3>
        </div>
        <div className={styles.description}>
          Contract Address : {contractAddress} <br />
          My Wallet Address : {myWalletAddress}
        </div>

        <h3 className={styles.title}>{counter}</h3>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Web3Button
            contractAddress= {contractAddress}
            action = {(contract) => contract.call('decrementCounter')}
          > - </Web3Button>
          </div>

          <div className={styles.card}>
            <Web3Button
            contractAddress= {contractAddress}
            action = {() => getCounter()}
          > Refresh </Web3Button>
          </div>

          <div className={styles.card}>
            <Web3Button
            contractAddress= {contractAddress}
            action = {(contract) => contract.call('incrementCounter')}
          > - </Web3Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home