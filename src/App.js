import Main from './Main';
import { Provider } from 'react-redux';
import store from './redux/store';


function App() {
  return (
    <div >
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;
