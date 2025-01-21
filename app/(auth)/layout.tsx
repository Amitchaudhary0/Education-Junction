type Props = {
  children: React.ReactNode
}
const AuthLayout = ({ children }: Props) => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      {children}
    </div>
  )
}
export default AuthLayout