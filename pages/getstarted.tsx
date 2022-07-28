import OnboardingIcon from '../asset/onboarding.svg'
import Image from 'next/image'

function GetStarted() {
  return (
    <>
      {/* GetStarted styling Start*/}
      <div className="flex flex-col space-y-8 ">
        <Image
          src={OnboardingIcon}
          alt="onboarding icon preview"
          className=""
        />

        <div className="text-heading text-center space-y-3">
          <h1 className="text-3xl font-bold">hello</h1>
          <p className="text-xl">
            To complete your profile, your basic information will be needed
          </p>
        </div>
      </div>

      {/* GetStarted styling End*/}
    </>
  )
}

export default GetStarted
