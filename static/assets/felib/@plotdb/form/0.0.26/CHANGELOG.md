# Change Logs

## v0.0.26

 - fix bug: widget value call should return cloned value, and should also store cloned value.


## v0.0.25

 - fix bug: incorrect parameter value ( which should be opt ) passed to submod validator


## v0.0.24

 - support `defaultValue` in widget


## v0.0.23

 - add string `regex` op


## v0.0.22

 - add length `eq` op


## v0.0.21

 - fix bug: internal widget changes affect host object when setting value with `manager.value`.
 - add `isEqual` widget and widget mod api.


## v0.0.20

 - add `msg` field in term for showing error message
 - add `meta` event, fired when `meta` is modified.


## v0.0.19

 - provide `isEmpty(v)` api for accessing `mod.isEmpty`
 - accept param in `content(v)` so `content` can also be an utility function for value testing.


## v0.0.18

 - fix bug: validation sometimes fails due to object content returned for comparison.


## v0.0.17

 - fix bug: file opset validation failed due to illegal value in list
 - add a `content` api in both manager and widget for users to retrieve content defined by widget.
   - also rename `mod.value` to `mod.content` for consistency


## v0.0.16

 - check arguments.length instead of typeof(v) in widget.value to support setting undefined as value
 - add `partial` option to support manager value partially update
 - use `undefined` as initial value for widget
 - support `mod.value` for value parsing
 - change default check for emptiness from (!v) to either undefined or empty strgin ''


## v0.0.15

 - add file opset


## v0.0.14

 - use `isRequired` instead of `config.isRequired` since it's mandatory


## v0.0.13

 - bug fix: set mode failed


## v0.0.12

 - bug fix: setting manager mode doesn't always return a Promise.


## v0.0.11

 - bug fix: don't set value only if it's undefined


## v0.0.10

 - bug fix: `is-empty` of widget mod can't be executed correctly


## v0.0.9

 - bug fix: manager status isn't updated correctly due to status update logic incorrect


## v0.0.8

 - bug fix: race condition in value validation.
 - spec changes: `mode`, `value`, `deserialize` now return Promise, resolves when validation is finished.


## v0.0.7

 - bug fix: `manager.widget` doesn't work


## v0.0.6

 - bug fix: widget status change isn't logged in form manager.
 - bug fix: widget init status isn't logged in form manager.
 - bug fix: progress NaN when there is no widget.


## v0.0.5

 - bug fix: `check` is not finished immediately even if `now` is true
 - bug fix: set value may fail due to empty value provided
 - bug fix: `check` from `status` / `change` events of form.widget causes redundant validation.
 - bug fix: `change` event of form.widget isn't forwarded to form.manager correctly.
 - return invalid widgets from `check` call in ( if applicable, array of ) `{widget, path, status}` object.


## v0.0.4

 - add `root()` function to get root element of an widget


## v0.0.3

 - changes about `mode`:
   - add `mode` in `form.manager`
   - mode change triggers event `mode` with new mode value
   - redefine mode values to `edit`, `view` and `config`
   - update documentation

## v0.0.2

 - add `length` opset
 - add `is` in `number` opset
 - add `convert` in `number` opset
 - support ldform favor `status` and `off` ( removeListener )
 - support form.manager based on `ldform` logic
 - update documentation


## v0.0.1

 - initial release
