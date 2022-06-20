import { Fragment } from 'react';
import mernLogo from './mern.jpeg'
import Header from "../components/Header";
const Home = () => {
    const pre =
        'This website is the final project for Async Server-side Development course at HIT.' +
        '\n We are using MERN stack — Mongodb, Express.js, React, and Node.js';
    return (
      <Fragment>
        {" "}
        <div className='container'>
          <Header title={"Node JS Cost App"} />
          <div className='row'>
            <div className='col-md-6'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>Welcome to Expense Manager</h5>
                  <p className='card-text'> {pre} </p>
                  <img src={mernLogo} alt='mern' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
    
}
export default Home;