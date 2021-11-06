module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId,
  getUnnamedAccounts,
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
  await deploy("Sneeber", {
    from: deployer,
    // gas: 4000000,
    args: ["Sneeber set from ./deploy/Sneeber.ts"],
  });
};
