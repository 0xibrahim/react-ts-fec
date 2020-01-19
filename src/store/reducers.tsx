import { ActionTypes } from './actions'

const initialState = {
    activestep: 0,
    nparts: 0,
    step1nextbuttondisabled: true,
    step2nextbuttondisabled: true
};

const reducer = (state = initialState, action: any) => {

    switch(action.type) {
        case ActionTypes.SET_NUMBER_OF_PARTS:
        // console.log("reducer");
        // console.log(action);          
        console.log("reducer-setparts");
        return {
                ...state,
                nparts: parseInt(action.payload),
                step1nextbuttondisabled: false 
            };
        
        case ActionTypes.STEP1_BUTTON_STATUS:
                return {
                    ...state,                    
                    step1nextbuttondisabled: action.payload
                };            

        case ActionTypes.STEP2_BUTTON_STATUS:            
            return {
                ...state,                    
                step2nextbuttondisabled: action.payload
            };            
    

        case ActionTypes.SET_ACTIVE_STEP:            
            return {
                ...state,
                activestep: action.payload
            };

        case ActionTypes.RESET_STATE:
            return {
                activestep: 0,
                nparts: 0,
                step1nextbuttondisabled: true,
                step2nextbuttondisabled: true                
            }

        default:
            return state;


    }
};

export default reducer;