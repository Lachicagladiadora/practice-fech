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
};

type OnDeleteUserOutput = {};

// type CreateUserInput = { user: NewUser };

// type UpdateUserInput = { user: User };

const url = "http://localhost:3000";

const INITIAL_USER: User = { id: "", name: "", age: "", email: "" };

function App() {
  const [users, setUsers] = useState<GetUsersOutput>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  // const [createUserForm, setCreateUserForm] = useState<NewUser>(INITIAL_USER);
  // const [userEditForm, setSelectUser] = useState<NewUser>(INITIAL_USER);
  // const [showFormEdit, setShowFormEdit] = useState(false);

  const onGetUsers = async () => {
    const data = await GET<GetUsersOutput>(`${url}/users`);
    // console.log("get");
    setUsers(data);
  };

  const onPostUser = async (event: FormEvent<HTMLButtonElement>) => {
    // console.log(1);
    event.preventDefault();
    event.stopPropagation();
    // console.log(2);
    if (!selectedUser) return console.error("Ups, user dosent exist");
    const newUser: NewUser = {
      age: selectedUser.age,
      email: selectedUser.email,
      name: selectedUser.name,
    };
    const body = { user: newUser };
    // console.log({ body });
    const data = await POST<User, { user: NewUser }>(`${url}/users`, body);
    console.log(`post ${data}`);
    // setCreateUserForm(INITIAL_USER);
    setSelectedUser(null);
    onGetUsers();
  };

  const onPutUser = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!selectedUser)
      throw Error("There is no data on selected user to update");
    // event.stopPropagation()
    // console.log("put");
    const newUser: NewUser = {
      age: selectedUser.age,
      email: selectedUser.email,
      name: selectedUser.name,
    };
    const data = await PUT<User, { user: NewUser }>(
      `${url}/users/${selectedUser.id}`,
      { user: newUser }
    );
    console.log({ data });
    setSelectedUser(null);
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
  //   //   setUserForm(INITIAL_USER);
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
    const data = await DELETE<OnDeleteUserOutput>(`${url}/users/${id}`);
    console.log({ data });
    // con(data);
    onGetUsers();
  };

  useEffect(() => {
    onGetUsers();
  }, []);

  console.log({ dd: selectedUser, users });

  return (
    <main
      style={{
        border: "solid 2px",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <section
        style={{
          padding: "8px",
          display: "grid",
          gridAutoColumns: "1fr",
          gap: "8px",
          border: "solid 2px red",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>USERS</h2>
          <button onClick={() => setSelectedUser(INITIAL_USER)}>Add</button>
        </div>

        {selectedUser && !selectedUser.id && (
          <UserForm
            user={selectedUser}
            setUser={setSelectedUser}
            // nameValue={createUserForm.name}
            // ageValue={createUserForm.age}
            // emailValue={createUserForm.email}
            onSubmit={onPostUser}
          />
        )}
      </section>

      <section style={{ border: "solid 2px red" }}>
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
              {/* user */}
              {c.id !== selectedUser?.id && (
                <p onClick={() => console.log("onDisplayUser(c.id)")}>
                  {c.name}
                </p>
              )}

              {!selectedUser && (
                <>
                  <button onClick={() => setSelectedUser(c)}>Edit</button>
                  <button onClick={() => onDeleteUser(c.id)}>Delete</button>
                </>
              )}

              {/* user form */}
              {selectedUser && c.id === selectedUser.id && (
                <UserForm
                  user={selectedUser}
                  setUser={setSelectedUser}
                  onSubmit={onPutUser}
                />
              )}

              {selectedUser && c.id === selectedUser.id && (
                <button onClick={() => setSelectedUser(null)}>Cancel</button>
              )}
            </div>
          ))
        }
      </section>
    </main>
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
