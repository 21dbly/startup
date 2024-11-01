# Notes

## Console

pwd - present working directory
echo - Output the parameters of the command
cd - Change directory
mkdir - Make directory
rmdir - Remove directory
rm - Remove file(s)
mv - Move file(s)
cp - Copy files
ls - List files (-la shows more)
curl - Command line client URL browser
grep - Regular expression search
find - Find files
top - View running processes with CPU and memory usage
df - View disk statistics
cat - Output the contents of a file
less - Interactively output the contents of a file
wc - Count the words in a file
ps - View the currently running processes
kill - Kill a currently running process
sudo - Execute a command as a super user (admin)
ssh - Create a secure shell on a remote computer
scp - Securely copy files to a remote computer
history - Show the history of commands
ping - Check if a website is up
tracert - Trace the connections to a website
dig - Show the DNS information for a domain
man - Look up a command in the manual

## ports and stuff
80: http
443: https
22: ssh

## HTML
<!DOCTYPE html>

Document Object Model represents your page. (DOM)
HTML defines the content and structure
css styles it
javascript can interact and modify the DOM

Some tags:
body, header, footer, main, section, aside, p, table, ol/ul, div, and span
<br />a href="" alt=""
<br />img src="" width=

connecting css:
<link rel="stylesheet" href="styles.css" />
(also within <style></style> or as a "style" attribute)

connecting javascript:
<script src="javascript.js"></script>
(also within <script><script/> or in some attributes like "onclick")


## CSS
### selector
(body, p, span, #id, .class, etc)
Descendant	A list of descendants	body section	Any section that is a descendant of a body
Child	A list of direct children	section > p	Any p that is a direct child of a section
General sibling	A list of siblings	div ~ p	Any p that has a div sibling
Adjacent sibling	A list of adjacent sibling	div + p	Any p that has an adjacent div sibling

### Declarations
Property-Value-Example-Discussion
background-color	color	red	Fill the background color
border	color width style	#fad solid medium	Sets the border using shorthand where any or all of the values may be provided
border-radius	unit	50%	The size of the border radius
box-shadow	x-offset y-offset blu-radius color	2px 2px 2px gray	Creates a shadow
columns	number	3	Number of textual columns
column-rule	color width style	solid thin black	Sets the border used between columns using border shorthand
color	color	rgb(128, 0, 0)	Sets the text color
cursor	type	grab	Sets the cursor to display when hovering over the element
display	type	none	Defines how to display the element and its children
filter	filter-function	grayscale(30%)	Applies a visual filter
float	direction	right	Places the element to the left or right in the flow
flex			Flex layout. Used for responsive design
font	family size style	Arial 1.2em bold	Defines the text font using shorthand
grid			Grid layout. Used for responsive design
height	unit	.25em	Sets the height of the box
margin	unit	5px 5px 0 0	Sets the margin spacing
max-[width/height]	unit	20%	Restricts the width or height to no more than the unit
min-[width/height]	unit	10vh	Restricts the width or height to no less than the unit
opacity	number	.9	Sets how opaque the element is
overflow	[visible/hidden/scroll/auto]	scroll	Defines what happens when the content does not fix in its box
position	[static/relative/absolute/sticky]	absolute	Defines how the element is positioned in the document
padding	unit	1em 2em	Sets the padding spacing
left	unit	10rem	The horizontal value of a positioned element
text-align	[start/end/center/justify]	end	Defines how the text is aligned in the element
top	unit	50px	The vertical value of a positioned element
transform	transform-function	rotate(0.5turn)	Applies a transformation to the element
width	unit	25vmin	Sets the width of the box
z-index	number	100	Controls the positioning of the element on the z axis

box: outside: margin then border then padding then content

Flex:
for containers:
flex-direction: row | row-reverse | column | column-reverse;
flex-wrap: nowrap | wrap | wrap-reverse;
flex-flow: column wrap;
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
align-items: stretch | flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end + ... safe | unsafe;
(align-items is like justify content but for cross-axis)
align-content: flex-start | flex-end | center | space-between | space-around | space-evenly | stretch | start | end | baseline | first baseline | last baseline + ... safe | unsafe;
(align-content is only for multi-line with wrapping)
gap: 10px 20px; /* row-gap column-gap */

for children:
order: 5; /* default is 0 */
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
align-self: auto | flex-start | flex-end | center | baseline | stretch;


## Javascript
can be included in 3 ways: in attribute thing, in <script></script> and in seperate javascript page
functions: named, anonymous, and arrows
arrow function without brackets auto returns, can only be one line
with brackets does not auto return, can be more lines

"Syntax is the least important thing"

if (a === 1) {
  //...
} else if (b === 2) {
  //...
} else {
  //...
}

for (let i = 0; i < 2; i++) {}
for (const name in obj) {}
while (true) {}


iterating: `in` means index/keys, `of` means value

JSON is like objects, but only strings. JSON.stringify(obj) and JSON.parse(obj_jason)

JSON types:
string	"crockford"
number	42
boolean	true
array	[null,42,"crockford"]
object	{"a":1,"b":"crockford"}
null	null

### Arrays:
push	Add an item to the end of the array	a.push(4)
pop	Remove an item from the end of the array	x = a.pop()
slice	Return a sub-array	a.slice(1,-1)
sort	Run a function to sort an array in place	a.sort((a,b) => b-a)
values	Creates an iterator for use with a for of loop	for (i of a.values()) {...}
find	Find the first item satisfied by a test function	a.find(i => i < 2)
forEach	Run a function on each array item	a.forEach(console.log)
reduce	Run a function to reduce each array item to a single item	a.reduce((a, c) => a + c)
map	Run a function to map an array to a new array	a.map(i => i+i)
filter	Run a function to remove items	a.filter(i => i%2)
every	Run a function to test if all items match	a.every(i => i < 3)
some	Run a function to test if any items match	a.some(i => i < 1)

### Regex
const objRegex = new RegExp('ab*', 'i');
const literalRegex = /ab*/i;
i means ignore case

## React
Shaodw DOM: creates a virtual copy of the DOM that is faster. Figures out any changes and updates the real DOM.
components can be class style or function syle. Function style are constant functions that return valid html.

### Promises
new Promise((resolve, reject) => resolve(true))

# Internet
Local use addresses: 10., 192.168
DHCP (Dynamic Host Configuration Protocol) assigns IP addresses to devices on a network


