import { useState } from "react"
import axios from "axios"

const SnapshotManager = (props) => {
    const [PresetManagerTestName, setPresetManagerTestName] = useState("")
    const { localhost } = props

    const handleOnPresetManagerTest = () => {
        axios.post(`${localhost}/preset_manager_test`, {
            "name": PresetManagerTestName
        })
            .then((res) => { })
            .catch((err) => { })
    }



    return (
        <div>
            <h1>Fileswitcher App, Presets, Etc</h1>
            <input onChange={(e) => setPresetManagerTestName(e.target.value)}></input>
            <button onClick={() => handleOnPresetManagerTest()}>Preset Manager Test</button>
        </div>
    )
}

export default SnapshotManager