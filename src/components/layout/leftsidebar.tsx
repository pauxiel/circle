import Feed from '../../../asset/feed.svg'
import Community from '../../../asset/communities.svg'
import Message from '../../../asset/message.svg'
import Notification from '../../../asset/notifications.svg'
import Whatnew from '../../../asset/whatnew.svg'
import Logout from '../../../asset/logout.svg'
import Soon from '../../../asset/soon.svg'
import Profile from '../../../asset/jay.png'
import Image from 'next/image'

function LeftSidebar() {

    return(
        <>
        
      {/* left-sidebar styling */}
    <nav className="order-first bg-gray-100 w-1/4 px-8 py-12 font-Outfit text-dark font-medium flex flex-col">
      <h1 className="text-gray-500 px-2 mb-4">OVERVIEW</h1>
      <div className="nav-items space-y-3">

      <div className="nav-item flex items-center space-x-3 hover:bg-gray-200 px-2 py-3 rounded-md">
      <Image 
          src={Feed}
          alt='the feed icon'
          className="w-full"
          
          />
          <span>My Feed</span>

      </div>

      <div className="nav-item flex items-center space-x-3 hover:bg-gray-200 px-2 py-3 rounded-md">
      <Image 
          src={Community}
          alt='the community icon'
          className="w-full"
          
          />
          <span>Communities</span>

      </div>

      <div className="nav-item flex items-center space-x-3  hover:bg-gray-200 px-2 py-3 rounded-md">
        <div className="flex items-center space-x-3">
        <Image 
          src={Message}
          alt='the message icon'
          className=""
         
          
          />

          <span>Messages</span>
        </div>
     
         <div className="coming-soon">
         <Image 
          src={Soon}
          alt='the coming soon icon'
          className=""
          
          />
         </div>
         
          
      </div>

      <div className="nav-item flex items-center space-x-3 hover:bg-gray-200 px-2 py-3 rounded-md">
      <Image 
          src={Notification}
          alt='the notification icon'
          className="w-full"
          
          />
          <span>Notifications</span>

      </div>

      <div className="nav-item flex items-center space-x-3 hover:bg-gray-200 px-2 py-3 rounded-md">
      <Image 
          src={Whatnew}
          alt='the whatnew icon'
          className="w-full"
          
          />
          <span>What's New</span>

      </div>

      </div>


      <div className="border-b border-gray-300 mt-6"></div>


      <div className="setting mt-auto">
        <div className="profile flex items-center space-x-3 hover:bg-gray-200 px-2 py-3 rounded-md">
        <Image 
          src={Profile}
          alt='the profile image preview'
          className="rounded-full"
          width={30} height={30}
          />

        <span>Profile</span>
        </div>

        <button onClick={() => signOut()} className=" w-full log-out flex items-center space-x-3 hover:bg-gray-200 px-2 py-3 rounded-md">
        <Image 
          src={Logout}
          alt='the whatnew icon'
          className="w-full"
          />

          <span>Log out</span>

        </button> 

      </div>

    </nav>

       {/* left-sidebar styling End*/}
        
        </>
    )
}

export default LeftSidebar
