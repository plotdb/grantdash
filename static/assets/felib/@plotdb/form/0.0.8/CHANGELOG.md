# Change Logs

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
