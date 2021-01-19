# Hello

This is a small website made with Create React App. It converts number bases and also visualizes the conversion.

https://pangene.github.io/number-base-converter/

# Todo

* Style better! Right now it's real ugly.

* Refactor. Right now, how the program determines an input is invalid is done very messily.

* Add warning/error messages: right now the limit for bases is 2-36 (0-9 + a-z, and also what Javascript's parseInt function limits us to). It also parses the input value to ensure validity. But, when an invalid input is registered, it simply says invalid, not how. In the future, I want to specify why the input is invalid.