import store from "../store";

const fetchDataRequest = () => {
    return {
        type: "CHECK_DATA_REQUEST"
    };
}

const fetchDataSuccess = (payload) => {
    return {
        type: "CHECK_DATA_SUCCESS",
        payload: payload
    };
}

const fetchDataFailed = (payload) => {
    return {
        type: "CHECK_DATA_FAILED",
        payload: payload
    };
}

export const fetchData = (account, skullId) => {
    return async (dispatch) => {
        dispatch(fetchDataRequest());

        try {
            const allSkulls = await store.getState().blockchain.gameContract.methods.getSkulls().call();
            const allUserSkulls = await store.getState().blockchain.gameContract.methods.getUserSkulls(account).call();
            const bossInfo = await store.getState().blockchain.gameContract.methods.getBossInfo().call();
            const selectedSkull = allSkulls[skullId ? skullId.toString() : skullId];

            dispatch(fetchDataSuccess({ allSkulls, allUserSkulls, bossInfo, selectedSkull }));
        }

        catch (error) {
            dispatch(fetchDataFailed("Error al cargar los datos del smart contract"));
        }

    }

}