import React from 'react';
import WrappedComponent  from './warper'
import { listUser } from './query'


class test extends React.Component {

  render() {
    console.log(this.props)
    return (<div>sdfsdf</div>)
  }
}


export default WrappedComponent(test, listUser)


