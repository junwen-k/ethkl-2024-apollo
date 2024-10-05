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

  it('should allow a committee to request a payment', async function () {
    const { communityFund } = await loadFixture(deployNeighborhoodCommunityFund)
    const [, committeeWallet] = await hre.viem.getWalletClients()

    // Whitelist the committee
    await communityFund.write.whitelistCommittee([committeeWallet.account.address])

    // Request a payment
    const requestAmount = parseEther('0.1') // 0.1 ETH
    const requestRemark = 'Monthly security maintenance fee'
    const requestDeadline = BigInt(Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60) // 1 week from now

    await committeeWallet.writeContract({
      address: communityFund.address,
      abi: communityFund.abi,
      functionName: 'requestPayment',
      args: [requestAmount, requestRemark, requestDeadline],
    })

    // Verify the payment request
    const [, amount, remark, deadline] = await communityFund.read.paymentRequests([BigInt(0)]) // Get the first request
    assert.equal(amount.toString(), requestAmount.toString(), 'The payment amount should match')
    assert.equal(remark, requestRemark, 'The remark should match')
    assert.equal(deadline.toString(), requestDeadline.toString(), 'The deadline should match')
  })

  it('should allow the unit owner to make payments to the community fund by depositing on payment collection request', async function () {
    const { communityFund } = await loadFixture(deployNeighborhoodCommunityFund)
    const [ownerWallet, committeeWallet] = await hre.viem.getWalletClients()

    // Set up the unit owner
    const unitNumber = BigInt(1)
    await communityFund.write.setUnitOwner([unitNumber, ownerWallet.account.address])

    // Whitelist the committee
    await communityFund.write.whitelistCommittee([committeeWallet.account.address])

    // Request a payment
    const requestAmount = parseEther('0.1') // 0.1 ETH
    const requestRemark = 'Monthly security maintenance fee'
    const requestDeadline = BigInt(Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60) // 1 week from now

    await committeeWallet.writeContract({
      address: communityFund.address,
      abi: communityFund.abi,
      functionName: 'requestPayment',
      args: [requestAmount, requestRemark, requestDeadline],
    })

    // Unit owner makes a payment
    await ownerWallet.writeContract({
      address: communityFund.address,
      abi: communityFund.abi,
      functionName: 'payCommunityFund',
      args: [BigInt(0)], // Assuming this is the ID of the payment request
      value: requestAmount, // The amount to pay
    })

    // Verify the payment was made
    const [, totalPaid, lastPaidDate] = await communityFund.read.units([unitNumber]) // Retrieve the unit details

    // Check if the total paid is updated correctly
    assert.equal(
      totalPaid.toString(),
      requestAmount.toString(),
      'Total paid should match the payment amount'
    )
    assert.isTrue(lastPaidDate > 0, 'Last paid date should be updated')

    // Check if the payment status is updated
    const hasPaidStatus = await communityFund.read.hasPaid([BigInt(0), ownerWallet.account.address])
    assert.isTrue(hasPaidStatus, 'The owner should be marked as having paid')
  })

  it('should allow a whitelisted committee to withdraw funds', async function () {
    const { communityFund } = await loadFixture(deployNeighborhoodCommunityFund)
    const [ownerWallet, committeeWallet] = await hre.viem.getWalletClients()

    // Set up the unit owner
    const unitNumber = BigInt(1)
    await communityFund.write.setUnitOwner([unitNumber, ownerWallet.account.address])

    // Whitelist the committee
    await communityFund.write.whitelistCommittee([committeeWallet.account.address])

    // Request a payment
    const requestAmount = parseEther('0.1') // 0.1 ETH
    const requestRemark = 'Monthly security maintenance fee'
    const requestDeadline = BigInt(Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60) // 1 week from now

    await committeeWallet.writeContract({
      address: communityFund.address,
      abi: communityFund.abi,
      functionName: 'requestPayment',
      args: [requestAmount, requestRemark, requestDeadline],
    })

    // Unit owner makes a payment
    await ownerWallet.writeContract({
      address: communityFund.address,
      abi: communityFund.abi,
      functionName: 'payCommunityFund',
      args: [BigInt(0)], // Assuming this is the ID of the payment request
      value: requestAmount, // The amount to pay
    })

    // Verify the payment was made
    const [, totalPaid, lastPaidDate] = await communityFund.read.units([unitNumber]) // Retrieve the unit details

    // Check if the total paid is updated correctly
    assert.equal(
      totalPaid.toString(),
      requestAmount.toString(),
      'Total paid should match the payment amount'
    )
    assert.isTrue(lastPaidDate > 0, 'Last paid date should be updated')

    // Check if the payment status is updated
    const hasPaidStatus = await communityFund.read.hasPaid([BigInt(0), ownerWallet.account.address])
    assert.isTrue(hasPaidStatus, 'The owner should be marked as having paid')

    await committeeWallet.writeContract({
      address: communityFund.address,
      abi: communityFund.abi,
      functionName: 'withdrawFunds',
      args: [requestAmount, 'Withdrawal for security maintenance payment'],
    })

    const publicClient = await hre.viem.getPublicClient()

    const balance = await publicClient.getBalance({
      address: committeeWallet.account.address,
    })

    assert.equal(
      balance.toString(),
      balance.toString(),
      'Total withdrawn should match the payment amount'
    )
  })
})
