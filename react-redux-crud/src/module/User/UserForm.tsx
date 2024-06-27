import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FormInput } from "../../components/Input/input";
import Style from "./UserFormStyle.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createUserAction, resetCreateListStatus, updateUserAction } from "./UserSlice";
import { ApiStatus, IUpdateUserActionProps, IUserForm } from "./User.type";
import { RootState } from "../../app/store";
import { useParams } from "react-router-dom";
import { toastError, toastWarn } from "../../components/ToastifyConfig";

interface IProps {
  isEditForm?: boolean;
}

const UserForm = (props: IProps) => {
  const { isEditForm } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const params = useParams();

  const useIdToEdit = useRef(params.id || "");
  const { list } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isEditForm && useIdToEdit.current) {
      const userData = list.filter((x) => x.id === useIdToEdit.current);

      if(userData.length){
        setName(userData[0].name);
        setEmail(userData[0].email);
      }
    }
  }, [isEditForm]);

  const { createUserFormStatus, updateUserFormStatus } = useAppSelector(
    (state: RootState) => state.user
  );

  const dispatch = useAppDispatch();

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const data: IUserForm = { name, email };

    if(name && email){
      if(isEditForm){
        const updateData: IUpdateUserActionProps = {id : useIdToEdit.current, data};
        dispatch(updateUserAction(updateData))
      }else {
        const data: IUserForm = { name, email };
        dispatch(createUserAction(data));
      }
    }else{
      toastWarn("Plese Fill the form")
    }
  };

  useEffect(() => {
    if (createUserFormStatus === ApiStatus.success) {
      setName("");
      setEmail("");
      dispatch(resetCreateListStatus);
    }
  }, [createUserFormStatus]);

  return (
    <>
      <div className={Style.container}>
        <form className={Style.form} onSubmit={onSubmitForm}>
          <FormInput
            label="Name"
            value={name}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => [
              setName(e.target.value),
            ]}
          />
          <FormInput
            label="Email"
            value={email}
            type="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) => [
              setEmail(e.target.value),
            ]}
          />
          <div className={Style["btn-wrapper"]}>
            <input type="submit" value={isEditForm ? "Update" : "Add User"} 
            disabled={updateUserFormStatus === ApiStatus.loading || createUserFormStatus === ApiStatus.loading}/>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserForm;
