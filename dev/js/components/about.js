
import React, { Component } from "react";
import { capitalFirst } from './utils.js'



class About extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<>
            <table>
                <tbody>
                    <tr><td><p>{this.props.about}</p></td></tr>
                </tbody>
            </table>
        </>)
    }
}




export { About };