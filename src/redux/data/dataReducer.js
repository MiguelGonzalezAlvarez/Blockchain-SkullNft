const initialState = {
    loading: false,
    allSkulls: [],
    allUserSkulls: [],
    bossInfo: null,
    selectedSkull: null,
    error: false,
    errorMsg: ""
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHECK_DATA_REQUEST":
            return {
                ...initialState,
                loading: true
            };

        case "CHECK_DATA_SUCCESS":
            return {
                ...initialState,
                loading: false,
                allSkulls: action.payload.allSkulls,
                allUserSkulls: action.payload.allUserSkulls,
                bossInfo: action.payload.bossInfo,
                selectedSkull: action.payload.selectedSkull
            };

        case "CHECK_DATA_FAILED":
            return {
                ...initialState,
                loading: false,
                error: true,
                errorMsg: action.payload
            };

        default: return state
    }
}

export default dataReducer;