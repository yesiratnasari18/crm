import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      {children}
    </div>
  )
}
export default AuthLayout;