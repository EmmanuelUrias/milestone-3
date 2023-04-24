import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
    user_id: number,
    user_name: string,
    password: string,
    email: string,
    budget: number,
    time_stamp: string
}

interface Expense {
    expense_id: number,
    expense_name: string,
    expense_amount: number,
    expense_type: string,
    user_id: number,
    time_stamp: string
}

interface InitialState {
    user: User,
    token: string,
    expenses: Expense[]
}

const initialState: InitialState = {
    user: {
        user_id: 0,
        user_name: 'none',
        password: 'none',
        email: 'none',
        budget: 0,
        time_stamp: '0'
    },
    token: 'null',
    expenses: []
}

export const userAuthAndInfoSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setLogin: (state: InitialState, action: PayloadAction<InitialState>) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state: InitialState) => {
            state.user = {
                user_id: 0,
                user_name: 'none',
                password: 'none',
                email: 'none',
                budget: 0,
                time_stamp: '0'
            }
            state.token = 'null'
        }
    }
})

export const { setLogin, setLogout } = userAuthAndInfoSlice.actions
export default userAuthAndInfoSlice.reducer