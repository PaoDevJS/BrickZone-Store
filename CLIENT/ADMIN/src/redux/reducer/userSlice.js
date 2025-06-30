import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {}
}

export const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        infoUser: (state, action) => {
            state.user = action.payload
        },
        startUser: (state) => {
            state.user = {}
        }
    }
})

export const { infoUser, startUser } = userSlice.actions

export default userSlice.reducer;