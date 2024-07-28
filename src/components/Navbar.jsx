import Link from 'next/link'
import Image from 'next/image'
// import Logo from './seo-snap.png'

export default function Navbar() {
  return (

    <nav>
      {/* <Image
        src={Logo}
        alt='Seo snap logo'
        width={70}
        placeholder='blur'
        quality={100}
      /> */}

        <h1>SEO Snap</h1>
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        
    </nav>
  )
}