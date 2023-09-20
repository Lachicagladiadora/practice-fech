import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { domains, names } from './constans'

type User = {
  id: string,
  name: string,
  age: string,
  email: string
}

type NewUser = {
  name: string,
  age: string,
  email: string
}

type GetUsersOutput = User[]

type CreateUserInput = { user: NewUser }

type UpdateUserInput = { user: NewUser}

const url = 'http://localhost:3000'

const generateNewUser = ():NewUser => {
  const userName = names[Math.floor(Math.random() * 100)]
  const age = Math.floor((Math.random() * 80) + 18)
  const nickName = names.map((name): string => {
    const username = name.toLowerCase().replace(/\bth|\b[a-zA-Z]*[aeiouy]\b/g, `${name}${Math.floor(Math.random() * 1000)}`);
    return username;
  })[Math.floor(Math.random() * 100)];
  const domain = domains[Math.floor(Math.random() * 4)]
  const newUser: NewUser = { name: `${userName}`, age: `${age}`, email: `${nickName}@${domain}.com` }
  return newUser
}

function App() {
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState<User[]>([])
  const [userForm, setUserForm] = useState<NewUser>({name: '', age: '', email: ''})

  const onGetUsers = async () => {
    try {
      const data = await GET<GetUsersOutput>(`${url}/users`)
      setUsers(data)
    } catch (error) {
      console.error(error)
    }
  }

  const onCreateUser = async () => {
    try {
      // const name = (document.getElementById('userName') as HTMLInputElement)?.value ?? ''
      const newUser = generateNewUser()
      const data = await POST<User, CreateUserInput>(`${url}/users`, { user: userForm })
      setUsers((users) => [...users, data])
    } catch (error) {
      console.error(error)
    }
  }

  const onUpdateUser = async (id:string, user:User) => {
    try {
      const updatedUser: Partial<User> = {...user, name: `${user.name} edit-${Math.round(Math.random()*10_000)}` }
      delete updatedUser.id
      const data = await PUT<User, UpdateUserInput>(`${url}/users/${id}`, { user: updatedUser} as UpdateUserInput)
      setUsers((users) => users.map((c)=>c.id===id?data: c))
    } catch (error) {
      console.error(error)
    }
  }

  const onDeleteUser = async (id: string) => {
    try {
      await DELETE<string>(`${url}/users/${id}`,)
      setUsers((users) => users.filter((c)=>c.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const onDisplayUser = async (id: string) => {
    try {
      const data = await GET<User>(`${url}/users/${id}`)
      if(!data) return window.alert('oops, this user does not exist')

      const userInfo =  `Name: ${data.name}\nAge: ${data.age}\nEmail: ${data.email}`
      window.alert(userInfo)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={onGetUsers}>
          fetch get
        </button>
        <button onClick={onCreateUser}>
          fetch post
        </button>
        <div>
          {users.map((c) => 
            <div key={c.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0px'}}>
              <p onClick={() => onDisplayUser(c.id)}>{c.name}</p>
              <div style={{display: 'flex'}}>
                <button onClick={()=>onUpdateUser(c.id, c)}>Edit</button>
                <button onClick={()=>onDeleteUser(c.id)}>Delete</button>
              </div>
            </div>)}
        </div>
          <form onSubmit={onCreateUser} >
        <div style={{
          display: 'flex',
        }}>
          <label htmlFor="userName">Name </label>
          <input id="userName" type="text" placeholder='write name' value={userForm.name} onChange={(e)=>setUserForm((pre)=>({...pre, name: e.target.value}))}/>
        </div>
        <div style={{
          display: 'flex',
        }}>
          <label htmlFor="age">Age </label> 
          <input id="age" type="text" placeholder='write age' value={userForm.age} onChange={(e)=>setUserForm((pre)=>({...pre, age: e.target.value}))}/>
        </div>
        <div style={{
          display: 'flex',
        }}>
            <label htmlFor="email">Email </label>
            <input id="email" type="text" placeholder='write email' value={userForm.email} onChange={(e)=>setUserForm((pre)=> ({...pre, email: e.target.value}))}/>
        </div>
          </form>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App


const GET = async<T,>(url: string): Promise<T> => {
  const res = await fetch(url)
  const data = await res.json()
  return data
}

// POST
const POST = async<R, P>(url: string, body: P): Promise<R> => {
  const res = await fetch(url, {
    method: 'POST', body: JSON.stringify(body), headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  const data = res.json()
  return data
}

// PUT
const PUT = async<R,P>(url: string, body: P): Promise<R> => {
  const res = await fetch(url, { method: 'PUT', body: JSON.stringify(body) , headers: {
    "Content-type": "application/json; charset=UTF-8"
  }})
  const data = res.json()
  return data
}

// DELETE
const DELETE = async<R,>(url: string): Promise<R> => {
  const res = await fetch(url, { method: 'DELETE' , headers: {
    "Content-type": "application/json; charset=UTF-8"
  }})
  const data = res.json()
  return data
}

