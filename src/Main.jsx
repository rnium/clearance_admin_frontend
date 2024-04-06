import {useEffect} from 'react';
import Homepage from './pages_admin/Homepage';
import MainAuth from './pages_auth/MainAuth';
import Loading from './components/organisms/Loading'
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import {setLoaded} from './redux/accountReducer'

const Main = () => {
  const isLoaded = useSelector((state) => state.is_loaded);
  const userInfo = useSelector((state) => state.userinfo);
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {dispatch(setLoaded(true))}, 1000)
  }, [])
  if (isLoaded === false) {
    return <Loading />;
  } else if (isLoaded && !userInfo.is_authenticated) {
    return (
      <div>
        <MainAuth />
      </div>
    )
  } else {
    return (
      <div>
        <Homepage />
      </div>
    )
  }
}

export default Main