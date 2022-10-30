import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [users, setUsers] = useState([])


  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleform = event => {
    event.preventDefault()
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user)

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),

    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newUser = [...users, data]
        setUsers(newUser)
      })
      .catch(err => console.error(err));
    form.reset()
  }


  return (
    <div className="App">
      <h4>user:{users.length}</h4>
      <form onSubmit={handleform}>
        <input type="text" name='name' placeholder='name' /><br />
        <input type="text" name='email' placeholder='email' /> <br />
        <button> add </button>
      </form>

      <div>
        {
          users.map(ouser => <p key={ouser._id}> {ouser.name} {ouser.email}</p>)
        }
      </div>
    </div>
  );
}

export default App;
