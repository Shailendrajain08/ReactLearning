import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ApiStatus, IUser } from "./User.type";
import { getUserListAction } from "./UserSlice";

const UserList = () => {
  const { list, listStatus } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserListAction());
  }, []);

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
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
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>Action</td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
    </>
  );
};

export default UserList;
