# Preprocess:
This function reads the text from the textbox on the left side of the screen and edits the strudel code.

# Play/Stop:
These functions are responsible for playing the current song/pausing it.

# setCPM:
This function is responsible for reading the CPM the user has input and changing the CPM of the song to it.

# Volume:
This function reads the value from the slider and sets the current volume of the song to what the user has set.

# Reverb:
This function controls the reverb from the slider and sets the reverb of the song to it.

# Save/Load
This function uses localstorage to store the current settings using JSON data.
THe load button is responsible for loading all of the saved settings such as CPM, volume and reverb.