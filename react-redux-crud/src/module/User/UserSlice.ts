import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IUserState, ApiStatus, IUserForm, IUpdateUserActionProps } from "./User.type";
import { getUserList, createUserList, deleteUser, updateUser } from "./UserService";
import { toastError, toastSuccess, toastWarn } from "../../components/ToastifyConfig";

const initialState: IUserState = {
    list: [],
    listStatus: ApiStatus.ideal,
    createUserFormStatus: ApiStatus.ideal,
    updateUserFormStatus: ApiStatus.ideal
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

export const deleteUserAction = createAsyncThunk("user/deleteUserAction", async (id: string) => {
    await deleteUser(id);
    return id;
})

export const updateUserAction = createAsyncThunk("user/updateUserAction", async ({ id, data }: IUpdateUserActionProps) => {
    const response = await updateUser(id, data)
    return response.data
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetCreateListStatus: (state) => {
            state.createUserFormStatus = ApiStatus.ideal
        }
    },
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
            toastSuccess("User Created Successfully!")
        });
        builder.addCase(createUserAction.rejected, (state) => {
            state.createUserFormStatus = ApiStatus.error
            toastError("Error While Creating User!")
        });
        builder.addCase(deleteUserAction.fulfilled, (state, action) => {
            const newList = state.list.filter((x) => x.id !== action.payload)
            state.list = newList
            toastWarn("User Deleted!")
        });
        builder.addCase(updateUserAction.pending, (state) => {
            state.updateUserFormStatus = ApiStatus.loading
        });
        builder.addCase(updateUserAction.fulfilled, (state) => {
            state.updateUserFormStatus = ApiStatus.ideal
            toastSuccess("User Updated Successfully!")
        });
        builder.addCase(updateUserAction.rejected, (state) => {
            state.updateUserFormStatus = ApiStatus.error
            toastError("Error While Updating User!")
        })

    }

})

export default userSlice.reducer;
export const { resetCreateListStatus } = userSlice.actions