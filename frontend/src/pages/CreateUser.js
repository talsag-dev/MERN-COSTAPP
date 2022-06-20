import { useState,Fragment } from "react";
import Header from "../components/Header";
import Select from "react-select";
import api from "../utils/api";
const CreateUser = () => {

    const [user, setUser] = useState({});
    const [addedNote, setaddedNote] = useState(null);
    
    const onChangeHandle = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmitClick = async (e) => {
        e.preventDefault();
        try{
            const result = await api.post("/users/newUser", user);
            setaddedNote(result);
        }catch (err){
            console.log(err);
            }
    }

return (
  <Fragment>
    <div className='container'>
      <Header title='Create User' />
      <form
        className='add-form'
        onChange={onChangeHandle}
        id='create-user-form'
        onSubmit={onSubmitClick}
      >
        <label htmlFor='firstName'>First Name:</label>
        <input type='text' name='firstName' className='form-control' />
        <label htmlFor='lastName'>Last Name:</label>
        <input type='text' name='lastName' className='form-control' />
        <label htmlFor='email'>Email:</label>
        <input type='text' name='email' className='form-control' />
        <label htmlFor='email'>Birth date:</label>
        <input type='date' name='birthday' className='form-control' />
        <label htmlFor='email'>Martial status:</label>
        <Select
          name='maritalStatus'
          options={[
            { label: "Single", value: "Signle" },
            { label: "Married", value: "Married" },
            { label: "Partnered", value: "Partnered" },
            { label: "Widowed", value: "Widowed" },
            { label: "Other...", value: "Other..." },
          ]}
          onChange={(change) =>
            setUser({ ...user, maritalStatus: change.value })
          }
          className='form-control'
        />
        <button type='submit' className='btn btn-primary'>
          Save User{" "}
        </button>
      </form>
      {addedNote === undefined ? (
        <p style={{ color: "red" }}>No user added yet,try another email</p>
      ) : 
        null}
        {addedNote?.status===200 ? (
             <p style={{ color: "green" }}>User added</p>)
            : null}

    </div>
  </Fragment>
);

}

export default CreateUser;
