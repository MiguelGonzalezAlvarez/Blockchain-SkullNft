import Web3 from "web3";
import GameContract from "../../contracts/GameContract.json"

import { fetchData } from "../data/dataActions";

const connectRequest = () => {
    return {
        type: "CONNECTION_REQUEST"
    };
}

const connectSuccess = (payload) => {
    return {
        type: "CONNECTION_SUCCESS",
        payload: payload
    };
}

const connectFailed = (payload) => {
    return {
        type: "CONNECTION_FAILED",
        payload: payload
    };
}

const updateAccountRequest = (payload) => {
    return {
        type: "UPDATE_ACCOUNT",
        payload: payload
    };
}

export const connect = () => {
    return async (dispatch) => {
        dispatch(connectRequest());

        if (window.ethereum) {
            let web3 = new Web3(window.ethereum);

            try {
                await window.ethereum.enable();
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                const networkId = await window.ethereum.request({ method: "net_version" });

                // Ganache -> 5777
                // BSC Testnet -> 97
                // Polygon Testnet -> 80001
                if (networkId === '97') {
                    const networkData = GameContract.networks[networkId]; // Obtenemos los datos que se corresponden con el usuario que se conecto
                    const abi = GameContract.abi;
                    const address = networkData.address;
                    const deployedContract = new web3.eth.Contract(abi, address);

                    dispatch(
                        connectSuccess({
                            account: accounts[0],
                            gameContract: deployedContract,
                            web3: web3
                        })
                    );

                    window.ethereum.on("accountsChanged", (accountsChanged) => {
                        dispatch(updateAccountRequest(accountsChanged[0]));
                    });

                    window.ethereum.on("chainChanged", () => {
                        window.location.reload();
                    });

                }

                else {
                    dispatch(connectFailed("¡El smart contract no se ha podido desplegar en la red!"));
                }

            }

            catch (error) {
                dispatch(connectFailed("Error al cargar los datos del smart contract"));
            }

        }

        else {
            dispatch(connectFailed("Tienes que instalar metamask"));
        }

    }

}

export const updateAccount = (account) => {
    return async (dispatch) => {
        dispatch(updateAccountRequest({ account: account }));
        dispatch(fetchData(account));
    }
}