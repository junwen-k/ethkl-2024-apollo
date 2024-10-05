import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const NeighborhoodCommunityFundModule = buildModule('NeighborhoodCommunityFundModule', (m) => {
  const neighborhoodCommunityFund = m.contract('NeighborhoodCommunityFund')

  // Demo address.
  const commiteeAddress = '0xb9dB5a648554FD3EE29C2B395D92Ca3424a67252'

  m.call(neighborhoodCommunityFund, 'whitelistCommittee', [commiteeAddress])

  return { neighborhoodCommunityFund, commiteeAddress }
})

export default NeighborhoodCommunityFundModule
