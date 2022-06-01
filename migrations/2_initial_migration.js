const GameContract = artifacts.require("GameContract");

module.exports = function (deployer) {
    deployer.deploy(
        GameContract,
        "SkullGame",
        "SG",
        "Strong Tree",
        100000,
        1000,
        "https://i.pinimg.com/564x/db/b3/d1/dbb3d1bc432dae5098b07edb449c87b9.jpg"
    );
};