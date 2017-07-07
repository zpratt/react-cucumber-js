import React from 'react';
import ReactDOM from 'react-dom';

const HelloWorld = () => {
    return (
        <p>{'Hello World'}</p>
    );
};

ReactDOM.render(<HelloWorld/>, document.querySelector('.app'));
