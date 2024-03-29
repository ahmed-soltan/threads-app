"use client"
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { useAuth } from '@clerk/nextjs'



const Bottombar = () => {
  const {userId} = useAuth()

  const pathname = usePathname()
  return (
    <section className='bottombar'>
      <div className='bottombar_container'>
        {sidebarLinks.map((link)=>{
          const isActive = (pathname.includes(link.route) && link.route.length > 1 || pathname === link.route)
          if(link.route=="/profile"){
            link.route=`${link.route}/${userId}`
          }
          return (
            <Link href={link.route} className={`bottombar_link ${isActive && 'bg-primary-500'}`} key={link.label}>
              <Image src={link.imgURL} alt={link.label} width={24} height={24}/>
              <p className='text-light-1 max-sm:hidden'>{link.label.split(/\s+/)[0]}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Bottombar