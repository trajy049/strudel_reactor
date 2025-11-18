import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes/tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import Controls from './components/Controls';
import PlayButton from './components/PlayButton';
import ProcButton from './components/ProcButton';
import PreprocessButton from './components/PreprocessButton';
import JSONSettings from './components/JSONSettings';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

    const [volume, setVolume] = useState(.75);
    const [reverb, setReverb] = useState(0);
    const [songText, setSongText] = useState(stranger_tune);
    const [CPM, setCPM] = useState(35);
    const hasRun = useRef(false);

    //Play button to resume music
    const handlePlay = () => {
        globalEditor.evaluate()
    }

    //Stop button to stop music
    const handleStop = () => {
        globalEditor.stop()
    }

    //Reads volume from slider then sets the volume and SongText and resumes playing.
    const handleVolumeChange = (e) => {
        const volumeChange = parseFloat(e.target.value);
        setVolume(volumeChange);

        let newSound = songText + `\nall(x => x.gain(${volumeChange}))`
        setSongText(newSound);
        globalEditor.setCode(newSound);
        handlePlay();
    }

    //Reads reverb from slider then sets the reverb
    const handleReverbChange = (e) => {
        const reverbChange = parseFloat(e.target.value);
        setReverb(reverbChange);

        let newSound = songText + `\nall(x => x.room(${reverbChange}))`
        setSongText(newSound);
        globalEditor.setCode(newSound);
        handlePlay();
    }

    //Sets CPM to value from the textbox.
    const handleCPMChange = (e) => {
        const CPMValue = e.target.value;
        setCPM(CPMValue);

        //Stops the function if CPM is undefined
        if (CPMValue.trim() == "") {
            return;
        }

        const CPMChange = parseFloat(CPMValue);
        if (isNaN(CPMChange)) {
            return;
        }
        //Updates CPM in the editor
        const newCPM = songText + `\nsetcpm(${CPMChange})`
        setSongText(newCPM);
        globalEditor.setCode(newCPM);
        handlePlay();
    }

    //Saves current settings using JSON and localstorage
    const handleSaveSettings = () => {
        const settings = { volume, reverb, CPM, songText };
        localStorage.setItem("saveSettings", JSON.stringify(settings));
    }

    //Loads settings that were saved into localstorage
    const handleLoadSettings = () => {
        const stored = localStorage.getItem("saveSettings");
        //Error handling if nothing has been saved
        if (!stored) {
            return alert("No settings are saved!");
        }

        const settings = JSON.parse(stored);

        //Sets settings to values found in localstorage and plays the music
        setVolume(settings.volume);
        setReverb(settings.reverb);
        setCPM(settings.CPM);
        setSongText(settings.songText);
        globalEditor.setCode(settings.songText)
        handlePlay();
    }
useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
        document.getElementById('proc').value = stranger_tune
   
    }
    globalEditor.setCode(songText);
}, [songText]);


return (
    <div>
        <h2 className="text-center" bg-light>Strudel Mixer</h2>
        <main>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <PreprocessButton defaultValue={songText}
                                          onChange={(e) => setSongText(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                        <nav>
                            <ProcButton/>
                            <br />
                            <PlayButton onPlay={handlePlay}
                                        onStop={handleStop} />
                        </nav>
                        <br />
                        <JSONSettings onSave={handleSaveSettings} onLoad={handleLoadSettings} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    <div className="col-md-4">
                        <Controls volume={volume}
                                  reverb={reverb}
                                  onVolumeChange={handleVolumeChange}
                                  onReverbChange={handleReverbChange}
                                  onCPMChange={handleCPMChange}
                                  CPM={CPM} />  
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}