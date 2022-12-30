import {useState} from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';

import './style.css';

export const FileUploader = ({onSuccess}) => {
    const [name, setName] = useState([]);
    const [file, setFiles] = useState([]);
    const [img, setImg] = useState([]);
    const onNameInputChange = (e) => {

        setName(e.target.value);
    };

    const onFileInputChange = (e) => {
        const file = e.target.files[0]
        if (file === null){
            return
        }
        if (file.name.split('.')[1] !== "glb"){
            toast.error('File should be .glb!');
            e.target.value = null;
            return
        }
        setFiles(file);
    };

    const onImgInputChange = (e) => {
        const file = e.target.files[0];
        if (file === null){
            return
        }
        console.log(file.type)
        if ((file.type.split('/')[1] !== "jpg") && (file.type.split('/')[1] !== "png") && (file.type.split('/')[1] !== "jpeg") && (file.type.split('/')[1] !== "webp")){
            toast.error('Pls upload image.');
            e.target.value = null;
            return
        }
        setImg(e.target.files[0])
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("fileName", name+"-"+Date.now());

        data.append("fileImg", img);
        data.append("file", file);

        console.log(data.get('userfile'));
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post('http://5.187.2.214:8000/upload', data,config)
            .then((response) => {
                toast.success('Upload Success');
                async function fetchData() {
                    try {
                        const res = await axios.get('http://5.187.2.214:8000/files');
                        onSuccess(res.data);
                    } catch (err) {
                        console.log(err);
                    }
                }
                fetchData();
            })
            .catch((e) => {
                toast.error('Upload Error')
            })

    };

    return (
        <form method="post" action="#" id="#" onSubmit={onSubmit}>
            <div className="form-group files">
                <label>Enter file name</label>
                <input type="text"
                       onChange={onNameInputChange}
                       multiple/>
                <label>Upload your file</label>
                <input type="file"
                       onChange={onFileInputChange}
                       className="form-control"
                       accept={".glb"}/>
                <label>Upload img preview</label>
                <input type="file"
                       onChange={onImgInputChange}
                       className="form-control"
                       accept={"image/*"}/>
                <button>Submit</button>
            </div>
        </form>
    )
};