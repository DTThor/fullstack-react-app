import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions'

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }
  //{field.meta.error} is automatically added to 'Field' object from our validate function

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }


  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Post Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to='/' className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  //validate the inputs from the 'values' object
  if (!values.title || values.title.length < 2) {
    errors.title = "Post title is required and must be at least 2 characters!";
  }
  if(!values.categories) {
    errors.categories = 'At least one category is required!';
  }
  if(!values.content) {
    errors.content = "You've gotta have some content!";
  }

  //if errors is empty, the form is fine to submit
  //if errors has any properties, redux-form assumes form is invalid
  return errors;
}


export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
