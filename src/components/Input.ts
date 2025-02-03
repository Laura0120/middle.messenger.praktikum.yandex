import Block, { BlockProps } from '../framework/Block';
import { IInput } from '../const/inputs';

export interface IInputProps extends IInput, BlockProps {
  setInputValid?: (valid: boolean) => void;
  setInputValue?: (value: string) => void;
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
        blur: (e: Event) => {
          const currentTarget = e.currentTarget as HTMLInputElement;
          const value = currentTarget.value;
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
        input: (e: Event) => {
          const currentTarget = e.currentTarget as HTMLInputElement;
          const value = currentTarget.value;
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
    if (this.props.value) {
      attributes.push(`value=${this.props.value}`);
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
