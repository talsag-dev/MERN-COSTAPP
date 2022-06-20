import { Fragment } from "react";
import CustomLink from "./CustomLink";
const Navbar = () => {
    return (
        <Fragment>
            <div className='sidebar'>
                <CustomLink to = '/' name='Home'/>
                <CustomLink to = '/createUser' name='Create User'/>
                <CustomLink to = '/createCost' name='Create Cost'/>
                <CustomLink to = '/report' name='Get Report'/>
            </div>
        </Fragment>
    )
};



export default Navbar;
