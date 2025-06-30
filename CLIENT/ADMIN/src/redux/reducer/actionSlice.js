import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    actionMenu: false
}

export const actionSlice = createSlice({
    name: "Action",
    initialState,
    reducers: {
        actionOpenMenu: (state, action) => {
            state.actionMenu = action.payload
        }
    }
})

export const { actionOpenMenu } = actionSlice.actions
export default actionOpenMenu.reducer
