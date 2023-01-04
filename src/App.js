import { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Preview } from './components/Preview';

import './App.css';

function App() {
    const [files, setFiles] = useState([]);
    const onSuccess = (savedFiles) => {
        setFiles(savedFiles)
    };
    const onFilesChange = (newFiles) =>{
        setFiles(newFiles)
    }

  return (
    <div className="App">
        <label className="blockTitle">Admin panel</label>
      <FileUploader onSuccess={onSuccess}/>
<label className="blockTitle"> My Files</label>
            <Preview files={files} onFilesChange={onFilesChange}/>
      <ToastContainer/>
    </div>
  );
}

export default App;
