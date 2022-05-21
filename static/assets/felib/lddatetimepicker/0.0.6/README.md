# lddatetimepicker

Vanilla Date/Time picker.


## Usage

install via npm, along with required libraries:

    npm install --save lddatetimepicker @loadingio/debounce.js dayjs


include required js / css:

    <link rel="stylesheet" type="text/css" href="dist/index.min.css">
    <script type="text/javascript" src="path-to/debounce.js"></script>
    <script type="text/javascript" src="path-to-day.js"></script>
    <script type="text/javascript" src="dist/index.min.js"></script>


initialize:

    lddtp = new lddatetimepicker({host: "input"})
    lddtp.value("2021/01/23"); // set value
    lddtp.value(); // get value


Constructor options:

 - `host`: host element ( should be an input element, if provided )
 - `time`: default true. hide and disable time picker if false.


## API

 - `isOn()`: return true if lddatetimepicker dialog is on, otherwise return false
 - `fire(n, ...args)`
 - `on(n, cb)`
 - `update()`
 - `value()`


## License

MIT
