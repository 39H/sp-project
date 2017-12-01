import React, { Component } from 'react';
import { HeaderContainer, ThreadListContainer, PortfolioContainer } from 'containers';

class Community extends Component {
    render() {
        const { username:userName } = this.props.match.params;
        return (
            <div>
                <HeaderContainer />
                <PortfolioContainer select={1} userName={userName}>
                    <ThreadListContainer userName={userName} />
                </PortfolioContainer>
            </div>
        );
    }
}

export default Community;