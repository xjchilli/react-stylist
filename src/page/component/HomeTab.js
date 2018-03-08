import React from 'react'
import { Link } from 'react-router-dom';

class HomeTab extends React.Component {
    render() {
        return (
            <nav className='home-head-nav text-center'>
                <Link to='/' className={this.props.tab === '1' ? 'active' : ''}>
                    <span>精选</span>
                </Link>
                <Link to='/dpsList' className={this.props.tab === '2' ? 'active' : ''}>
                    <span>搭配师</span>
                </Link>
            </nav>
        )
    }
}

HomeTab.defaultProps = {
    tab: '1'
}

export default HomeTab;