import Image from 'next/image'
import { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='auth-container'>
      <section className='auth-form'>
        <div className='auth-box'>
          <div className='flex flex-row gap-4'>
            <Image src={"/icons/logo.svg"} alt='Logo' width={37} height={37} />
            <h1 className='text-2xl font-semibold text-white'>BookWise</h1>
          </div>

          <div>{children}</div>
        </div>
      </section>

      <section className='auth-illustration'>
        <Image
          src={"/images/auth-illustration.png"}
          alt='Ilustration'
          height={1000}
          width={900}
          className='size-full object-cover'
        />
      </section>
    </main>
  )
}

export default AuthLayout