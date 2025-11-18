
function Controls({ volume, reverb, CPM, onVolumeChange, onReverbChange, onCPMChange }) {
    
    return (
    <>
        <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <form>
                    <input type="text" className="form-control" id="cpm_text_input" placeholder="CPM..." aria-describedby="cpm_label" onChange={onCPMChange} value={CPM} />
                </form>
                
            </div>

            <label htmlFor="volume_range" className="form-label">Volume: {volume}</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range" onChange={onVolumeChange} value={volume} />

            <label htmlFor="reverb_range" className="form-label">Reverb: {reverb}</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="reverb_range" onChange={onReverbChange} value={reverb} />

            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="s1" />
                <label className="form-check-label" htmlFor="s1">
                    Toggle drums
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d1" />
                <label className="form-check-label" htmlFor="d1">
                    Toggle Reverb
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d2" />
                <label className="form-check-label" htmlFor="d2">
                    Checked checkbox
                </label>
            </div>
    </>
  );
}

export default Controls;