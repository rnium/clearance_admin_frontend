import { useEffect } from 'react';
import Homepage from './pages_admin/Homepage';
import StudentHome from './pages_student/StudentHome';
import MainAuth from './pages_auth/MainAuth';
import Loading from './components/organisms/Loading'
import axios from 'axios';
import * as urls from './utils/api_urls';
import { message } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import { setLoaded, setUserInfo } from './redux/accountReducer'

const Main = () => {
  const isLoaded = useSelector((state) => state.account.is_loaded);
  const userInfo = useSelector((state) => state.account.userinfo);
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
  } else if (isLoaded && userInfo.account_type === 'student') {
    return (
      <div>
        <StudentHome />
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