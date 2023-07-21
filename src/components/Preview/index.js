import axios from "axios";
import {useEffect, useState} from "react";
import './style.css';
export const Preview =  ({files,onFilesChange}) => {


    const deleteItem = (itemName) =>{
        axios.get('https://ahg3dserver.web-you.pl/delete?filename='+itemName);
        async function fetchData() {
            try {
                const res = await axios.get('https://ahg3dserver.web-you.pl/files');
                onFilesChange(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }
    console.log(files)
    useEffect( () => {
        async function fetchData() {
            try {
                const res = await axios.get('https://ahg3dserver.web-you.pl/files');
                onFilesChange(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    if (!files.length) {
        return null
    }
    console.log(files.map((file) => console.log(file)))
    return files.map((file) =><div className="previewItem"><img key={file}  src={`https://ahg3dserver.web-you.pl/previews/${file}`}/> <label>{file.split('-')[0]}</label><button onClick={() => deleteItem(file)}></button></div> );
};