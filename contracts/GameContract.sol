// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importacion de los Smart Contract: ERC-721.sol y Ownable.sol
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Crear el smart contract para el videojuego NFT
contract GameContract is ERC721, Ownable {
    // Constructor de mi Smart Contract
    constructor(
        string memory _name,
        string memory _symbol,
        string memory treeBossName,
        uint256 treeBossMaxHpPoints,
        uint256 treeBossAttackPoints,
        string memory treeBossImageURI
    ) ERC721(_name, _symbol) {
        // Inicilización del jefe arbol
        treeBoss = TreeBoss({
            name: treeBossName,
            maxHpPoints: treeBossMaxHpPoints,
            hpPoints: treeBossMaxHpPoints,
            attackPoints: treeBossAttackPoints,
            imageURI: treeBossImageURI
        });
    }

    // ================================== Declaraciones iniciales ========================================
    // Contador de tokens NFT
    uint256 skullCounter;

    // Fijación del precio de los tokens NFT
    uint256 cost = 0.001 ether; // Aunque despleguemos en diferentes blockchains el precio del smart contract siempre en ethers

    // Estructura de datos con las propiedades del skull
    struct Skull {
        uint256 id;
        string name;
        uint256 dna;
        uint8 level;
        uint8 rarity;
        uint256 maxHpPoints;
        uint256 hpPoints;
        uint256 attackPoints;
    }

    struct TreeBoss {
        string name;
        uint256 maxHpPoints;
        uint256 hpPoints;
        uint256 attackPoints;
        string imageURI;
    }

    // Estructura de almacenamiento
    Skull[] public skulls;
    TreeBoss public treeBoss;
    address winnerAddress;

    // Declaración de un emisor de eventos
    event CreateSkull(address indexed owner, uint256 id, uint256 dna);
    event LevelUpSkull(address indexed owner);
    event ReviveSkull(address indexed owner);
    event BossAttacked(address indexed owner, bool isBossDefeated);

    // ====================================== Modificadores =========================================
    // Modificador para que solo el ganador pueda sacar dinero
    modifier onlyWinner(address _direccion) {
        require(
            winnerAddress == _direccion,
            "You are not the one who defeated the boss!"
        );
        _;
    }

    // Modificador para que solo el dueño de la skull pueda actuar
    modifier onlySkullOwner(address _direccion, uint256 _skullId) {
        require(ownerOf(_skullId) == _direccion);
        _;
    }

    // =========================== Funciones del dueño del contrato =========================================
    // Actualizador del precio del token NFT
    function updateCost(uint256 _cost) external onlyOwner {
        cost = _cost;
    }

    // Extractor de los ethers del smart contract hacia el owner
    function withdrawOwner() external payable onlyOwner {
        address payable _owner = payable(owner()); // Esta funcion owner de Ownable.sol permite obtener el owner sin necesidad de declararlo en el constructor de nuestro contrato
        _owner.transfer(address(this).balance);
    }

    // =========================== Funciones internas del contrato =========================================
    // Asignador de numeros aleatorios
    function _createRandomNumber(uint256 _mod) internal view returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        );
        return randomNumber % _mod;
    }

    // Creador del token NFT
    function _createSkull(string memory _name) internal {
        uint8 randomRarity = uint8(_createRandomNumber(100));
        uint256 randomDna = _createRandomNumber(10**16);
        uint256 maxHp = _createRandomNumber(100) * randomRarity;
        uint256 attack = _createRandomNumber(10) * randomRarity;

        Skull memory newSkull = Skull(
            skullCounter,
            _name,
            randomDna,
            1,
            randomRarity,
            maxHp,
            maxHp, // Por defecto todos los nft empiezan con toda la vida
            attack
        );

        skulls.push(newSkull);
        _safeMint(msg.sender, skullCounter); // Función de ERC721.sol que asigna al msg sender que ejecute el token el valor del contador

        skullCounter++; 
        emit CreateSkull(msg.sender, skullCounter, randomDna); // Emitimos el evento de que el token ha sido creado
    }

    // Subir de nivel los tokens NFT
    function _levelUpSkull(uint256 _skullId) internal {
        Skull storage skull = skulls[_skullId];
        skull.level++;
        skull.maxHpPoints = skull.maxHpPoints + 500;
        skull.attackPoints = skull.attackPoints + 50;
        skull.hpPoints = skull.maxHpPoints;
        emit LevelUpSkull(msg.sender);
    }

    // Revivir un token NFT
    function _reviveSkull(uint256 _skullId) internal {
        Skull storage skull = skulls[_skullId];
        skull.hpPoints = skull.maxHpPoints;
        skull.level = 1;
        emit ReviveSkull(msg.sender);
    }

    // Iniciar un ataque contra el TreeBoss
    function _attackBoss(uint256 _skullId) internal {
        // Muy importante usar el storage para poder modificar los valores del nft
        Skull storage skull = skulls[_skullId];

        // Comprobar que el NFT seleccionado tiene mas de 0 HP.
        require( skull.hpPoints > 0,"Error: La skull tiene que tener vida para poder atacar");

        // Comprobar que el jefe tiene mas de 0 HP.
        require(treeBoss.hpPoints > 0,"Error: El jefe tiene que tener vida para poder atacar");

        // Permitir que la skull seleccionada ataque al jefe
        if (treeBoss.hpPoints < skull.attackPoints) {
            treeBoss.hpPoints = 0;
            winnerAddress = msg.sender;
        } else {
            treeBoss.hpPoints = treeBoss.hpPoints - skull.attackPoints;
        }

        // Permitir que el jefe ataque a la skull seleccionada
        if (skull.hpPoints < treeBoss.attackPoints) {
            skull.hpPoints = 0;
        } else {
            skull.hpPoints = skull.hpPoints - treeBoss.attackPoints;
        }

        emit BossAttacked(msg.sender, treeBoss.hpPoints == 0);
    }

    // ====================================== Funciones publicas del contrato =========================================
    // Obtención de los tokens de un usuario concreto
    function getUserSkulls(address _owner)
        public
        view
        returns (Skull[] memory)
    {
        Skull[] memory result = new Skull[](balanceOf(_owner));

        uint256 loopCounter = 0;
        for (uint256 i = 0; i < skulls.length; i++) {
            if (ownerOf(i) == _owner) {
                result[loopCounter] = skulls[loopCounter];
                loopCounter++;
            }
        }

        return result;
    }

    // Obtención de todos los tokens NFT
    function getSkulls() public view returns (Skull[] memory) {
        return skulls;
    }

    // Obtención de la información del jefe
    function getBossInfo() public view returns (TreeBoss memory) {
        return treeBoss;
    }

    // Visualizar la dirección del smart contract
    function addressSmartContract() public view returns (address) {
        return address(this);
    }

    // Visualizar el balance del smart contract
    function moneySmartContract() public view returns (uint256) {
        return address(this).balance;
    }

    // Extractor de los ethers del smart contract hacia la direccion del que derroto al jefe
    function withdrawWinner() public payable onlyWinner(msg.sender) {
        // Transferimos el dinero al address del usuario que le dio el ultimo golpe al jefe
        address payable _winner = payable(msg.sender);
        _winner.transfer(address(this).balance);

        // Reseteamos la address del ganador
        winnerAddress = address(0);

        // Una vez reclamada la recompensa el boss revive
        TreeBoss storage boss = treeBoss;
        boss.hpPoints = boss.maxHpPoints;
    }

    // Verificación de crear un NFT
    function createSkull(string memory _name) public payable {
        require(msg.value >= cost); // Comprobamos que el pago es suficiente
        _createSkull(_name);
    }

    // Verificación de subir de nivel un NFT
    function levelUpSkull(uint256 _skullId)
        public
        payable
        onlySkullOwner(msg.sender, _skullId)
    {
        Skull storage skull = skulls[_skullId];
        require(msg.value >= (skull.level * skull.rarity) / 1000); // Comprobamos que el pago es suficiente
        _levelUpSkull(_skullId);
    }

    // Verificación de revivir un NFT
    function reviveSkull(uint256 _skullId)
        public
        payable
        onlySkullOwner(msg.sender, _skullId)
    {
        Skull storage skull = skulls[_skullId];
        require(msg.value >= skull.rarity / 10); // Comprobamos que el pago es suficiente
        _reviveSkull(_skullId);
    }

    // Verificación de atacar al jefe
    function attackSkull(uint256 _skullId)
        public
        payable
        onlySkullOwner(msg.sender, _skullId)
    {
        Skull storage skull = skulls[_skullId];
        require(msg.value >= (skull.rarity * skull.level) / 10000); // Comprobamos que el pago es suficiente
        _attackBoss(skull.id);
    }
}
