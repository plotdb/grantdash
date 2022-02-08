# @plotdb/form

Form related modules for interactive form design throught GUI, with following (expected, TODO) features:

 - design a form through GUI.
 - designed form serializable and renderable in frontend for end users to fill.
 - end user filled result of a form is also serializable.
 - Aware of OT for collaborative editing.
 - Works in both frontend and backend.


`@plotdb/form` includes following modules:

 - `form.manager`: manage a set of form widgets.
 - `form.widget`: interface between form manager and UI.
 - `form.opset`: a set of op for validating given input from user.
 - `form.op`: a specific operation for validating given input from user.
 - `form.term`: a rule ( a op, opset and config based on the specified op ) for validating given input from user.


## Draft

### form.block attrubite

An attribute is an aspect of data from a form.block. For example, a File form.block could contains following attributes:

 - `size` - size of all files combined.
 - `count` - count of files.
 - `modifiedtime` - modified time of last touched files.
 - `ext` - type of files.

Every attribute can be associated with one or multiple `form.opset` For example, above `ext` attribute can be associated with `extensions` type, which helps in determining if files in a given `ext` array all belong to certain file type.

