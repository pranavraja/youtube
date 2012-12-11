
# Youtube downloader

A simple utility to download tracks from youtube as mp3.

# Prerequisites

* node.js and npm

# Set up

* Clone the repo
* Run `npm install`

# Try it out

There are two scripts: `get_download_link.js` and `download.js`. They both accept data from `stdin` and write to `stderr` and `stdout`.

## get_download_link.js

Accepts a query and returns links in the form `http://downloadurl/<TAB>filename.mp3`.

    echo "Michael Buble - Sway" | scripts/get_download_link.js
    => http://downloadurl/asd	Sway (song).mp3

In the above example the script will output the download URL for the mp3, followed by a tab character, followed by the mp3 filename (taken from the title of the youtube video).

Alternatively you can pass in a youtube URL instead of the search query.

*Extra parameters*:

* `-p`: Preserve original query as filename

## download.js

Accepts a download request in the form `http://downloadurl/<TAB>filename.mp3` (in the same form returned by `get_download_link.js`), and downloads it to the current directory (requires `wget`).

    echo "http://server/dl123	sway.mp3" | scripts/download.js

In the above example, the script will run `wget` on the provided URL and will download the result to a file called `sway.mp3` in the current directory.

*Extra parameters*:

* `-d /path/to/dir`: Directory to download to (defaults to current directory)
* `--force`: Overwrite the file even if it already exists.

# More sample usage

    echo "Michael Buble - Sway" | scripts/get_download_link.js -p | scripts/download.js -d ~/Music

The above example will find an mp3 download link of "Sway" by Michael Buble and download it to `~/Music` with the filename `Michael Buble - Sway.mp3` (from the query).

# Run the tests

The tests are all integration tests so they will take a while to run, and require an internet connection.

To set up the tests you'll need to install nodeunit - `sudo npm install -g nodeunit`. Then run `nodeunit test`.
