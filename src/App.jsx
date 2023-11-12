import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './client'

function App() {
  const [fetchError, setFetchError] = useState(null)
  const [members, setMembers] = useState([])
  const [member, setMember] = useState({first_name:"", last_name:"", age: 0, married: false, sex: "male", career:"", member_id:0})
  const {first_name, last_name, age, married, sex, career, member_id} = member
  useEffect(()=>{
    fetchMembers()
    generateID()
  }, [])
  async function fetchMembers(){
    const {data, error} = await supabase
      .from('members')
      .select()
    if(error) {
      setFetchError("Could not fetch members")
      setMembers(null)
      console.log(error)
    }
    if(data)
    {
      setMembers(data)
      setFetchError(null)
    }
  }
  function generateID()
  {
    let id = Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111;
    while(members.some(member => member.member_id === id))
    {
      id = id = Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111;
    }
    setMember({...member, member_id: id})
  }
  async function createMember(){
    generateID()
    console.log(member_id)
    const {data, error} = await supabase
      .from('members')
      .insert([
        {first_name, last_name, age, married, sex, career, member_id}
      ])
      .single()
    setMember({first_name:"", last_name:"", age: 0, married: false, sex: "Male", career:"", member_id: 0})
    fetchMembers()
  }
  return(
    <div>
      <input 
        placeholder='First Name'
        value={first_name}
        onChange={e=>setMember({...member, first_name: e.target.value})}
      />
      <input 
        placeholder='Last Name'
        value={last_name}
        onChange={e=>setMember({...member, last_name: e.target.value})}
      />
      <input 
        placeholder='Age'
        type='number'
        value={age}
        onChange={e=>setMember({...member, age: e.target.value})}
      />
      <label>
        Married
        <select
        value={married}
        onChange={e=>setMember({...member, married: e.target.value ==="true" ? true : false})}
        >
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </label>
      <label>
        Sex
        <select
        value={sex}
        onChange={e=>setMember({...member, sex: e.target.value})}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <input 
      placeholder='career'
      value={career}
      onChange={e=>setMember({...member, career: e.target.value})}
      />
      <button onClick={createMember}>Create Member</button>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Married</th>
            <th>Sex</th>
            <th>Career</th>
            <th>Member ID</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member =>(
            <tr key={member.id}>
              <td>{member.first_name}</td>
              <td>{member.last_name}</td>
              <td>{member.age}</td>
              <td>{member.married ? "Married" : "Single"}</td>
              <td>{member.sex}</td>
              <td>{member.career}</td>
              <td>{member.member_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <button onClick={generateID}>Press</button>
      <p>{member_id}</p> */}
    </div>
  )
}

export default App
