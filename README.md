# SimpleSelect

![alt text](https://img.shields.io/badge/size-2kb-green.svg "2kb")

jQuery Plugin to build select elements with a search feature

![alt text](./doc/demo.gif "SimpleSelect Component")

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

It works that way too.

~~~html
<select id="segment" name="segmentation">
    <option data-defaultSelected>Select</option> 
    <option>JAVASCRIPT</option>
    <option>PHP</option>
    <option>BRAZIL</option>
    <option>CANADA</option>
    <option>MEAN</option>
</select>
~~~

JavaScript
~~~javascript
$('#segment').simpleSelect();
~~~



### Options

| Name              | Description                                                    | Default            |
| ----------------- |:--------------------------------------------------------------:|:-------------------|
| terms             | select element options                                         | Empty Array `[]`   |
| notFoundMessage   | Message to show when no terms are found                        | `'Not found.'`     |
| defaultSelected   | Initial select element term (will not be shown in the options) | `'Select'`         |

[CodePen Example](https://codepen.io/jeffersonRibeiro/pen/dmGeGJ)

<br/>
<br/>

<p align="center"><img src="https://avatars2.githubusercontent.com/u/20846473?s=70&v=4" width="35" height="35"/></p>
<p align="center">
<sub>A little project by <a href="http://www.jeffersonribeiro.com/">Jefferson Ribeiro</a></sub>
</p>
