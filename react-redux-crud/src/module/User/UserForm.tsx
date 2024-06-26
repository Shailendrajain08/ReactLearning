import React, { ChangeEvent, useState } from "react";
import {FormInput} from "../../components/Input/input";
import Style from "./UserFormStyle.module.css";
import { useAppDispatch } from "../../app/hooks";
import { createUserAction } from "./UserSlice";
import { IUserForm } from "./User.type";

const UserForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useAppDispatch()

    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const data : IUserForm = {name , email};
        dispatch(createUserAction(data))
    }

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
