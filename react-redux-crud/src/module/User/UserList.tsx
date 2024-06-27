import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ApiStatus, IUser } from "./User.type";
import { deleteUserAction, getUserListAction } from "./UserSlice";
import Style from "./UserFormStyle.module.css";
import { Modal } from "../../components/Modal";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [userDataToView, setUserDataToView] = useState<IUser | null>(null);
  const { list, listStatus } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const navigator =  useNavigate() 

  useEffect(() => {
    dispatch(getUserListAction());
  }, []);

  return (
    <>
      <div>
        <table className={Style.table}>
          <thead>
            <tr className={Style.tr}>
              <th className={Style.th}>Sr. No.</th>
              <th className={Style.th}>Name</th>
              <th className={Style.th}>Email</th>
              <th className={Style.th}>Action</th>
            </tr>
          </thead>

          {listStatus === ApiStatus.loading && <tbody>List is loading</tbody>}
          {listStatus === ApiStatus.error && (
            <tbody>Error while loading list</tbody>
          )}
          {listStatus === ApiStatus.ideal &&
            list.map((user: IUser, index: number) => {
              return (
                <tbody>
                  <tr className={Style.tr}>
                    <td className={Style.td}>{index + 1}</td>
                    <td className={Style.td}>{user.name}</td>
                    <td className={Style.td}>{user.email}</td>
                    <td>
                      <div>
                        <input
                          type="button"
                          value={"View"}
                          onClick={() => {

                            setUserDataToView(user);
                          }}
                        />
                        <input type="button" value={"Edit"} onClick={() => {
                          navigator(`/edit/${user.id}`)
                        }}/>
                        <input type="button" value={"Delete"} onClick={() => {
                          dispatch(deleteUserAction(user.id))
                        }}/>
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
      {userDataToView && (
        <Modal
          title="User Details"
          onClose={() => {
            setUserDataToView(null);
          }}
        >
          <div>
          <div>
            <label>Name : {userDataToView.name}</label>
          </div>
          <div>
            <label>Email : {userDataToView.email}</label>
          </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserList;
