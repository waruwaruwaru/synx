//signin.js will be our sign in form. It should have an email, password and a submit button.
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';


class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log(email, password);
    //Need to do something to log user in.
    this.props.signinUser({ email, password }); //{email: email, password: password}
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return(
        <div className="alert alert-danger">
          <strong>Opps!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    //handleSubmit is built-in redux-Form, email, password comes from out configuration on the bottom.
    const { handleSubmit, fields: { email, password }} = this.props;

    return (
      //if you dont use .bind(this) .. the context of 'this' will be unknown to the handleFormSubmit function.
      <div id="signin">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Email:</label>
            <input  {...email} className="form-control" />
          </fieldset>

          <fieldset className="form-group">
            <label>Password:</label>
            <input {...password} type="password" className="form-control" />
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Sign In</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

//first argument is for config, 2nd is for component
//reduxForm needs to be hooked as a reducer, it provides its own reducer inside of its application
export default reduxForm({
  form: 'signup', //can be any name
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
