import React from 'react';

const reactStringReplace = require('react-string-replace');

export default function(text) {
    let replacedText = reactStringReplace(text, /(.+)\n\n/g, (match, i) => (
        <p key={match + i}>{match}</p>
    ));

    replacedText = reactStringReplace(replacedText, /(.+)\n/g, (match, i) => (
       <span key={match + i}>{match}<br/></span>
    ));

    return replacedText;
};