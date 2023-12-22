import { NewUser, User } from "../App";
import { colors } from "../constants";

type UserFormProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  onSubmit: React.FormEventHandler<HTMLButtonElement>;
};

const validateEmail = new RegExp(
  "[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}"
);

export const UserForm = ({ user, setUser, onSubmit }: UserFormProps) => {
  return (
    <form
      style={{
        padding: "8px",
        width: "auto",
        border: "solid 1px grey",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h3 style={{ margin: "5px" }}>New User</h3>
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "5px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label
            htmlFor="userName"
            style={{
              color: `${user.name.length >= 10 ? "black" : colors.red} || ${
                user.name === "" ? colors.red : "black"
              }`,
            }}
          >
            Name{" "}
          </label>
          <input
            id="userName"
            type="text"
            placeholder="write name"
            value={user.name}
            style={{
              padding: "4px",
              outline: "none",
              border: "solid 2px",
              borderColor: `${
                user.name.length >= 10 || user.name !== " "
                  ? "black"
                  : colors.red
              } `,
              color: `${
                user.name.length >= 10 || user.name !== " "
                  ? "black"
                  : colors.red
              } `,
            }}
            onChange={(e) => {
              setUser((pre) => (pre ? { ...pre, name: e.target.value } : null));
            }}
          />
        </div>
        <div
          style={{
            padding: "5px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label htmlFor="age">Age </label>
          <input
            id="age"
            type="number"
            placeholder="write age"
            value={user.age}
            style={{
              padding: "4px",
              outline: "none",
              outlineColor: "orange",
              borderColor: `${
                user.age.length === 1 || user.age.length === 2
                  ? "black"
                  : colors.red
              } `,
              color: `${
                user.age.length === 1 || user.age.length === 2
                  ? "black"
                  : colors.red
              } `,
            }}
            onChange={(e) =>
              setUser((pre) => (pre ? { ...pre, age: e.target.value } : null))
            }
          />
        </div>
        <div
          style={{
            padding: "5px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label htmlFor="email">Email </label>
          <input
            id="email"
            type="text"
            placeholder="write email"
            value={user.email}
            style={{
              padding: "4px",
              outline: colors.red,
              borderColor: `${
                user.email.length >= 10 ||
                user.email !== " " ||
                user.email === String(validateEmail)
                  ? "black"
                  : colors.red
              } `,
              color: `${
                user.email.length >= 10 || user.email !== " "
                  ? "black"
                  : colors.red
              } `,
            }}
            onChange={(e) =>
              setUser((pre) => (pre ? { ...pre, email: e.target.value } : null))
            }
          />
        </div>
      </div>
      {user.name === " " && (
        <p style={{ color: colors.red }}>name is not correct</p>
      )}
      <button
        onClick={(e) => {
          console.log(e, "df");
          onSubmit(e);
        }}
        style={{ width: "200px" }}
      >
        Save
      </button>
    </form>
  );
};
