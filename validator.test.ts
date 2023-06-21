import { Validator, RuleItem, ValidationStrategy } from './src';

describe('Validator', () => {
  describe('addStrategies', () => {
    it('should add additional strategies to the Validator', () => {
      class CustomValidationStrategy implements ValidationStrategy {
        type = 'custom';
        validate(rule: RuleItem, value: any): void | string {
          return value === 'custom' ? 'Custom validation failed' : undefined;
        }
      }

      Validator.addStrategies(new CustomValidationStrategy());

      const validator = new Validator([{ type: 'custom' }]);
      expect(validator.run('custom')).toEqual('Custom validation failed');
    });
  });

  describe('constructor', () => {
    it('should create a new Validator instance with rules', () => {
      const rules: RuleItem[] = [{ required: true }, { reg: /^\d+$/ }];

      const validator = new Validator(rules);

      expect(validator['validates'].length).toEqual(2);
      expect(validator['rules']).toEqual(rules);
    });

    it('should throw an error if invalid rules are provided', () => {
      const invalidRules: any = [{}, { required: true }, { invalidProp: true }];

      expect(() => new Validator(invalidRules)).toThrow('Invalid rule item. Must have a valid structure.');
    });
  });

  describe('add', () => {
    it('should add rules to the Validator', () => {
      const validator = new Validator();

      validator.add({ required: true }, { reg: /^\d+$/ });

      expect(validator['validates'].length).toEqual(2);
      expect(validator['rules'].length).toEqual(2);
    });
  });

  describe('run', () => {
    it('should run the validation process and return error message if validation fails', () => {
      const rules: RuleItem[] = [{ required: true }, { reg: /^\d+$/ }];
      const validator = new Validator(rules);

      expect(validator.run('')).toEqual('Required');
      expect(validator.run('abc')).toEqual('Invalid');
    });

    it('should run the validation process and return an empty string if validation passes', () => {
      const rules: RuleItem[] = [{ required: true }, { reg: /^\d+$/ }];
      const validator = new Validator(rules);

      expect(validator.run('123')).toEqual('');
    });

    it('should return an error message for custom validation', () => {
      const validator = new Validator([
        {
          validator: (rule, value) => {
            if (value !== 'hello') {
              throw 'Value must be hello';
            }
          }
        }
      ]);
      const value = 'world';

      const error = validator.run(value);

      expect(error).toBe('Value must be hello');
    });

    it('should return an empty string if no rules are added', () => {
      const validator = new Validator();

      expect(validator.run('value')).toEqual('');
    });

    it('should throw an error if the rule item is invalid', () => {
      const validator = new Validator();
      const invalidRule: any = { invalidProp: true };

      expect(() => validator.add(invalidRule)).toThrow('Invalid rule item');
    });

    it('should return the error message from custom validation strategy', () => {
      class CustomValidationStrategy implements ValidationStrategy {
        type = 'custom';
        validate(rule: RuleItem, value: any): void | string {
          return 'Custom validation failed';
        }
      }

      Validator.addStrategies(new CustomValidationStrategy());

      const validator = new Validator([{ type: 'custom' }]);
      expect(validator.run('value')).toEqual('Custom validation failed');
    });
  });
});
