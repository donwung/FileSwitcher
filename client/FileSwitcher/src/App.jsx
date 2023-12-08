import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import SnapshotManager from './components/SnapshotManager'
import FolderViewer from './components/FolderViewer'


function App() {
    const localhost = "http://127.0.0.1:8000"




    return (
        <>
            <div style={{ display: "flex" }}>
                <SnapshotManager localhost={localhost}></SnapshotManager>
                <FolderViewer localhost={localhost}></FolderViewer>
            </div>
        </>
    )
}

export default App
