import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers'
import { assert } from 'chai'
import hre from 'hardhat'
import { parseEther } from 'viem'

const deployNeighborhoodCommunityFund = async () => {
  const communityFund = await hre.viem.deployContract('NeighborhoodCommunityFund')
  return { communityFund }
}

describe('NeighborhoodCommunityFund Contract', function () {
  it('should allow the owner to set the unit owner', async function () {
    const { communityFund } = await loadFixture(deployNeighborhoodCommunityFund)
    const [wallet] = await hre.viem.getWalletClients() // Get wallet for the test

    const unitNumber = BigInt(1)

    // Call the setUnitOwner function to assign the unit owner
    await communityFund.write.setUnitOwner([unitNumber, wallet.account.address])

    // Retrieve the owner of the unit using the new getter function
    const unitOwner = await communityFund.read.getUnitOwner([unitNumber])

    // Assertion to check if the owner was set correctly
    assert.equal(
      unitOwner.toLowerCase(),
      wallet.account.address.toLowerCase(),
      'The unit owner should be set to the wallet address'
    )
  })

  it('should allow the owner to whitelist a committee', async function () {
    const { communityFund } = await loadFixture(deployNeighborhoodCommunityFund)
    const [, committeeWallet] = await hre.viem.getWalletClients() // Get wallets for the test

    // Whitelist the committee
    await communityFund.write.whitelistCommittee([committeeWallet.account.address])

    // Check if the committee is whitelisted
    const isWhitelisted = await communityFund.read.whitelistedCommittees([
      committeeWallet.account.address,
    ])
    assert.isTrue(isWhitelisted, 'The committee should be whitelisted')
  })

  it('should allow the owner to remove a committee', async function () {
    const { communityFund } = await loadFixture(deployNeighborhoodCommunityFund)
    const [, committeeWallet] = await hre.viem.getWalletClients() // Get wallets for the test

    // Whitelist the committee
    await communityFund.write.whitelistCommittee([committeeWallet.account.address])

    // Remove the committee
    await communityFund.write.removeCommittee([committeeWallet.account.address])

    // Check if the committee is removed
    const isWhitelisted = await communityFund.read.whitelistedCommittees([
      committeeWallet.account.address,
    ])
    assert.isFalse(isWhitelisted, 'The committee should be removed')
  })

  it('should allow the unit owner to make payments to the community fund', async function () {
    const { communityFund } = await loadFixture(deployNeighborhoodCommunityFund)
    const [wallet] = await hre.viem.getWalletClients() // Get the wallet for the test
    const unitNumber = BigInt(1)

    // Set the unit owner
    await communityFund.write.setUnitOwner([unitNumber, wallet.account.address])

    // Simulate the unit owner making a payment of 1 ETH
    const paymentAmount = parseEther('1') // 1 ETH

    // Make the payment
    await wallet.writeContract({
      address: communityFund.address,
      abi: communityFund.abi,
      functionName: 'payCommunityFund',
      args: [unitNumber],
      account: wallet.account,
      value: paymentAmount, // Include the payment amount
    })

    // Retrieve the updated totalPaid and lastPaidDate from the contract
    const [, totalPaid, lastPaidDate] = await communityFund.read.units([unitNumber])

    // Assertions to check if the payment was recorded correctly
    assert.equal(
      totalPaid.toString(),
      paymentAmount.toString(),
      'Total paid should match the payment amount'
    )
    assert(lastPaidDate > 0, 'Last paid date should be updated')
  })
})
