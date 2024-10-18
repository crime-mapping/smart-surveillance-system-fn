import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'
const Logo = () => {
    return (
      <Link to={'/'}>
        <div className="flex items-center flex-col">
          <img src={logo} alt="CM&3S Logo" className="h-16 w-16 mr-2" />
          <span className="font-bold text-l text-white">CM&3S</span>
        </div>
      </Link>
    )
}

export default Logo;