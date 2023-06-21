English | [简体中文](https://github.com/liliangrong777/easy-validator/blob/main/README.ZH.md)

# Validator

`Validator` is an npm package that provides a flexible and extensible validation framework for validating data based on a set of rules. It allows you to define validation rules using various strategies and perform validation on different types of data.

## Installation

To install the `Validator` package, you can use npm or yarn:

```shell
npm install @your-organization/validator
```

or

```shell
yarn add @your-organization/validator
```

## Features

- Define validation rules using a set of predefined strategies.
- Extensible architecture allows adding custom validation strategies.
- Supports required field validation, regular expression pattern matching, and custom validation functions.
- Provides a simple and consistent API for adding rules and running validations.

## Usage

### Creating a Validator

To start using the `Validator`, you need to create an instance by providing an array of validation rules. Each rule is defined using the `RuleItem` type, which can be one of the following:

- `RuleItemRequired`: Specifies that a field is required.
- `RuleItemReg`: Specifies a regular expression pattern that the field should match.
- `RuleItemValidator`: Specifies a custom validation function.
- `RuleItemField`: Specifies additional field properties (e.g., message, type).

Example:

```typescript
import { Validator } from "@your-organization/validator";

const rules = [
  { required: true, message: "Field is required" },
  { reg: /^[A-Z]+$/, message: "Field should contain uppercase letters only" },
  {
    validator: (rule, value) =>
      value.length >= 5 ? undefined : "Field should have at least 5 characters",
  },
];

const validator = new Validator(rules);
```

### Adding Rules

You can add additional rules to the `Validator` instance using the `add` method. The rules will be appended to the existing set of rules.

```typescript
validator.add({ required: true, message: "Another field is required" });
```

### Running Validations

To perform validations on a value, use the `run` method of the `Validator` instance. It takes the value as an argument and returns an error message if validation fails, or an empty string if the value is valid.

```typescript
const value = "ABC";
const errorMessage = validator.run(value);

if (errorMessage) {
  console.error(errorMessage);
} else {
  console.log("Value is valid");
}
```

### Custom Validation Strategies

The `Validator` supports custom validation strategies. You can create your own strategy by implementing the `ValidationStrategy` interface and providing a unique `type` property. Then, register the strategy using the `addStrategies` method before creating a `Validator` instance.

```typescript
import { ValidationStrategy, Validator } from "@your-organization/validator";

class MyCustomValidationStrategy implements ValidationStrategy {
  type = "myCustomValidation";

  validate(rule, value) {
    // Custom validation logic
  }
}

Validator.addStrategies(new MyCustomValidationStrategy());
```

### Available Default Strategies

The `Validator` package comes with the following default validation strategies:

- `__required`: Checks if the field is required.
- `__regexp`: Validates the field against a regular expression pattern.
- `__custom`: Executes a custom validation function.

### Extending the Default Strategies

You can extend the default strategies by subclassing the existing validation strategy classes. Override the `validate` method with your custom validation logic, and register the new strategy using the `addStrategies` method.

## API Reference

### `Validator`

The main class representing the validator.

#### `constructor(rules?: RuleItem[])`

Creates a new `Validator` instance with optional initial validation rules.

```typescript
rules?: RuleItem[] // An optional array of validation rules.
```

#### `add(...rules: RuleItem[])`

Adds one or more validation rules to the `Validator`.```typescript
rules?: RuleItem[] // An optional array of validation rules.

````

#### `add(...rules: RuleItem[])`

Adds one or more validation rules to the `Validator`.

- `...rules` (Rest parameter): The validation rules to add.

#### `run(value: any): string`

Runs the validation process on a given value and returns the validation error message, if any.

- `value`: The value to validate.

### `RuleItem`

The type representing a validation rule item.

#### `RuleItemRequired`

Represents a required field validation rule.

```typescript
{
  required: boolean; // Indicates if the field is required.
  message?: string; // Optional error message for the validation rule.
}
````

#### `RuleItemReg`

Represents a regular expression pattern validation rule.

```typescript
{
  reg: RegExp; // The regular expression pattern to match against.
  message?: string; // Optional error message for the validation rule.
}
```

#### `RuleItemValidator`

Represents a custom validation function rule.

```typescript
{
  validator: (rule: RuleItem, value: any) => Error | void; // The custom validation function.
}
```

#### `RuleItemField`

Represents additional field properties for a rule.

```typescript
{
  message?: string; // Optional error message for the validation rule.
  type?: string; // Optional field type for custom validation strategies.
}
```

### `ValidationStrategy`

The interface representing a validation strategy.

#### `type: string`

A unique identifier for the validation strategy.

#### `validate(rule: RuleItem, value: any): void | string`

Performs the validation based on the provided rule and value. It returns `void` if the validation is successful or a validation error message as a `string` if the validation fails.

### `Validator.defaultStrategies`

A static property containing the default validation strategies provided by the package.

### `Validator.addStrategies(...ValidationStrategy: ValidationStrategy[])`

Adds additional validation strategies to the `Validator`.

- `...ValidationStrategy` (Rest parameter): The validation strategies to add.

## Examples

### Example 1: Basic Usage

```typescript
import { Validator } from "@your-organization/validator";

const rules = [
  { required: true, message: "Field is required" },
  { reg: /^[A-Z]+$/, message: "Field should contain uppercase letters only" },
];

const validator = new Validator(rules);

const value = "ABC";
const errorMessage = validator.run(value);

if (errorMessage) {
  console.error(errorMessage);
} else {
  console.log("Value is valid");
}
```

### Example 2: Custom Validation Strategy

```typescript
import { Validator, ValidationStrategy } from "@your-organization/validator";

class MyCustomValidationStrategy implements ValidationStrategy {
  type = "myCustomValidation";

  validate(rule, value) {
    // Custom validation logic
  }
}

Validator.addStrategies(new MyCustomValidationStrategy());

const rules = [
  { type: "myCustomValidation", message: "Custom validation failed" },
];

const validator = new Validator(rules);

const value = "ABC";
const errorMessage = validator.run(value);

if (errorMessage) {
  console.error(errorMessage);
} else {
  console.log("Value is valid");
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This package is based on the validation framework developed by OpenAI.

---

Feel free to update the package name, organization, and license information in the README.md file according to your specific requirements.```typescript
rules?: RuleItem[] // An optional array of validation rules.

````

#### `add(...rules: RuleItem[])`

Adds one or more validation rules to the `Validator`.

- `...rules` (Rest parameter): The validation rules to add.

#### `run(value: any): string`

Runs the validation process on a given value and returns the validation error message, if any.

- `value`: The value to validate.

### `RuleItem`

The type representing a validation rule item.

#### `RuleItemRequired`

Represents a required field validation rule.

```typescript
{
  required: boolean; // Indicates if the field is required.
  message?: string; // Optional error message for the validation rule.
}
````

#### `RuleItemReg`

Represents a regular expression pattern validation rule.

```typescript
{
  reg: RegExp; // The regular expression pattern to match against.
  message?: string; // Optional error message for the validation rule.
}
```

#### `RuleItemValidator`

Represents a custom validation function rule.

```typescript
{
  validator: (rule: RuleItem, value: any) => Error | void; // The custom validation function.
}
```

#### `RuleItemField`

Represents additional field properties for a rule.

```typescript
{
  message?: string; // Optional error message for the validation rule.
  type?: string; // Optional field type for custom validation strategies.
}
```

### `ValidationStrategy`

The interface representing a validation strategy.

#### `type: string`

A unique identifier for the validation strategy.

#### `validate(rule: RuleItem, value: any): void | string`

Performs the validation based on the provided rule and value. It returns `void` if the validation is successful or a validation error message as a `string` if the validation fails.

### `Validator.defaultStrategies`

A static property containing the default validation strategies provided by the package.

### `Validator.addStrategies(...ValidationStrategy: ValidationStrategy[])`

Adds additional validation strategies to the `Validator`.

- `...ValidationStrategy` (Rest parameter): The validation strategies to add.

## Examples

### Example 1: Basic Usage

```typescript
import { Validator } from "@your-organization/validator";

const rules = [
  { required: true, message: "Field is required" },
  { reg: /^[A-Z]+$/, message: "Field should contain uppercase letters only" },
];

const validator = new Validator(rules);

const value = "ABC";
const errorMessage = validator.run(value);

if (errorMessage) {
  console.error(errorMessage);
} else {
  console.log("Value is valid");
}
```

### Example 2: Custom Validation Strategy

```typescript
import { Validator, ValidationStrategy } from "@your-organization/validator";

class MyCustomValidationStrategy implements ValidationStrategy {
  type = "myCustomValidation";

  validate(rule, value) {
    // Custom validation logic
  }
}

Validator.addStrategies(new MyCustomValidationStrategy());

const rules = [
  { type: "myCustomValidation", message: "Custom validation failed" },
];

const validator = new Validator(rules);

const value = "ABC";
const errorMessage = validator.run(value);

if (errorMessage) {
  console.error(errorMessage);
} else {
  console.log("Value is valid");
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This package is based on the validation framework developed by OpenAI.

---

Feel free to update the package name, organization, and license information in the README.md file according to your specific requirements.```typescript
rules?: RuleItem[] // An optional array of validation rules.

````

#### `add(...rules: RuleItem[])`

Adds one or more validation rules to the `Validator`.

- `...rules` (Rest parameter): The validation rules to add.

#### `run(value: any): string`

Runs the validation process on a given value and returns the validation error message, if any.

- `value`: The value to validate.

### `RuleItem`

The type representing a validation rule item.

#### `RuleItemRequired`

Represents a required field validation rule.

```typescript
{
  required: boolean; // Indicates if the field is required.
  message?: string; // Optional error message for the validation rule.
}
````

#### `RuleItemReg`

Represents a regular expression pattern validation rule.

```typescript
{
  reg: RegExp; // The regular expression pattern to match against.
  message?: string; // Optional error message for the validation rule.
}
```

#### `RuleItemValidator`

Represents a custom validation function rule.

```typescript
{
  validator: (rule: RuleItem, value: any) => Error | void; // The custom validation function.
}
```

#### `RuleItemField`

Represents additional field properties for a rule.

```typescript
{
  message?: string; // Optional error message for the validation rule.
  type?: string; // Optional field type for custom validation strategies.
}
```

### `ValidationStrategy`

The interface representing a validation strategy.

#### `type: string`

A unique identifier for the validation strategy.

#### `validate(rule: RuleItem, value: any): void | string`

Performs the validation based on the provided rule and value. It returns `void` if the validation is successful or a validation error message as a `string` if the validation fails.

### `Validator.defaultStrategies`

A static property containing the default validation strategies provided by the package.

### `Validator.addStrategies(...ValidationStrategy: ValidationStrategy[])`

Adds additional validation strategies to the `Validator`.

- `...ValidationStrategy` (Rest parameter): The validation strategies to add.

## Examples

### Example 1: Basic Usage

```typescript
import { Validator } from "@your-organization/validator";

const rules = [
  { required: true, message: "Field is required" },
  { reg: /^[A-Z]+$/, message: "Field should contain uppercase letters only" },
];

const validator = new Validator(rules);

const value = "ABC";
const errorMessage = validator.run(value);

if (errorMessage) {
  console.error(errorMessage);
} else {
  console.log("Value is valid");
}
```

### Example 2: Custom Validation Strategy

```typescript
import { Validator, ValidationStrategy } from "@your-organization/validator";

class MyCustomValidationStrategy implements ValidationStrategy {
  type = "myCustomValidation";

  validate(rule, value) {
    // Custom validation logic
  }
}

Validator.addStrategies(new MyCustomValidationStrategy());

const rules = [
  { type: "myCustomValidation", message: "Custom validation failed" },
];

const validator = new Validator(rules);

const value = "ABC";
const errorMessage = validator.run(value);

if (errorMessage) {
  console.error(errorMessage);
} else {
  console.log("Value is valid");
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This package is based on the validation framework developed by OpenAI.

---

Feel free to update the package name, organization, and license information in the README.md file according to your specific requirements.```typescript
rules?: RuleItem[] // An optional array of validation rules.

````

#### `add(...rules: RuleItem[])`

Adds one or more validation rules to the `Validator`.

- `...rules` (Rest parameter): The validation rules to add.

#### `run(value: any): string`

Runs the validation process on a given value and returns the validation error message, if any.

- `value`: The value to validate.

### `RuleItem`

The type representing a validation rule item.

#### `RuleItemRequired`

Represents a required field validation rule.

```typescript
{
  required: boolean; // Indicates if the field is required.
  message?: string; // Optional error message for the validation rule.
}
````

#### `RuleItemReg`

Represents a regular expression pattern validation rule.

```typescript
{
  reg: RegExp; // The regular expression pattern to match against.
  message?: string; // Optional error message for the validation rule.
}
```

#### `RuleItemValidator`

Represents a custom validation function rule.

```typescript
{
  validator: (rule: RuleItem, value: any) => Error | void; // The custom validation function.
}
```

#### `RuleItemField`

Represents additional field properties for a rule.

```typescript
{
  message?: string; // Optional error message for the validation rule.
  type?: string; // Optional field type for custom validation strategies.
}
```

### `ValidationStrategy`

The interface representing a validation strategy.

#### `type: string`

A unique identifier for the validation strategy.

#### `validate(rule: RuleItem, value: any): void | string`

Performs the validation based on the provided rule and value. It returns `void` if the validation is successful or a validation error message as a `string` if the validation fails.

### `Validator.defaultStrategies`

A static property containing the default validation strategies provided by the package.

### `Validator.addStrategies(...ValidationStrategy: ValidationStrategy[])`

Adds additional validation strategies to the `Validator`.

- `...ValidationStrategy` (Rest parameter): The validation strategies to add.

## Examples

### Example 1: Basic Usage

```typescript
import { Validator } from "@your-organization/validator";

const rules = [
  { required: true, message: "Field is required" },
  { reg: /^[A-Z]+$/, message: "Field should contain uppercase letters only" },
];

const validator = new Validator(rules);

const value = "ABC";
const errorMessage = validator.run(value);

if (errorMessage) {
  console.error(errorMessage);
} else {
  console.log("Value is valid");
}
```

### Example 2: Custom Validation Strategy

```typescript
import { Validator, ValidationStrategy } from "@your-organization/validator";

class MyCustomValidationStrategy implements ValidationStrategy {
  type = "myCustomValidation";

  validate(rule, value) {
    // Custom validation logic
  }
}

Validator.addStrategies(new MyCustomValidationStrategy());

const rules = [
  { type: "myCustomValidation", message: "Custom validation failed" },
];

const validator = new Validator(rules);

const value = "ABC";
const errorMessage = validator.run(value);

if (errorMessage) {
  console.error(errorMessage);
} else {
  console.log("Value is valid");
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This package is based on the validation framework developed by OpenAI.

---

Feel free to update the package name, organization, and license information in the README.md file according to your specific requirements.

- `...rules` (Rest parameter): The validation rules to add.

#### `run(value: any): string`

Runs the validation process on a given value and returns the validation error message, if any.

- `value`: The value to validate.

### `RuleItem`

The type representing a validation rule item.

#### `RuleItemRequired`

Represents a required field validation rule.

```typescript
{
  required: boolean; // Indicates if the field is required.
  message?: string; // Optional error message for the validation rule.
}
```

#### `RuleItemReg`

Represents a regular expression pattern validation rule.

```typescript
{
  reg: RegExp; // The regular expression pattern to match against.
  message?: string; // Optional error message for the validation rule.
}
```

#### `RuleItemValidator`

Represents a custom validation function rule.

```typescript
{
  validator: (rule: RuleItem, value: any) => Error | void; // The custom validation function.
}
```

#### `RuleItemField`

Represents additional field properties for a rule.

```typescript
{
  message?: string; // Optional error message for the validation rule.
  type?: string; // Optional field type for custom validation strategies.
}
```

### `ValidationStrategy`

The interface representing a validation strategy.

#### `type: string`

A unique identifier for the validation strategy.

#### `validate(rule: RuleItem, value: any): void | string`

Performs the validation based on the provided rule and value. It returns `void` if the validation is successful or a validation error message as a `string` if the validation fails.

### `Validator.defaultStrategies`

A static property containing the default validation strategies provided by the package.

### `Validator.addStrategies(...ValidationStrategy: ValidationStrategy[])`

Adds additional validation strategies to the `Validator`.

- `...ValidationStrategy` (Rest parameter): The validation strategies to add.

## Examples

### Example 1: Basic Usage

```typescript
import { Validator } from "@your-organization/validator";

const rules = [
  { required: true, message: "Field is required" },
  { reg: /^[A-Z]+$/, message: "Field should contain uppercase letters only" },
];

const validator = new Validator(rules);

const value = "ABC";
const errorMessage = validator.run(value);

if (errorMessage) {
  console.error(errorMessage);
} else {
  console.log("Value is valid");
}
```

### Example 2: Custom Validation Strategy

```typescript
import { Validator, ValidationStrategy } from "@your-organization/validator";

class MyCustomValidationStrategy implements ValidationStrategy {
  type = "myCustomValidation";

  validate(rule, value) {
    // Custom validation logic
  }
}

Validator.addStrategies(new MyCustomValidationStrategy());

const rules = [
  { type: "myCustomValidation", message: "Custom validation failed" },
];

const validator = new Validator(rules);

const value = "ABC";
const errorMessage = validator.run(value);

if (errorMessage) {
  console.error(errorMessage);
} else {
  console.log("Value is valid");
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to update the package name, organization, and license information in the README.md file according to your specific requirements.
