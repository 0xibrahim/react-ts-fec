
export const ActionTypes = {
    SET_NUMBER_OF_PARTS: "SET_NUMBER_OF_PARTS",    
    STEP1_BUTTON_STATUS: "STEP1_BUTTON_STATUS",
    STEP2_BUTTON_STATUS: "STEP2_BUTTON_STATUS",
    SET_ACTIVE_STEP:     "SET_ACTIVE_STEP",
    RESET_STATE:         "RESET_STATE",
};


export function setNumberOfParts(nparts: number) {
    return {
        type: ActionTypes.SET_NUMBER_OF_PARTS,
        payload: nparts,
    };
}

export function setStep1ButtonStatus(status: boolean) {
    return {
        type: ActionTypes.STEP1_BUTTON_STATUS,
        payload: status,
    };
}

export function setStep2ButtonStatus(status: boolean) {
    return {
        type: ActionTypes.STEP2_BUTTON_STATUS,
        payload: status,
    };
}


export function setActiveStep(step: number) {
    return {
        type: ActionTypes.SET_ACTIVE_STEP,
        payload: step,
    }
}

export function resetState() {
    return {
        type: ActionTypes.RESET_STATE,
        payload: 0,
    }
}
