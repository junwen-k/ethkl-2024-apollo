import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers'
import { assert } from 'chai'
import hre from 'hardhat'
import { parseEther } from 'viem'

const deployCommunityFund = async () => {
  const communityFund = await hre.viem.deployContract('CommunityFund')
  return { communityFund }
}

describe('CommunityFund Contract', function () {
  it('should allow deposits and update the balance correctly', async function () {
    const { communityFund } = await loadFixture(deployCommunityFund)

    const [wallet] = await hre.viem.getWalletClients() // Get wallet for the test

    const depositAmount = parseEther('1') // 1 ETH deposit

    // Send 1 ETH to the contract
    const txHash = await wallet.sendTransaction({
      to: communityFund.address,
      value: depositAmount,
    })

    // Wait for the transaction to be mined
    const publicClient = await hre.viem.getPublicClient()
    await publicClient.waitForTransactionReceipt({ hash: txHash })

    // Check the balance in the contract after deposit
    const balance = await communityFund.read.getBalance([wallet.account.address])
    assert.equal(balance, depositAmount, 'Balance should match the deposited amount')
  })
})
