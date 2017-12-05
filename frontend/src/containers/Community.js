import React, { Component } from 'react';
import { HeaderContainer, PortfolioContainer, CommunityThreadsContainer } from 'containers';

class Community extends Component {
    render() {
        const { username:userName } = this.props.match.params;
        return (
            <div>
                <HeaderContainer />
                <PortfolioContainer select={1} userName={userName}>
                    <CommunityThreadsContainer userName={userName}/>
                </PortfolioContainer>
            </div>
        );
    }
}

export default Community;