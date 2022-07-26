const { ethers } = require('hardhat')
const { BigNumber } = ethers

const contracts = {}
let owner
let user1
let user2

beforeEach(async function () {
  [owner, user1, user2] = await ethers.getSigners()

  const LibExample = await ethers.getContractFactory('LibExample')
  const libExample = await LibExample.deploy()

  const LibUser = await ethers.getContractFactory('LibUser', {
    libraries: {
      LibExample: libExample.address
    }
  })

  contracts.libUser = await LibUser.deploy()
})

describe('can calculate using example library', () => {
  it('has the power', async () => {
    const result = await contracts.libUser.getPow(2, 2)
    expect(result).toEqual(BigNumber.from(4))
  })
})
