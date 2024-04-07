import { useEffect } from 'react';
import Homepage from './pages_admin/Homepage';
import MainAuth from './pages_auth/MainAuth';
import Loading from './components/organisms/Loading'
import axios from 'axios';
import * as urls from './utils/api_urls';
import { message } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import { setLoaded, setUserInfo } from './redux/accountReducer'

const Main = () => {
  const isLoaded = useSelector((state) => state.is_loaded);
  const userInfo = useSelector((state) => state.userinfo);
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(urls.userInfoUrl);
        dispatch(setUserInfo(res.data))
        dispatch(setLoaded(true))
      } catch (error) {
        let error_msg = error?.response?.data?.details;
        if (error_msg === undefined) {
          error_msg = error.message;
        }
        message.error(error_msg, 5)
      }
    }
    if (!isLoaded) {
      fetchData();
    }
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