import { useState,useEffect,Fragment,useMemo } from "react";
import api from "../utils/api";
import Select from "react-select";
import Header from "../components/Header";
const Report = () =>{

    const [report, setReport] = useState([]);
    const [users, setUsers] = useState([]);
    const [Params,setParams] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [usersToOptions,setusersToOptions] = useState([]);
    useEffect(
      () => async () => {
        await api
          .get("users/")
          .then((res) => {
            setUsers(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
          
          setusersToOptions(users.map(user => ({value: user._id, label: user.firstName+' '+user.lastName+',Total Cost: '+user.totalCost})));
      },
      [users]
    );

       const onChangeHandle = (e) => {
         setParams({ ...Params, [e.target.name]: e.target.value });
       };

       const onSubmitClick = async (e) => {
         e.preventDefault();
         try {
           const result = await api.get(
             "/costs/getCostsbyMonthandYear/",{params:Params}
           );

           setReport(result.data);
         } catch (err) {

           console.log(err);
         }
       };
       var filteredList = useMemo(getFilteredList, [selectedCategory, report]);

       function getFilteredList() {
         if (!selectedCategory) {
           return report;
         }
         return report.filter((item) => item.category === selectedCategory);
       }

       const PretiifyDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString();
        }

    return (
      <Fragment>
        <div className='container'>
          <Header title='Cost Report' />
          <form
            className='add-form'
            onChange={onChangeHandle}
            id='create-user-form'
            onSubmit={onSubmitClick}
          >
            <label htmlFor='firstName'>User:</label>
            <Select
              name='user'
              options={usersToOptions}
              onChange={(change) =>
                setParams({ ...Params, userId: change.value })
              }
              className='form-control'
            />
            <label htmlFor='lastName'>Date:</label>
            <input type='month' name='date' className='form-control' />
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>

          {report.length > 0 && (
            <div className='table-container'>
              <Select
                name='category'
                options={[
                  { label: "All", value: "" },
                  { label: "Food", value: "Food" },
                  { label: "Clothing", value: "Clothing" },
                  { label: "Entertainment", value: "Entertainment" },
                  { label: "Transportation", value: "Transportation" },
                  { label: "Other...", value: "Other..." },
                ]}
                onChange={(change) => setSelectedCategory(change.value)}
                className='form-control'
              />
              <table className='table'>
                <thead>
                  <tr>
                    <th>UserID</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Amount Spended</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((report, index) => (
                    <tr key={index}>
                      <td>{report.user}</td>
                      <td>{PretiifyDate(report.date)}</td>
                      <td>{report.category}</td>
                      <td>{report.amount}</td>
                      <td>{report.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Fragment>
    );};

export default Report;
