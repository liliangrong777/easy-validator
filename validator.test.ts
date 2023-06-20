import { Validator, RuleItemRequired, RuleItemReg, RuleItemValidator } from './src/index.ts';

describe('Validator', () => {
  describe('add', () => {
    it('should add rules and create corresponding validation strategies', () => {
      const validator = new Validator();
      const rule1: RuleItemRequired = { required: true };
      const rule2: RuleItemReg = { reg: /^\d+$/, message: 'Invalid number' };
      const rule3: RuleItemValidator = {
        validator: (rule, value) => {
          if (value !== 'hello') {
            throw new Error('Value must be hello');
          }
        }
      };

      validator.add(rule1, rule2, rule3);

      expect(validator['validates']).toHaveLength(3);
    });

    it('should throw an error for invalid rule item', () => {
      const validator = new Validator();
      const invalidRule: any = { invalidProperty: true };

      expect(() => {
        validator.add(invalidRule);
      }).toThrowError('Invalid rule item');
    });
  });

  describe('run', () => {
    it('should return an error message for empty required value', () => {
      const validator = new Validator([{ required: true }]);
      const value = '';

      const error = validator.run(value);

      expect(error).toBe('Required');
    });

    it('should return an error message for invalid number', () => {
      const validator = new Validator([{ reg: /^\d+$/, message: 'Invalid number' }]);
      const value = 'abc';

      const error = validator.run(value);

      expect(error).toBe('Invalid number');
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

    it('should return empty string for valid value', () => {
      const validator = new Validator([{ required: true }, { reg: /^\d+$/ }]);
      const value = '123';

      const error = validator.run(value);

      expect(error).toBe('');
    });
  });
});
