const hre = require('hardhat')

async function main() {
  // // build and deploy the contract
  await hre.run('compile')

  console.log('Deploying LibExample')
  const LibExample = await hre.thor.getContractFactory('LibExample')
  const libExample = await LibExample.deploy()
  await libExample.deployed()
  console.log('LibExample deployed to:', libExample.address)

  console.log(`Deploying LibUser with LibExample pointing to ${libExample.address}`)
  const LibUser = await hre.thor.getContractFactory('LibUser', {
    libraries: {
      LibExample: libExample.address
    }
  })
  const libUser = await LibUser.deploy()

  // archive contract interface and address on the blockchain
  await libUser.deployed()
  console.log('LibUser deployed to:', libUser.address)

  const result = await libUser.getPow(2, 2)
  console.log('Testing getPow(2, 2):', result)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
