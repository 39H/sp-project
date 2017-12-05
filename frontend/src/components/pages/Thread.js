import React, { Component } from 'react';
import { HeaderContainer, ThreadDetailContainer, PortfolioContainer, CommunityThreadsContainer } from 'containers';

class Thread extends Component {
    render() {
        const { username:userName, threadid: threadId } = this.props.match.params;
        return (
            <div>
                <HeaderContainer />
                <PortfolioContainer select={1} userName={userName}>
                    <ThreadDetailContainer userName={userName} threadId={threadId} />
                </PortfolioContainer>
            </div>
        );
    }
}

export default Thread;