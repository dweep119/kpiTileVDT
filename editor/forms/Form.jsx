import React from 'react';
import PropTypes from 'prop-types';
import mapKeys from 'lodash.mapkeys';
import { createForm, formShape } from 'rc-form';
import FormGroup from './FormGroup';
import Button from './Button';
import Flex from '../layout/Flex';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClear = this.onClear.bind(this);
    this.state = {
      errors: [],
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const { onSubmit, onError } = this.props;

    this.props.form.validateFields((errors, values) => {
      if (errors) {
        const errorMessages = [];

        mapKeys(errors, (value) => {
          value.errors.map(error => errorMessages.push(error.message));
        });

        this.setState({
          errors: errorMessages,
        });

        onError(errors);
        return;
      }
      this.setState({
        errors: [],
      });
      onSubmit(values);
    });
  }

  onClear(e) {
    e.preventDefault();
    const { form, onClear } = this.props;
    form.resetFields();

    onClear(true);
  }

  getFormFieldComponent(field) {
    const { getFieldError } = this.props.form;
    const errors = getFieldError(field.name);

    let isErrored = false;

    if (errors && errors.length > 0) {
      isErrored = true;
    }

    return (
      <FormGroup
        key={field.name}
        label={field.label}
        tooltip={field.tooltip}
        error={isErrored}
        messages={errors}
        horizontal={field.horizontal}
      >
        {React.createElement(field.control, { ...field.controlProps })}
      </FormGroup>
    );
  }

  generateFormFields(fields) {
    const decorator = this.props.form.getFieldDecorator;

    const generatedFields = fields.map(field => decorator(field.name, {
      validate: [{
        rules: field.rules || [],
        trigger: 'onBlur',
      }],
      hidden: field.hidden || false,
      valuePropName: field.valuePropName || 'value',
      initialValue: field.defaultValue,
      getValueFromEvent: field.getValueFromEvent,
    })(this.getFormFieldComponent(field)));

    return generatedFields;
  }

  generateErrors() {
    const { errors } = this.state;
    return errors.map(error => (
      <p key={btoa(error)}>{error}</p>
    ));
  }

  render() {
    const { showSubmitButton } = this.props;
    let submitButton = (<Button className="btn-sm btn-primary" onClick={this.onSubmit}>Submit</Button>);
    if (this.props.submitButton) {
      const submitButtonComponent = this.props.submitButton;
      submitButton = React.cloneElement(submitButtonComponent, { onClick: this.onSubmit });
    }

    const { showClearButton } = this.props;
    let clearButton = (<Button className="btn-sm" onClick={this.onClear}>Clear</Button>);
    if (this.props.clearButton) {
      const clearButtonComponent = this.props.clearButton;
      clearButton = React.cloneElement(clearButtonComponent, { onClick: this.onClear });
    }

    let hasValidationErrors = false;
    if (this.state.errors.length > 0 && this.props.showErrors) {
      hasValidationErrors = true;
    }

    return (
      <form className={`${this.props.className}`}>
        {this.generateFormFields(this.props.fields)}
        <Flex flexDirection="row-reverse" alignItems="center" justifyContent="space-between">
          {showSubmitButton && submitButton}
          {showClearButton && clearButton}
        </Flex>
        {/* {hasValidationErrors ? (
          <div className="bf-editor-form message error">
            <ul>
              {this.generateErrors()}
            </ul>
          </div>
        ) : this.props.errorMessage
        } */}
        {/* {this.props.successMessage} */}
      </form>
    );
  }
}

const DefaultErrorMessage = (
  <div className="bf-editor-form message error">
    <ul>
      <li>We have a problem</li>
    </ul>
  </div>
);

const DefaultSuccessMessage = (
  <div className="bf-editor-form message success">
    <ul>
      <li>Form submitted!</li>
    </ul>
  </div>
);

Form.defaultProps = {
  className: null,
  context: {},
  fields: [],
  showSubmitButton: true,
  showClearButton: false,
  showErrors: true,
  error: false,
  success: false,
  errorMessage: DefaultErrorMessage,
  errorHeader: 'We have a problem',
  successMessage: DefaultSuccessMessage,
  onChange: () => { },
  onSubmit: () => { },
  onError: () => { },
  onClear: () => { },
  submitButton: null,
};

Form.propTypes = {
  className: PropTypes.string,
  form: formShape.isRequired,
  context: PropTypes.object, // eslint-disable-line
  fields: PropTypes.array,   // eslint-disable-line
  showSubmitButton: PropTypes.bool,
  showClearButton: PropTypes.bool,
  showErrors: PropTypes.bool,
  error: PropTypes.bool,
  success: PropTypes.bool,
  errorMessage: PropTypes.node,
  errorHeader: PropTypes.node,
  successMessage: PropTypes.node,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onError: PropTypes.func,
  onClear: PropTypes.func,
  submitButton: PropTypes.node,
};

const WrappedForm = createForm({
  onFieldsChange: (props, changed, all) => {
    if (props.onFieldsChange) {
      props.onFieldsChange(changed, all);
    }
  }
})(Form);

export default WrappedForm;
