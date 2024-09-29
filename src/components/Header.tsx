import { Link } from 'react-router-dom';

const Header = () => {
    return (
      <header className="bg-gradient-to-r from-blue-800 to-cyan-200 text-white p-4">
        <div className="container ml-5 mr-auto flex justify-between">
          <h1 className="text-2xl font-bold">
            <Link to="/">All Countries Data</Link>
          </h1>
        </div>
      </header>
    );
  };
  
  export default Header;