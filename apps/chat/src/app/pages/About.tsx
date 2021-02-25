import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <main className="join-main">
      {/* <form action="chat.html"> */}
      <div className="form-control">
        <Link to="/" className="">
          Back
        </Link>
        <h1>About</h1>
        {/* <p></p> */}
        <br />  
        <p>Version: 1.0.0</p>
      </div>
      {/* </form> */}
    </main>
  );
};

export default About;
