import "./App.css";
import { UserForm } from "./components/UserForm";
import { DELETE, GET, POST, PUT } from "./utils/fetch.utils";
import { FormEvent, useEffect, useState } from "react";

export type User = {
  id: string;
  name: string;
  age: string;
  email: string;
};

export type NewUser = {
  name: string;
  age: string;
  email: string;
};

type GetUsersOutput = User[];

type OnPutUserParam = {
  event: FormEvent;
  id: string;
  userEditForm: NewUser;
};

// type CreateUserInput = { user: NewUser };

// type UpdateUserInput = { user: User };

const url = "http://localhost:3000";

// const initialUser = { name: "", age: "", email: "" };
const initialSelectedUser = { id: "", name: "", age: "", email: "" };

function App() {
  const [users, setUsers] = useState<GetUsersOutput>([]);
  const [selectedUser, setSelectedUser] = useState<User>(initialSelectedUser);
  const [createUserForm, setCreateUserForm] =
    useState<User>(initialSelectedUser);
  // const [userEditForm, setSelectUser] = useState<NewUser>(initialSelectedUser);
  // const [showFormEdit, setShowFormEdit] = useState(false);

  const onGetUsers = async () => {
    const data = await GET<GetUsersOutput>(`${url}/users`);
    console.log("get");
    setUsers(data);
  };

  const onPostUser = async () => {
    const data = await POST<User, { user: User }>(`${url}/users`, {
      user: createUserForm,
    });
    console.log(`post ${data}`);
    setCreateUserForm(initialSelectedUser);
    onGetUsers();
  };

  const onPutUser = async ({ event, id, userEditForm }: OnPutUserParam) => {
    console.log("put");
    event.preventDefault();
    const data = await PUT<User, { user: NewUser }>(`${url}/users/:${id}`, {
      user: userEditForm,
    });
    console.log({ data });
    setSelectedUser(initialSelectedUser);
    // setShowFormEdit(false);
    setSelectedUser(initialSelectedUser);
    onGetUsers();
  };
  // console.log("ssss");

  // const onGetUsers = useCallback(async () => {
  //   try {
  //     await getUsers(undefined);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [getUsers]);

  // const onCreateUser = async () => {
  //   console.log("create new user");
  //   // try {
  //   //   await createUser({ user: userForm });
  //   //   setUserForm(initialUser);
  //   //   await getUsers(undefined);
  //   // } catch (error) {
  //   //   console.error(error);
  //   // }
  // };

  // const onUpdateUser = async () => {
  //   try {
  //     await updateUser({ user: User });
  //     // const updatedUser: Partial<User> = {
  //     //   ...user,
  //     //   name: `${user.name} edit-${Math.round(Math.random() * 10_000)}`,
  //     // };
  //     // delete updatedUser.id;
  //     // const data = await PUT<User, UpdateUserInput>(`${url}/users/${id}`, {
  //     //   user: updatedUser,
  //     // } as UpdateUserInput);
  //     // // setUsers((users: User[]) => users.map((c) => (c.id === id ? data : c)));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const onDeleteUser = async (id: string) => {
  //   try {
  //     await DELETE<string>(`${url}/users/${id}`);
  //     // setUsers((users: User[]) => users.filter((c) => c.id !== id));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const onDisplayUser = async (id: string) => {
  //   try {
  //     const data = await GET<User>(`${url}/users/${id}`);
  //     if (!data) return window.alert("oops, this user does not exist");

  //     const userInfo = `Name: ${data.name}\nAge: ${data.age}\nEmail: ${data.email}`;
  //     window.alert(userInfo);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {

  // }, []);

  const onDeleteUser = async (id: string) => {
    const data = await DELETE<GetUsersOutput>(`${url}/users/:${id}`);
    console.log({ data });
    setUsers(data);
    onGetUsers();
  };

  useEffect(() => {
    onGetUsers();
  }, []);

  return (
    <div>
      <div>
        <UserForm
          userForm={createUserForm}
          setUserForm={setCreateUserForm}
          nameValue={createUserForm.name}
          ageValue={createUserForm.age}
          emailValue={createUserForm.email}
          onClick={onPostUser}
        />
        <section>
          <h2>USERS</h2>

          {
            //!isLoadingUsers &&
            // !isLoadingPostUser &&
            // !usersError &&
            // users &&
            users.map((c) => (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "4px 0px",
                }}
              >
                {c.id !== selectedUser.id && (
                  <p onClick={() => console.log("onDisplayUser(c.id)")}>
                    {c.name}
                  </p>
                )}
                {c.id === selectedUser.id && (
                  <UserForm
                    userForm={selectedUser}
                    setUserForm={setSelectedUser}
                    onClick={() =>
                      onPutUser({
                        event: event,
                        id: selectedUser.id,
                        userEditForm: selectedUser,
                      })
                    }
                  />
                )}
                <div style={{ display: "flex" }}>
                  <button
                    onClick={() => {
                      setSelectedUser(c);
                    }}
                  >
                    {c.id === selectedUser.id ? "Cancel" : "Edit"}
                  </button>
                  <button onClick={() => onDeleteUser(c.id)}>Delete</button>
                </div>
              </div>
            ))
          }
        </section>
      </div>
    </div>
  );
}

export default App;

// const GET = async <T,>(url: string): Promise<T> => {
//   const res = await fetch(url);
//   const data = await res.json();
//   return data;
// };

// POST
// const POST = async <R, P>(url: string, body: P): Promise<R> => {
//   const res = await fetch(url, {
//     method: "POST",
//     body: JSON.stringify(body),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
//   const data = res.json();
//   return data;
// };

// PUT
// const PUT = async <R, P>(url: string, body: P): Promise<R> => {
//   const res = await fetch(url, {
//     method: "PUT",
//     body: JSON.stringify(body),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
//   const data = res.json();
//   return data;
// };

// DELETE
// const DELETE = async <R,>(url: string): Promise<R> => {
//   const res = await fetch(url, {
//     method: "DELETE",
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
//   const data = res.json();
//   return data;
// };

// {isLoadingUsers && <p>Is loading...</p>}
//           {!isLoadingUsers && usersError && (
//             <p>Can not get users, try again later</p>
//           )}
//           {!isLoadingUsers && !usersError && !users && (
//             <p>There is not users</p>
//           )}
//           {isLoadingPostUser && <p>Is loading User ...</p>}
//           {!isLoadingPostUser && postError && (
//             <p>Can not post user, try again later</p>
//           )}
