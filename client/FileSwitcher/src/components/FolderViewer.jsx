import { useState } from 'react'
import axios from 'axios'
import SaveAsForm from './SaveAsForm'

const FolderViewer = (props) => {
    const [ActiveFolders, setActiveFolders] = useState([])
    const [ManagedDirectoryAddress, setManagedDirectoryAddress] = useState("")

    const FolderStyle = { backgroundColor: "orange", color: "black", borderRadius: "0px", margin: "2px" }

    const { localhost } = props

    const handleOnSelectManagedDirectory = () => {
        axios.post(`${localhost}/get_directory`, {
            "directory": ManagedDirectoryAddress
        })
            .then((res) => {
                setActiveFolders(res.data.dir_folders)
                console.log(res)
            })
            .catch((err) => { })
    }

    const handleOnStepOutManagedDirectory = () => {
        axios.post(`${localhost}/step_out`, {
            "directory_to_step": ManagedDirectoryAddress
        })
            .then((res) => {
                console.log(res.data)
                setManagedDirectoryAddress(res.data)
            })
            .catch((err) => { })
    }
    return (
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
                <SaveAsForm></SaveAsForm>
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
                    <br></br>
                    NOTE: to select certain items, I would select/checkbox files (and folders) that I want to save
                    <br></br>
                    I would refer to selecting these items as lasso-ing
                    <br></br>
                    lasso-ed items are referred to by their address string
                    <br></br>
                    these location strings are stored in an array to be processed by the api
                    <br></br>
                    I can name the preset folder to whatever I want, then save all the lasso-ed files
                    (and their respective directories) to FileSwitcher's snapshots
                    <br></br>
                    another thing I would save would be the location where the snapshot will apply to
                    <br></br>
                    so that I would be able to apply the changes to whenever I select to apply a preset
                    <br></br>
                    NOTE: folders should be copied *file for file, blank for blank*
                    <br></br>
                    if a folder is empty, the empty will be the preset
                </p>
            </div>
        </div>
    )
}

export default FolderViewer