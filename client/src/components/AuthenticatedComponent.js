import React from "react";
import { browserHistory } from 'react-router';
import { connect } from "react-redux";
import { fetchUserProfile } from '../actions/userActions';

export function requireAuthentication(Component) {

    const mapStateToProps = (store) => ({
        isAuthenticated: store.auth.isAuthenticated,
        user: store.user
    });
    
    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
            this.checkAuth(this.props.isAuthenticated);
            
            if(this.props.isAuthenticated && !this.props.user.fetched)
                this.props.dispatch(fetchUserProfile());
        }
        
        componentWillReceiveProps (nextProps) {
            this.checkAuth(nextProps.isAuthenticated);
        }

        checkAuth (isAuthenticated) {
            if (!isAuthenticated) 
                browserHistory.push('/login')
        }

        render () {
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )

        }
    }



    return connect(mapStateToProps)(AuthenticatedComponent);

}