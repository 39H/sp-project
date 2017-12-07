import React, { Component } from 'react';
import { HeaderContainer, PortfolioContainer, ThreadEditContainer } from 'containers';

class ThreadEdit extends Component {
    render() {
        const { username:userName, threadid:threadId } = this.props.match.params;
        return (
            <div>
                <HeaderContainer />
                <PortfolioContainer select={1} userName={userName}>
                    <ThreadEditContainer userName={userName} threadId={threadId} />
                </PortfolioContainer>
            </div>
        );
    }
}

export default ThreadEdit;