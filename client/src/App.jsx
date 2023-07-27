import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Main from './routes/Main'

import Post from './routes/Post'
import Post1 from './routes/Post1'
import Post2 from './routes/Post2'
import Signup from './routes/Signup'
import Theme from './routes/Theme'
import Modals from './routes/Modals'
import Signup2 from './routes/Signup2'

import { AnimatePresence } from 'framer-motion';
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/chatroom" element={<Chatroom />}>
        </Route> */}
   
        <Route path="/post" element={<Post />} />
        <Route path="/post1" element={<Post1 />} />
        <Route path="/" element={<Main />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/post2" element={<Post2 />}></Route>
        <Route path="/theme" element={<Theme />}></Route>
        <Route path="/modals" element={<Modals />}></Route>
        <Route path="/signup2" element={<Signup2 />}></Route>
       
      </Routes>
    </Router>
  )
}

export default App