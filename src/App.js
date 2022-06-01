import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";

import * as globalStyle from "./styles/styles";
import _background from "./assets/background/background.jpg"

import SkullRenderer from "./components/Renderers/SkullRenderer"
import BossRenderer from "./components/Renderers/BossRenderer"
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
import HealthBar from './components/HealthBar/HealthBar';

import './App.css';


function App() {
  // Carga de la información
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const blockchain = useSelector((state) => state.blockchain);
  const [loading, setLoading] = useState(false);
  const [bossFightState, setBossFightState] = useState(false);
  const [bossDefeatedState, setBossDefeatedState] = useState(false);

  // Mint de un nuevo Token NFT
  const mintNFT = async (_account, _name) => {
    setLoading(true);
    blockchain.gameContract.methods.createSkull(_name).send({
      from: _account,
      value: blockchain.web3.utils.toWei("0.1", "ether"),
    }).once("error", () => {
      setLoading(false);
    }).then(() => {
      setLoading(false);
      dispatch(fetchData(blockchain.account));
    });
  };

  // Subir nivel de un Token NFT
  const levelUpSkull = async (_account, _item) => {
    const levelUpCost = _item.level * _item.rarity / 1000;

    setLoading(true);

    blockchain.gameContract.methods.levelUpSkull(_item.id).send({
      from: _account,
      value: blockchain.web3.utils.toWei(levelUpCost.toString(), "ether")
    }).once("error", () => {
      setLoading(false);
    }).then(() => {
      setLoading(false);
      dispatch(fetchData(blockchain.account));
    });
  };

  // Devolver toda la vida a un token que este muerto
  const reviveSkull = async (_account, _item) => {
    const reviveCost = _item.rarity / 100;

    setLoading(true);

    blockchain.gameContract.methods.reviveSkull(_item.id).send({
      from: _account,
      value: blockchain.web3.utils.toWei(reviveCost.toString(), "ether")
    }).once("error", () => {
      setLoading(false);
    }).then(() => {
      setLoading(false);
      dispatch(fetchData(blockchain.account));
    });
  };

  // Iniciar una batalla contra el boss
  const startBossFight = async (_account, _item) => {
    setBossFightState(true);
    data.selectedSkull = _item;
  };

  // Iniciar una huida del boss
  const leaveBossFight = async () => {
    setBossFightState(false);
    data.selectedSkull = null;
  };

  // Iniciar un ataque contra el boss
  const attackBoss = async (_account, _item) => {
    const attackBossCost = _item.rarity * _item.level / 10000;

    setLoading(true);

    blockchain.gameContract.methods.attackSkull(_item.id).send(
      {
        from: _account,
        value: blockchain.web3.utils.toWei(attackBossCost.toString(), "ether")
      }
    )
      .once("error", () => setLoading(false))
      .then((response) => {
        setLoading(false);
        setBossDefeatedState(response.events.BossAttacked.returnValues.isBossDefeated);
        dispatch(fetchData(blockchain.account, _item.id));
      });
  };

  // Visualizar el balance del Smart Contract
  const balanceSmartContract = async () => {
    const money = blockchain.gameContract.methods.moneySmartContract().call();
    money.then(value => alert(`The balance since the last withdraw is ${parseFloat(value / 1000000000000000000)} money units`));
  };

  // Obtención del dinero por el usuario que derroto al boss
  const claimReward = async (_account) => {
    setLoading(true);
    blockchain.gameContract.methods.withdrawWinner().send({
      from: _account,
    }).once("error", () => {
      setLoading(false);
    }).then(() => {
      setLoading(false);
      setBossFightState(false);
      setBossDefeatedState(false);
      dispatch(fetchData(blockchain.account));
    });
  };

  // Funcion para renderizar la pantalla de loading
  const renderLoadingScreen = () => {
    return (
      <globalStyle.LoadingContainer ai={"center"} style={{ padding: "24px" }}>
        <globalStyle.TextTitle>Processing Transaction</globalStyle.TextTitle>
        <LoadingIndicator />
      </globalStyle.LoadingContainer>
    );
  }

  // Funcion para renderizar la pantalla de conectar cuenta
  const renderConnectScreen = () => {
    return (
      <globalStyle.Container flex={1} ai={"center"} jc={"center"}>
        <globalStyle.TextTitle>Welcome to Skull Game</globalStyle.TextTitle>
        <globalStyle.SpacerSmall />

        <globalStyle.Button1 onClick={(e) => { e.preventDefault(); dispatch(connect()); }}>Connect</globalStyle.Button1>
        <globalStyle.SpacerSmall />

        {blockchain.errorMsg !== "" ? (<globalStyle.TextDescription> {blockchain.errorMsg} </globalStyle.TextDescription>) : null}
      </globalStyle.Container>
    );
  }

  // Funcion para renderizar la pantalla de seleccion de skull
  const renderCharacterSelectionScreen = () => {
    return (
      <globalStyle.Container ai={"center"} style={{ padding: "24px" }}>
        <globalStyle.TextTitle> ¡Welcome to Skull Game! </globalStyle.TextTitle>
        <globalStyle.SpacerSmall />

        <globalStyle.ButtonContainer>
          <globalStyle.Button2 onClick={(e) => {
            const name = "Skull NFT"
            e.preventDefault();
            mintNFT(blockchain.account, name)
          }}
          >
            ➕ Create new skull ➕
          </globalStyle.Button2>

          <globalStyle.Button4 onClick={(e) => { e.preventDefault(); balanceSmartContract(); }}>⚖️ Show Balance ⚖️</globalStyle.Button4>

        </globalStyle.ButtonContainer>

        <globalStyle.SpacerMedium />

        <globalStyle.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap" }} >
          {data.allUserSkulls.map((skull, index) => {

            return (
              <globalStyle.Container key={index} style={{ padding: "15px" }} >
                <SkullRenderer skull={skull} />
                <globalStyle.SpacerXSmall />

                <globalStyle.Container>
                  <globalStyle.nameTitle>{skull.name} #{skull.id}</globalStyle.nameTitle>
                  <globalStyle.SpacerXSmall />

                  <globalStyle.TextDescription>Rarity: {skull.rarity}</globalStyle.TextDescription>

                  <globalStyle.TextDescription>Level: {skull.level}</globalStyle.TextDescription>

                  <globalStyle.TextDescription>Dna: {skull.dna}</globalStyle.TextDescription>
                  <globalStyle.SpacerXSmall />

                  {
                    skull.hpPoints === "0" ? <div></div> : <globalStyle.Button3 onClick={(e) => { e.preventDefault(); levelUpSkull(blockchain.account, skull); }}> ⏫ Level Up ⏫ </globalStyle.Button3>
                  }
                  {
                    skull.hpPoints === "0" ?
                      <globalStyle.Button9 onClick={(e) => { e.preventDefault(); reviveSkull(blockchain.account, skull); }}> 🏵️ Revive Skull 🏵️ </globalStyle.Button9>
                      :
                      <globalStyle.Button5 onClick={(e) => { e.preventDefault(); startBossFight(blockchain.account, skull); }}> 💀 Fight boss 💀 </globalStyle.Button5>
                  }
                </globalStyle.Container>

              </globalStyle.Container>
            );
          })}
        </globalStyle.Container>

      </globalStyle.Container>
    );
  }

  // Funcion para renderizar la pantalla de seleccion de skull
  const renderFightButton = () => {
    return data.selectedSkull.hpPoints === "0" ? <div></div> : <globalStyle.Button7 onClick={(e) => { e.preventDefault(); attackBoss(blockchain.account, data.selectedSkull); }}>🤺 Attack 🤺</globalStyle.Button7>
  }

  // Funcion para renderizar el NFT que va a luchar
  const renderCharacterSelectedElement = () => {
    return data.selectedSkull ?
      <globalStyle.CharacterContainer style={{ padding: "15px" }} >

        <SkullRenderer skull={data.selectedSkull} />
        <globalStyle.SpacerXSmall />

        <globalStyle.Container>
          <HealthBar hp={data.selectedSkull.hpPoints} maxHp={data.selectedSkull.maxHpPoints} />
          <globalStyle.SpacerXSmall />

          {
            renderFightButton()
          }

          <globalStyle.Button8 onClick={(e) => { e.preventDefault(); leaveBossFight(); }}>👣 Leave 👣</globalStyle.Button8>
        </globalStyle.Container>

      </globalStyle.CharacterContainer>
      :
      (<div></div>)
  }

  // Funcion para renderizar el jefe
  const renderBossElement = () => {
    return data.bossInfo ?
      <globalStyle.BossContainer style={{ padding: "15px" }} >
        <globalStyle.BossTitle>👾 {data.bossInfo.name} 👾</globalStyle.BossTitle>
        <globalStyle.SpacerXSmall />

        <BossRenderer bossInfo={data.bossInfo} size={150} />
        <globalStyle.SpacerXSmall />

        <globalStyle.Container style={{ width: '100%' }}>
          <HealthBar hp={data.bossInfo.hpPoints} maxHp={data.bossInfo.maxHpPoints} />
        </globalStyle.Container>
      </globalStyle.BossContainer>
      :
      (<div></div>)
  }

  // Funcion para renderizar la pantalla de pelea con el jefe
  const renderFightBossScreen = () => {
    return (
      <globalStyle.Container ai={"center"} style={{ padding: "24px" }}>
        <globalStyle.FightTitle> 🔥 Boss Fight Started 🔥 </globalStyle.FightTitle>

        <globalStyle.SpacerSmall />

        <globalStyle.FightContainer jc={"center"} fd={"row"} style={{ flexWrap: "wrap" }} >
          {
            renderCharacterSelectedElement()
          }
          {
            renderBossElement()
          }
        </globalStyle.FightContainer>
      </globalStyle.Container>
    );
  }

  // Funcion para renderizar la pantalla de victoria
  const renderDefeatedBossScreen = () => {
    return (
      <globalStyle.Container ai={"center"} style={{ padding: "24px" }}>
        <globalStyle.FightTitle> 🥳️ Boss Defeated 🥳️ </globalStyle.FightTitle>

        <globalStyle.SpacerSmall />

        <globalStyle.FightContainer jc={"center"} fd={"row"} style={{ flexWrap: "wrap" }} >
          <globalStyle.Button6 onClick={(e) => { e.preventDefault(); claimReward(blockchain.account); }}>💵 Claim Reward 💵</globalStyle.Button6>
        </globalStyle.FightContainer>
      </globalStyle.Container>
    );
  }

  // Función para seleccionar que vista se debe renderizar
  const renderView = () => {
    // Renderizar la animacion de cargando
    if (loading) {
      return renderLoadingScreen();
    }

    // Renderizar la pantalla de conexion
    if (blockchain.account === "" || blockchain.gameContract === null) {
      return renderConnectScreen();
    }

    // Renderizar la pantalla de seleccion
    if (!bossFightState && !bossDefeatedState) {
      return renderCharacterSelectionScreen();
    }

    // Renderizar la pantalla de pelea
    if (bossFightState && !bossDefeatedState) {
      return renderFightBossScreen();
    }

    return renderDefeatedBossScreen();
  };

  // De forma similar a componentDidMount y componentDidUpdate
  useEffect(() => {
    if (blockchain.account !== "" && blockchain.gameContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.gameContract]); // eslint-disable-line react-hooks/exhaustive-deps

  // Visualización del videojuego
  return (
    <globalStyle.Screen image={_background}>
      {
        renderView()
      }
    </globalStyle.Screen>
  );
}

export default App;
