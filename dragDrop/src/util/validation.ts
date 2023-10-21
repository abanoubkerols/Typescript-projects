
  // validation
  export interface Validation {
    value: string | number;
    require?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export function validate(vlidationInput: Validation) {
    let isValid = true;
    if (vlidationInput.require) {
      isValid = isValid && vlidationInput.value.toString().trim().length !== 0;
    }
    if (
      vlidationInput.minLength != null &&
      typeof vlidationInput.value === "string"
    ) {
      isValid =
        isValid && vlidationInput.value.length >= vlidationInput.minLength;
    }
    if (
      vlidationInput.maxLength != null &&
      typeof vlidationInput.value === "string"
    ) {
      isValid =
        isValid && vlidationInput.value.length <= vlidationInput.maxLength;
    }

    if (
      vlidationInput.min != null &&
      typeof vlidationInput.value === "number"
    ) {
      isValid = isValid && vlidationInput.value >= vlidationInput.min;
    }
    if (
      vlidationInput.max != null &&
      typeof vlidationInput.value === "number"
    ) {
      isValid = isValid && vlidationInput.value <= vlidationInput.max;
    }

    return isValid;
  }
