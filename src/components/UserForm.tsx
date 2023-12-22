import { User } from "../App";
import { colors } from "../constants";

type UserFormProps = {
  userForm: User;
  setUserForm: React.Dispatch<React.SetStateAction<User>>;
  nameValue?: string;
  ageValue?: string;
  emailValue?: string;
  onClick: () => void;
};

const validateEmail = new RegExp(
  "[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}"
);

export const UserForm = ({
  userForm,
  setUserForm,
  // nameValue,
  // ageValue,
  // emailValue,
  onClick,
}: UserFormProps) => {
  return (
    <form
      style={{
        padding: "8px",
        margin: "10px",
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
              color: `${userForm.name.length >= 10 ? "white" : colors.red} || ${
                userForm.name === "" ? colors.red : "white"
              }`,
            }}
          >
            Name{" "}
          </label>
          <input
            id="userName"
            type="text"
            placeholder="write name"
            value={userForm.name}
            style={{
              padding: "4px",
              outline: "none",
              border: "solid 2px",
              borderColor: `${
                userForm.name.length >= 10 || userForm.name !== " "
                  ? "white"
                  : colors.red
              } `,
              color: `${
                userForm.name.length >= 10 || userForm.name !== " "
                  ? "white"
                  : colors.red
              } `,
            }}
            onChange={(e) => {
              setUserForm((pre) => ({ ...pre, name: e.target.value }));
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
            value={userForm.age}
            style={{
              padding: "4px",
              outline: "none",
              outlineColor: "orange",
              borderColor: `${
                userForm.age.length === 1 || userForm.age.length === 2
                  ? "white"
                  : colors.red
              } `,
              color: `${
                userForm.age.length === 1 || userForm.age.length === 2
                  ? "white"
                  : colors.red
              } `,
            }}
            onChange={(e) =>
              setUserForm((pre) => ({ ...pre, age: e.target.value }))
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
            value={userForm.email}
            style={{
              padding: "4px",
              outline: colors.red,
              borderColor: `${
                userForm.email.length >= 10 ||
                userForm.email !== " " ||
                userForm.email === String(validateEmail)
                  ? "white"
                  : colors.red
              } `,
              color: `${
                userForm.email.length >= 10 || userForm.email !== " "
                  ? "white"
                  : colors.red
              } `,
            }}
            onChange={(e) =>
              setUserForm((pre) => ({ ...pre, email: e.target.value }))
            }
          />
        </div>
      </div>
      {userForm.name === " " && (
        <p style={{ color: colors.red }}>name is not correct</p>
      )}
      <button onClick={onClick} style={{ width: "200px" }}>
        Save
      </button>
    </form>
  );
};
