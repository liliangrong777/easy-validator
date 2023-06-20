# Validator

Validator is a JavaScript class for value validation. It provides a flexible way to define validation rules and validate values based on those rules.

## Features

Validator class offers the following features:

- Supports multiple validation rule types: Validator supports four validation rule types: RuleItemRequired, RuleItemReg, RuleItemValidator, and RuleItemEmail. Each rule type has different validation strategies and properties.

- Customizable validation rules: You can define your own validation rules based on your requirements and use custom validation strategy functions for validation.

- Adding and executing validation rules: You can add validation rules to the validator using the add method and perform validation using the run method. The validator will sequentially validate the value based on the added rules and return the first error message for the rule that fails validation.

- Highly extensible: The design of Validator allows easy addition of new validation rules and strategies to meet different validation needs.

## Usage Example

Here are some examples of using Validator:

```javascript
import { Validator, RuleItemRequired, RuleItemReg, RuleItemValidator, RuleItemEmail } from 'validator';

// Create a validator instance
const validator = new Validator();

// Define validation rules
const rules = [
  { required: true, message: 'Please enter your name' } as RuleItemRequired,
  { reg: /^\d{4}$/, message: 'Please enter a four-digit number' } as RuleItemReg,
  { validator: (rule, value) => {
      if (value !== 'hello') {
        throw new Error('Value must be "hello"');
      }
    },
    message: 'Value validation failed'
  } as RuleItemValidator,
  { email: true, message: 'Please enter a valid email address' } as RuleItemEmail,
];

// Add rules to the validator
validator.add(...rules);

// Value to be validated
const value = '12345';

// Perform validation
const error = validator.run(value);

if (error) {
  console.log('Validation failed:', error);
} else {
  console.log('Validation passed');
}
```

Installation
You can install Validator using npm or yarn:

shell
Copy code
npm install validator
or

shell
Copy code
yarn add validator
API
Validator
Validator is the main validator class used for creating and executing the validation process.

Constructor
new Validator(rules?: RuleItem[])
Creates a new instance of Validator.

rules (optional): An array of initial validation rules.
Methods
add(...rules: RuleItem[]): void
Adds validation rules to the validator.

rules: The validation rules to be added.
run(value: any): string | void
Executes the validation process for the given value.

value: The value to be validated.
Returns the first error message for the rule that fails validation. If all rules pass validation, it returns undefined.

Contributing
Contributions, questions, and suggestions are welcome. Please refer to the contributing guidelines for more information.

License
This project is licensed under the MIT License. See the LICENSE file for details.

python
Copy code

Apologies for any inconvenience caused earlier. This version provides the same content as the previous one, but in English.
