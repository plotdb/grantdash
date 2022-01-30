# @plotdb/semver

semantic version utility.

(TBD) there has been some similar implementations. We probably should use them instead?


## Installation

    npm install --save @plotdb/semver


## Usage

    require! <[@plotdb/semver]>
    semver.fit "1.5.0", "^1.3.2" # true
    semver.fit "1.5.0", "~1.3.2" # false


## License

MIT

