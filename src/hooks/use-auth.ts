import { AuthContext, Session } from "@/components/provider/auth-provider";
import { useContext, useEffect, useState } from "react";


export function useAuth() {

  const [session,setSession] = useState<Session|null>(null)
  const logged = useContext(AuthContext);

  useEffect(()=>{
    setSession(logged)
  },[])

  return session
}