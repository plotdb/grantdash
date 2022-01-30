# ldnotify

simple notification widget.


## Installation

    npm install --save ldnotify


## Usage

include `ldnotify.js` and `ldnotify.css`, then send a notification with:

    ldnotify.send('success', 'message of your notification');

By default there are following type of messages:

 - success
 - warning
 - danger
 - light
 - dark


## Customization

create a `ldnotify` object to customize it:

    ldn = new ldnotify({ ... options ... });


Following are the available options:

 - className: default CSS class for message box.
   - Should be array or space-separated string.
   - Default `ldnotify-item`.
 - classIn: CSS class for transition-in animation.
   - Should be array or space-separated string.
   - Default `ldnotify-in`.
 - classOut: CSS class for transition-out animation.
   - Should be array or space-separated string.
   - Default `ldnotify-out`.
 - delay: how long a message is shown. default `2000` ( in ms ).
 - class-by-type(type): type class generator function. should return a css class name corresponding to the input type.
   - default `function(type) { return "ldnotify-" + type; }`.
   - there is no limitation about the type you want to use, but you have to add the corresponding classes yourself. 
 - root: container of messages. auto created if omitted.


# credit

sample icons are provided by [feathericons.com](https://feathericons.com/).
