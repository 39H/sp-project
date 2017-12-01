const colors = [
    {
        bg: '#F44336',
        fg: '#FFFFFF'
    },
    {
        bg: '#E91E63',
        fg: '#FFFFFF'
    },
    {
        bg: '#9C27B0',
        fg: '#FFFFFF'
    },
    {
        bg: '#9E9E9E',
        fg: '#000000'
    },
    {
        bg: '#607D8B',
        fg: '#FFFFFF'
    },
    {
        bg: '#3F51B5',
        fg: '#FFFFFF'
    },
    {
        bg: '#009688',
        fg: '#FFFFFF'
    },
    {
        bg: '#795548',
        fg: '#FFFFFF'
    },
    {
        bg: '#43A047',
        fg: '#FFFFFF'
    },
    {
        bg: '#FFEB3B',
        fg: '#000000'
    }
];

export default function(displayName) {
    if(displayName && displayName !== '')
        return colors[parseInt(displayName.charCodeAt(0).toString().slice(-1), 10)];
    else
        return {bg: '#FFFFFF', fg: '$000000'}
};