import Soon from '../../asset/soon.svg'
import Pinned from '../../asset/pinned.svg'
import Image from 'next/image'

function Aside() {
  return (
    <>
      {/* right-sidebar styling Start*/}
      <aside className="w-1/4 px-8 py-12 font-Outfit flex flex-col justify-center space-y-4 ">
        <div className="pinned">
          <Image src={Pinned} alt="the pinned Post image" />
        </div>

        <div className="coming-soon text-center">
          <Image
            src={Soon}
            alt="the coming soon icon"
            className=""
            width={130}
            height={50}
          />
        </div>

        <div className="paragraph text-center">
          <h1 className="font-bold text-2xl">Pinned Posts</h1>
          <p>
            Want to get quick access to important posts? You can pin important
            posts to your screen for easy access
          </p>
        </div>
      </aside>

      {/* right-sidebar styling End*/}
    </>
  )
}

export default Aside
