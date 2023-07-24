import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Main from './routes/Main'

import PostList from './routes/PostList'

import Signup from './routes/Signup'

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/chatroom" element={<Chatroom />}>
        </Route> */}
   
        <Route path="/post" element={<PostList />} />
        <Route path="/" element={<Main />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </Router>
  )
}

export default App