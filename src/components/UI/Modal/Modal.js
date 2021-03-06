import React, {Component} from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/AuxComp";
import Backdrop from "../Backdrop/Backdrop";

class modal extends Component {
    shouldComponentUpdate(nextProps){
        return (nextProps.show !== this.props.show || nextProps.children !== this.props.children) //prevent modal and children from updating if it is not shown
    }

    render(){
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                        opacity: this.props.show ? "1" : "0"
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
};

export default modal;