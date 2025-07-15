import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'

const Logo = () => {
  return (
    <Link to={'/'} className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
        <img src={logo} alt="CM&3S Logo" className="h-5 w-5" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-base text-foreground">CM&3S</span>
        <span className="text-xs text-muted-foreground">Smart Surveillance</span>
      </div>
    </Link>
  )
}

export default Logo;