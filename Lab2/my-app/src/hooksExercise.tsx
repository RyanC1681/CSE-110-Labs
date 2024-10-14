//M export ClickCounter

//import React, { useState } from 'react';
import React, { useState, useEffect } from 'react'; //M update 4.2 useEffect
import { ThemeContext, themes } from './ThemeContext';
import { useContext } from 'react';

export function ClickCounter() {
const [count, setCount] = useState(0);

const handleClick = () => {
setCount(count + 1);
};

// M update 4.2 useEffect
useEffect(() => {
document.title = `You clicked ${count} times`;
}, [count]);

const theme = useContext(ThemeContext);
return (

<div
style={{
background: theme.background,
color: theme.foreground,

padding: "20px",
}}
>
<p>You clicked {count} times lalala</p>
<button
onClick={() => setCount(count + 1)}
style={{ background: theme.foreground, color: theme.background }}

>

Click me
</button>
</div>
);
}

//

// Wrapper component to provide context

function ToggleTheme({ setCurrentTheme }: { setCurrentTheme: any }) {
const currentTheme = useContext(ThemeContext);

const toggleTheme = () => {
setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
//let bodyStyle = document.body.style;
//if (bodyStyle.backgroundColor === 'black') {
//bodyStyle.backgroundColor = 'white';
//} else {
// bodyStyle.backgroundColor = 'black';
//}

};

return (
<ThemeContext.Provider value={currentTheme}>
<button onClick={toggleTheme}> Toggle Theme -Light or Dark </button>

</ThemeContext.Provider>

);
}

export function LightSwitch() {
function handleClick() {
let bodyStyle = document.body.style;
if (bodyStyle.backgroundColor === 'black') {
bodyStyle.backgroundColor = 'white';
} else {
bodyStyle.backgroundColor = 'black';
}
}

return (
<button onClick={() => handleClick()}>
Toggle Theme -Light or Dark
</button>
);
}

export default ToggleTheme;
//export default LightSwitch;