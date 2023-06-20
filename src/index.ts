type RuleItemField = { message?: string,type?:string }
type RuleItemRequired = { required: boolean } & RuleItemField
type RuleItemReg = { reg: RegExp } & RuleItemField
type RuleItemValidator = { validator: (rule, value: any) => Error | void }
export type RuleItem = RuleItemRequired | RuleItemReg | RuleItemValidator | RuleItemField

interface ValidationStrategy {
  type:string;
  validate(rule: RuleItem, value: any): void | string;
}

class RequiredValidationStrategy implements ValidationStrategy {
  type = 'required'
  validate (rule: RuleItemRequired, value: any): string | void {
    if (value === '') {
      return rule.message || 'Required'
    }
  }
}

class RegValidationStrategy implements ValidationStrategy {
  type = 'regexp'
  validate (rule: RuleItemReg, value: any): void | string {
    if (!rule.reg.test(value)) {
      return rule.message || 'Invalid'
    }
  }
}

class ValidatorValidationStrategy implements ValidationStrategy {
  type = 'custom'
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
  protected static defaultStrategies = {
    required:RequiredValidationStrategy,
    regexp:RegValidationStrategy,
    custom:ValidatorValidationStrategy
  }
  protected static strategies = new Map<string, ValidationStrategy>();
  protected static getOrCreateStrategy (type: 'required' | 'regexp' | 'custom'): ValidationStrategy {
    let strategy = Validator.strategies.get(type);
    if(!strategy) {
      strategy = new Validator.defaultStrategies[type]()
      Validator.strategies.set(type, strategy)
    }
    return strategy
  }
  /**
   * Adds more strategies to the Validator.
   * @param strategy The validation strategy object.
   */
  static addStrategies (...ValidationStrategy:ValidationStrategy[]) {
    ValidationStrategy.forEach(strategy=>{
      this.strategies.set(strategy.type,strategy)
    })
  }
  /**
   * Creates a new Validator instance.
   * @param rules An optional array of validation rules.
   */
  constructor (rules?: RuleItem[]) {
    if (!Array.isArray(rules)) {
      throw new Error('Invalid rules. Expected an array.');
    }
    for (const rule of rules) {
      if (
        !('required' in rule) &&
        !('reg' in rule) &&
        !('validator' in rule) &&
        !('type' in rule)
      ) {
        throw new Error('Invalid rule item. Must have a valid structure.');
      }
    }
    if (rules && rules.length > 0) {
      this.add(...rules)
      this.rules = rules
    }
  }
  protected static getRuleStrategy (rule: RuleItem): ValidationStrategy {
    if ((rule as RuleItemRequired).required) {
      return Validator.getOrCreateStrategy('required');
    }
    if ((rule as RuleItemReg).reg) {
      return Validator.getOrCreateStrategy('regexp');
    }
    if ((rule as RuleItemValidator).validator) {
      return Validator.getOrCreateStrategy('custom');
    }
    const customStrategy = Validator.strategies.get((rule as RuleItemField).type)
    if(customStrategy) {
      return customStrategy
    }
    throw new Error('Invalid rule item');
  }
  /**
   * Adds one or more validation rules to the Validator.
   * @param rules The validation rules to add.
   */
  add (...rules: RuleItem[]) {
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const validationStrategy = Validator.getRuleStrategy(rule);
      this.validates.push(validationStrategy)
    }
  }
  /**
   * Runs the validation process on a given value.
   * @param value The value to validate.
   * @returns The validation error message, if any.
   */
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
