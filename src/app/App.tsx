import { ImageEffectsPage } from '@/pages';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/image" element={<ImageEffectsPage />} />
    </Routes>
  );
}

export default App;
