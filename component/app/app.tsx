
import styles from './app.module.css'
import { useState } from 'react'
import { getResult} from '../../services/ApiWrapper'

import { ChangeEvent } from 'react';

export default function App() {

    const [tone, setToneDropDown] = useState("funny")
    const [style, setStyleDropDown] = useState("summarize")
    const [writing, setWriting] = useState("")
    const [response, setResponse] = useState("")

    const TYPE = {
        TONE:"tone",
        STYLE: "style"
    }

    const handleToneChange = async(event: ChangeEvent<HTMLSelectElement>) => {
        const target = event.target as HTMLSelectElement; // Asserting event.target as HTMLInputElement
        if (target !== null) {
            const toneState = target.value; 
            setToneDropDown(toneState)
        }
    };

    const handleStyleChange = async(event: ChangeEvent<HTMLSelectElement>) => {
        const target = event.target as HTMLSelectElement; // Asserting event.target as HTMLInputElement
        if (target !== null) {
            const styleState = target.value; 
            setStyleDropDown(styleState)
        }
    };

    const getToneValue =async () => {
        getResult({content: writing, type:TYPE.TONE, context: tone}).then((response) => {
            setResponse(response);
        });
    }

    const getStyleValue =async () => {
        getResult({content: writing, type:TYPE.STYLE, context: style}).then((response) => {
            setResponse(response);
        });
    }


    return (
        <div>
            <div>
                <select className={styles.tone_change} onChange={handleToneChange} value={tone}>
                    <option value="funny">Funny</option>
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                </select>
                <button className={styles.submit_button_tone} id="change_tone" onClick={getToneValue}>Change Tone</button>
                <select className={styles.style_change} onChange={handleStyleChange}  value={style}>
                    <option value="summarize">Summarize</option>
                    <option value="vocab">Vocab</option>
                    <option value="improve">Improve</option>
                </select>
                <button className={styles.submit_button_action} id="take_action" onClick={getStyleValue}>Take Action</button>
            </div>
<div className={styles.writing_area}>
    <textarea id="writing_space" onChange={e => setWriting(e.target.value)} placeholder="write your content here"/>
</div>
<div className={styles.response_area}>
    <textarea id="response_space" onChange={e => setResponse(e.target.value)} value={response}  placeholder="AI response"/>
</div>
        </div>  
    )
}

export{}