
# Youtube downloader

A simple utility to download tracks from youtube as mp3.

# Prerequisites

* node.js and npm

# Set up

* Clone the repo
* Run `npm install`

# Try it out

Run `scripts/download` to see example usage. An example download call is:

    scripts/download "Michael Buble - Sway" ~/Music

This will look for an audio track on youtube and save it under `~/Music/Michael Buble - Sway.mp3`.

# Run the tests

The tests are all integration tests so they will take a while to run, and require an internet connection.

To set up the tests you'll need to install nodeunit - `sudo npm install -g nodeunit`. Then run `nodeunit test`.
