import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const auth = true
  return auth ? <Outlet /> : <Navigate to="login" />
}

export default PrivateRoute

//компонент Outlet, если он возвращает, то он вернет тот компонент, который будет передан в него.
//компонент Navigate - редирект
