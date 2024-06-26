import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IUserState, ApiStatus, IUserForm } from "./User.type";
import { getUserList, createUserList } from "./UserService";

const initialState: IUserState = {
    list: [],
    listStatus: ApiStatus.ideal,
    createUserFormStatus: ApiStatus.ideal
}

export const getUserListAction = createAsyncThunk(
    "user/getUserListAction", async () => {
        const response = await getUserList();
        return response.data
    })

export const createUserAction = createAsyncThunk(
    "user/createUserAction", async (data: IUserForm) => {
        const sendData = await createUserList(data);
        return sendData.data
    })

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserListAction.pending, (state) => {
            state.listStatus = ApiStatus.loading
        });
        builder.addCase(getUserListAction.fulfilled, (state, action) => {
            state.listStatus = ApiStatus.ideal
            state.list = action.payload
        });
        builder.addCase(getUserListAction.rejected, (state) => {
            state.listStatus = ApiStatus.error
        });
        builder.addCase(createUserAction.pending, (state) => {
            state.createUserFormStatus = ApiStatus.loading
        });
        builder.addCase(createUserAction.fulfilled, (state) => {
            state.createUserFormStatus = ApiStatus.success
        });
        builder.addCase(createUserAction.rejected, (state) => {
            state.createUserFormStatus = ApiStatus.error
        })

    }

})

export default userSlice.reducer;