import Block from '../framework/Block';

export interface IInputProps {
  name: string;
  type: string;
  placeholder?: string;
  errorMessage?: string;
  pattern?: RegExp;
  required?: boolean;
  disabled?: boolean;
  setInputValid?: (boolean) => void;
  setInputValue?: (string) => void;
}
export default class Input extends Block {
  protected state: {
    valid: boolean;
    filled: boolean;
  };

  constructor(props: IInputProps) {
    super({
      ...props,
      events: {
        blur: (e) => {
          const value = e.currentTarget.value;
          let valid;
          if (value) {
            valid = props.pattern?.test(value) ?? true;
          } else {
            valid = !props?.required;
          }
          if (props.setInputValid) {
            props.setInputValid(valid);
          }
          this.state.valid = valid;
          this.changeStyle();
        },
        input: (e) => {
          const value = e.currentTarget.value;
          if (props.setInputValue) {
            props.setInputValue(value);
          }
          if (value) {
            this.state.filled = true;
          }
          this.changeStyle();
        },
        invalid: () => {
          this.state.valid = false;
          if (props.setInputValid) {
            props.setInputValid(false);
          }
          this.changeStyle();
        },
      },
    });
    this.state = {
      valid: true,
      filled: false,
    };
  }

  changeStyle() {
    this.setAttributes({
      class: `input ${!this.state.valid ? 'invalid' : ''} ${this.state.filled ? 'filled' : ''}`,
    });
  }

  override render() {
    const attributes = [];

    if (this.props.required) {
      attributes.push('required');
    }
    if (this.props.disabled) {
      attributes.push('disabled');
    }

    return `<input ${attributes.join(' ')} 
        id="{{name}}" 
        name="{{name}}" 
        type="{{type}}" 
        placeholder="{{placeholder}}" 
        aria-errormessage="{{errorMessage}}"
        class="input">`;
  }
}
