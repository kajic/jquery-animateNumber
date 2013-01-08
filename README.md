jquery-animateNumber
====================

Use on elements that contain a number (integer or float) to
animate the number to a new value over a short period of time.

### Usage

Call signatures:

```javascript
$("...").animateNumber(newNumber);

$("...").animateNumber(newNumber, callback);

$("...").animateNumber(newNumber, options, callback);
```

Animate the number in the element selected by #numberContainer to the
current unix timestamp:

```javascript
$("#numberContainer").animateNumber(Date.now());
```

### Number container data attributes

**type** (default=int): int or float

**stepDecimals** (optional): Number of decimals to show while animating.

**endDecimals** (optional): Number of decimals to show after animation.

### Options
**duration** (default=5000): Animation duration in miliseconds.

**easing** (default=swing): Animation easing, use any jquery animation easing.

**animateOpacity** (default=true): Animate number container opacity while animating the number.

**intStepDecimals** (default=0): Number of decimals to show while animating a integer number.

**intEndDecimals** (default=0): Number of decimals an integer number should have after animation.

**floatStepDecimals** (default=4): Number of decimals to show while animating a float number.

**floatEndDecimals** (default=1): Number of decimals an float number should have after animation.

**callback** (optional): Callback to be called at end of animation.

### License
jquery-animateNumber is free software, and may be redistributed under the MIT-LICENSE.