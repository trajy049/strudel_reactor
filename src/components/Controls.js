
function Controls({ volume, onVolumeChange }) {
    
    return (
    <>
        <div className="input-group mb-3">
            <span className="input-group-text" id="cpm_label">setCPM</span>
            <input type="text" className="form-control" id="cpm_text_input" placeholder="120" aria-describedby="cpm_label" />
        </div>

            <label htmlFor="volume_range" className="form-label">Volume: {volume}</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range" onChange={onVolumeChange} value={volume} />

            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="s1" />
                <label className="form-check-label" htmlFor="s1">
                    Default checkbox
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d1" />
                <label className="form-check-label" htmlFor="d1">
                    Checked checkbox
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