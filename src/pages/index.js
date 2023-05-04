// ** React Imports
import { useEffect } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** Spinner Import
import Spinner from 'src/@core/components/spinner';

// ** Hook Imports
import { useAuth } from 'src/hooks/userAuth';

export const getHomeRoute = role => {
  if (role === 'client') return '/dashboard/client'
  else return '/dashboard/admin'
}

const Home = () => {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (auth.user && auth.user.role) {
      const homeRoute = getHomeRoute(auth.user.role)
      router.replace(homeRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner sx={{ height: '100%' }} />
}

export default Home
