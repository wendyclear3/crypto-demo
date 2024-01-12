import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hook'

const PrivateRoute = () => {
  const auth = useAuth()
  console.log(auth)
  return auth ? <Outlet /> : <Navigate to="login" />
}

export default PrivateRoute

//компонент Outlet, если он возвращает, то он вернет тот компонент, который будет передан в него.
//компонент Navigate - редирект
