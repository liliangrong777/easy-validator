type RuleItemMsg = { message: string }
type RuleItemRequired = { required: boolean } & Partial<RuleItemMsg>
type RuleItemReg = { reg: RegExp } & RuleItemMsg
type RuleItemValidator = { validator: (rule, value: any) => Error | void }
export type RuleItem = RuleItemRequired | RuleItemReg | RuleItemValidator

interface ValidationStrategy {
  validate(rule: RuleItem, value: any): void | string;
}

class RequiredValidationStrategy implements ValidationStrategy {
  validate (rule: RuleItemRequired, value: any): string | void {
    if (value === '') {
      return rule.message || 'Required'
    }
  }
}

class RegValidationStrategy implements ValidationStrategy {
  validate (rule: RuleItemReg, value: any): void | string {
    if (!rule.reg.test(value)) {
      return rule.message
    }
  }
}

class ValidatorValidationStrategy implements ValidationStrategy {
  validate (rule: RuleItemValidator, value: any): void | string {
    try {
      rule.validator(rule, value);
    } catch (error: any) {
      return error
    }
  }
}

export class Validator {
  protected validates: ValidationStrategy[] = []
  protected rules: RuleItem[] = []
  constructor (rules?: RuleItem[]) {
    if (rules && rules.length > 0) {
      this.add(...rules)
      this.rules = rules
    }
  }
  protected getRuleStrategy (rule: RuleItem): ValidationStrategy {
    if ((rule as RuleItemRequired).required) {
      return new RequiredValidationStrategy();
    }
    if ((rule as RuleItemReg).reg) {
      return new RegValidationStrategy();
    }
    if ((rule as RuleItemValidator).validator) {
      return new ValidatorValidationStrategy();
    }
    throw new Error('Invalid rule item');
  }
  add (...rules: RuleItem[]) {
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const validationStrategy = this.getRuleStrategy(rule);
      this.validates.push(validationStrategy)
    }
  }
  run (value) {
    let errorResult = ''
    for (let i = 0; i < this.validates.length; i++) {
      const validator = this.validates[i];
      const rule = this.rules[i]
      const errorText = validator.validate(rule, value);
      if (errorText) {
        errorResult = errorText
        break;
      }
    }
    return errorResult
  }
}
