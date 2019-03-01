import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Skeleton } from 'antd';
const WrappedComponent = (Component, {query, vars}) => {
    class wape extends React.PureComponent {

        render() {
            if (this.props.data.error) return (
                <div>error</div>
            )
            return (
                <Skeleton loading={this.props.loading} >
                    <Component  {...this.props} />
                </Skeleton>
            )
        }
    }

    return compose(
        graphql((query, {
            options: (props) => (
                { variables: { `${vars}`: props['props'] } }
            )
        }))
    )(wape);
};




export default WrappedComponent

