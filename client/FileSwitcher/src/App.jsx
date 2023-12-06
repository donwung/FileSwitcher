import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'


function App() {
    const [count, setCount] = useState(0)
    const [ActiveFolders, setActiveFolders] = useState([])
    const [ActiveDirectoryArray, setActiveDirectoryArray] = useState([])
    const [ActiveDirectoryAddress, setActiveDirectoryAddress] = useState("")
    const [ManagedDirectoryAddress, setManagedDirectoryAddress] = useState("")

    const FolderStyle = { backgroundColor: "orange", color: "black", borderRadius: "0px", margin: "2px" }

    const handleOnSelectManagedDirectory = () => {
        axios.post('http://127.0.0.1:8000/get_directory', {
            "directory": ManagedDirectoryAddress
        })
            .then((res) => {
                setActiveFolders(res.data.dir_folders)
                console.log(res)
            })
            .catch((err) => { })
    }

    const handleOnStepOutManagedDirectory = () => {
        axios.post('http://127.0.0.1:8000/step_out', {
            "directory_to_step": ManagedDirectoryAddress
        })
            .then((res) => {
                console.log(res.data)
                setManagedDirectoryAddress(res.data)
            })
            .catch((err) => { })
    }

    return (
        <>
            <div style={{ display: "flex" }}>
                <div>
                    <h1>Fileswitcher App, Presets, Etc</h1>
                </div>
                <div>
                    <h1>Folder I Am Changing</h1>
                    <div>
                        <div>
                            <h2>Folders</h2>
                            <div style={{ display: "flex", flexDirection: "column", maxHeight: "300px", overflowY: "scroll" }}>
                                {ActiveFolders.map((item, i) =>
                                    <button style={FolderStyle} onClick={() => setManagedDirectoryAddress(item.path)}>{item.name}</button>
                                )}
                            </div>
                        </div>
                        <div>
                            <p>DEBUG:</p>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <input
                                    disabled
                                    placeholder={"ActiveDir= \"" + ActiveDirectoryAddress + "\""}
                                ></input>
                                <input
                                    disabled
                                    placeholder={"ManagedDir= \"" + ManagedDirectoryAddress + "\""}
                                ></input>
                            </div>
                        </div>
                        <div>
                            <label>managed directory</label>
                            <input
                                placeholder='directory'
                                onChange={(e) => setManagedDirectoryAddress(e.target.value)}
                                value={ManagedDirectoryAddress}
                                style={{ width: "40vw" }}
                            ></input>
                            <button onClick={() => handleOnSelectManagedDirectory()}>get arbitrary directory</button>
                            <button onClick={() => handleOnStepOutManagedDirectory()}>step out</button>
                        </div>
                        <p>
                            NOTE: the reason this part is here is so I can create new Presets
                            <br></br>
                            NOTE: the right side is used for saving a snapshot of a certain game's folder(s)
                            <br></br>
                            NOTE: the left side is used to manage snapshots (referred as "presets")
                            <br></br>
                            NOTE: if there is no snapshot for this certain folder, suggest to create a new snapshot
                            <br></br>
                            this could be used as a way to "back up" a game
                            <br></br>
                            TODO: add the ability to set whichever name I want for my presets
                            <br></br>
                            TODO: add the ability to also be able to navigate folder structures on the left side
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
