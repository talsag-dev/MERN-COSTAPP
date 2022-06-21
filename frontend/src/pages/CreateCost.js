import { useState,useEffect } from "react";
import api from "../utils/api";
import { Fragment } from "react";
import Header from "../components/Header";
import Select from "react-select";

const CreateCost = () => {

    const [cost, setCost] = useState({});
    const [users,setUsers] = useState([]);
    const [addedNote,setaddedNote] = useState([]);
     useEffect(
      () => {

        const fetchData = async () => { await api.get("users/").then((res) => {
          setUsers(res.data);
        }); }

        fetchData().catch((err) => {
            console.log(err);
          });
        },[])

    const onChangeHandle = (e) => {
        setCost({ ...cost, [e.target.name]: e.target.value });
      }


    const onSubmitClick = async (e) => {
        e.preventDefault();
        try{
            const result =await api.post("/costs/newCost", cost);
            setaddedNote([result,...addedNote]);
        }catch (err){
            console.log(err);
          }   
    }


    return (
      <Fragment>
        <div className='container'>
          <Header title='Create Cost' />
          <form
            className='add-form'
            onChange={onChangeHandle}
            id='create-cost-form'
            onSubmit={onSubmitClick}
          >
            <label htmlFor='user'>User ID:</label>
            <Select
              name='user'
              options={users.map((user) => ({
                label: user.firstName + " " + user.lastName,
                value: user._id,
              }))}
              onChange={(change) => setCost({ ...cost, user: change.value })}
              className='form-control'
            />
            <label htmlFor='category'>Category:</label>
            <Select
              name='category'
              options={[
                { label: "Food", value: "Food" },
                { label: "Clothing", value: "Clothing" },
                { label: "Entertainment", value: "Entertainment" },
                { label: "Transportation", value: "Transportation" },
                { label: "Other...", value: "Other..." },
              ]}
              onChange={(change) =>
                setCost({ ...cost, category: change.value })
              }
              className='form-control'
            />
            <label htmlFor='description'>Description:</label>
            <textarea
              name='description'
              type='text'
              className='form-control description'
              form='create-cost-form'
            />
            <label htmlFor='amount'>Amount:</label>
            <input type='number' name='amount' className='form-control' />
            <label htmlFor='date'>Date:</label>

            <input name='date' type='date' className='form-control' />
            <input type='submit' value='Save Cost' className='btn btn-block' />
          </form>
          {addedNote.length > 0
            ? addedNote.map(
                (res, index) =>
                  res.status === 200 && (
                    <p key={index} style={{ color: "red" }}>
                      Cost Added
                    </p>
                  )
              )
            : null}
        </div>
      </Fragment>

      // <Container title='Create Cost' formProps={formProps}/>
    );
}
export default CreateCost;
