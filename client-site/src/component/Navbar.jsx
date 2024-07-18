import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <div className="font-roboto">
            <div className="space-x-3">
                <Link to='manage-user' className="btn btn-primary">Manage USers</Link>
                <Link to='all-transaction' className="btn btn-primary">All Transaction history</Link>
            </div>
        </div>
    );
};

export default Navbar;