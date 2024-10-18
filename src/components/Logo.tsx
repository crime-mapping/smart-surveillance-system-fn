import logo from '../assets/logo.svg'
const Logo = () => {
    return (
        <div className="flex items-center flex-col">
          <img src={logo} alt="CM&3S Logo" className="h-16 w-16 mr-2" />
          <span className="font-bold text-l">CM&3S</span>
        </div>
    )
}

export default Logo;