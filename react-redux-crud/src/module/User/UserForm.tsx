import React, { ChangeEvent, useEffect, useState } from "react";
import {FormInput} from "../../components/Input/input";
import Style from "./UserFormStyle.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createUserAction, resetCreateListStatus } from "./UserSlice";
import { ApiStatus, IUserForm } from "./User.type";
import { RootState } from "../../app/store";

const UserForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    
    const {createUserFormStatus} = useAppSelector(( state: RootState ) => state.user)
    const dispatch = useAppDispatch()

    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const data : IUserForm = {name , email};
        dispatch(createUserAction(data))
    }

    useEffect(() => {
      if(createUserFormStatus === ApiStatus.success){
        setName("")
        setEmail("")
        dispatch(resetCreateListStatus)
      }
    }, [createUserFormStatus])

  return (
    <>  
      <div className={Style.container}>
        <form className={Style.form} onSubmit={onSubmitForm}>
            <FormInput label="Name" value={name} type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => [
                setName(e.target.value)
            ]}/>
            <FormInput label="Email" value={email} type="email" onChange={(e: ChangeEvent<HTMLInputElement>) => [
                setEmail(e.target.value)
            ]}/>
          <div className={Style["btn-wrapper"]}>
            <input type="submit" value="Add User" />
          </div>
        </form>
      </div>
    </>
  );
};

export default UserForm;
