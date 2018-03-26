# SimpleSelect
jQuery Plugin to build <select> elements with a search feature - 2kb

![alt text](./doc/example.png "SimpleSelect Component")

HTML:
~~~html
<select id="segment" name="segmentation"></select>
~~~

JavaScript
~~~javascript
var options = {
    terms: [
        'JAVASCRIPT',
        'PHP',
        'BRAZIL',
        'CANADA',
        'MEAN'
    ]
}

$('#segment').simpleSelect(options);
~~~

### Options

| Name              | Description                                                 | Default            |
| ----------------- |:-----------------------------------------------------------:|:-------------------|
| terms             | <select> options                                            | Empty Array `[]`   |
| notFoundMessage   | Message to show when no terms are found                     | `'Not found.'`     |
| defaultSelected   | Initial <select> term (will not be shown in the options)    | `'Select...'`      |

[CodePen Example](https://codepen.io/jeffersonRibeiro/pen/dmGeGJ)
