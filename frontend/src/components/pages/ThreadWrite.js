import React, { Component } from 'react';
import { HeaderContainer, PortfolioContainer, ThreadWriteContainer } from 'containers';

class WriteThread extends Component {
    render() {
        const { username:userName } = this.props.match.params;
        return (
            <div>
                <HeaderContainer />
                <PortfolioContainer select={1} userName={userName}>
                    <ThreadWriteContainer userName={userName} />
                </PortfolioContainer>
            </div>
        );
    }
}

export default WriteThread;