
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('doc', file);

    try {
      await axios.post('http://localhost:8000/tp_employee/upload/', formData);
      alert('File uploaded successfully!');
      // Refresh the list of uploaded files after successful upload
      fetchUploadedFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/tp_employee/upload/');
      setUploadedFiles(response.data);
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
    }
  };

  // Fetch uploaded files on component mount
  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  return (
    <div>
      <h2>Upload Files</h2>
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={handleFileUpload}>Upload</button>

      <h3>Uploaded Files:</h3>
      <ul>
        {uploadedFiles.map((file) => (
          <li key={file.id}>
            {file.doc.split('/').pop()} {/* Display only the filename without the path */}
            <a href={`http://localhost:8000/${file.doc}`} download>Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Upload;
