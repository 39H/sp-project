import React from 'react';
import BigText from '../components/BigText';
import PostLinks from '../components/PostLinks';

const Posts = ({children}) => {
    return (
        <div>
            <BigText>포스트</BigText>
            <PostLinks/>
            {children}
        </div>
        
    );
};

export default Posts;