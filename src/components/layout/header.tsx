import Logo from '../../../asset/logo.svg'
import Search from '../../../asset/search.svg'
import Image from 'next/image'


function Header() {

    return(
        <>
           {/* Header styling Start*/}
         <header className="border border-gray-200 py-4 px-6 flex items-center justify-between">
         <div className="logo w-full">
          <Image 
          src={Logo}
          alt='the circle app Logo'
          className="w-full"
          
          />
        </div>

        <div className="search w-1/3 p-2 flex items-center space-x-2 rounded-full  border border-gray-200 ">
        <Image 
          src={Search}
          alt='the circle app Logo'
          className="w-full"
          
          />
          <input type="text" name="" id=""  className="w-full focus:ring-0 pr-3 font-Outfit outline-none" placeholder="Search communities, interest & username"/>
        </div>
      </header>

           {/* Header styling End*/}
        </>
    )
}

export default Header
