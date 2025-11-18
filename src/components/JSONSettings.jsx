function JSONSettings({ onSave, onLoad }) {
    return (
    <>
    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                <button id="process" className="btn btn-outline-success" onClick={onSave}>Save Settings</button>
                <button id="process_play" className="btn btn-outline-primary" onClick={onLoad}>Load Settings</button>
    </div>
    </>
    );
}

export default JSONSettings;