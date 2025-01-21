import Image from "next/image"

const Logo = () => {
  return (
    <Image
    width={130}
    height={130}
    alt="Logo"
    src={"/logo.svg"}
    />
  )
}

export default Logo
