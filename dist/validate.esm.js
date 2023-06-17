var RequiredValidationStrategy = /** @class */ (function () {
    function RequiredValidationStrategy() {
    }
    RequiredValidationStrategy.prototype.validate = function (rule, value) {
        if (value === '') {
            return rule.message || 'Required';
        }
    };
    return RequiredValidationStrategy;
}());
var RegValidationStrategy = /** @class */ (function () {
    function RegValidationStrategy() {
    }
    RegValidationStrategy.prototype.validate = function (rule, value) {
        if (rule.reg.test(value)) {
            return rule.message;
        }
    };
    return RegValidationStrategy;
}());
var ValidatorValidationStrategy = /** @class */ (function () {
    function ValidatorValidationStrategy() {
    }
    ValidatorValidationStrategy.prototype.validate = function (rule, value) {
        try {
            rule.validator(rule, value);
        }
        catch (error) {
            return error;
        }
    };
    return ValidatorValidationStrategy;
}());
var Validator = /** @class */ (function () {
    function Validator(rules) {
        this.validates = [];
        this.rules = [];
        if (rules && rules.length > 0) {
            this.add.apply(this, rules);
            this.rules = rules;
        }
    }
    Validator.prototype.getRuleStrategy = function (rule) {
        if (rule.required) {
            return new RequiredValidationStrategy();
        }
        if (rule.reg) {
            return new RegValidationStrategy();
        }
        if (rule.validator) {
            return new ValidatorValidationStrategy();
        }
        throw new Error('Invalid rule item');
    };
    Validator.prototype.add = function () {
        var rules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rules[_i] = arguments[_i];
        }
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            var validationStrategy = this.getRuleStrategy(rule);
            this.validates.push(validationStrategy);
        }
    };
    Validator.prototype.run = function (value) {
        var errorResult = '';
        for (var i = 0; i < this.validates.length; i++) {
            var validator = this.validates[i];
            var rule = this.rules[i];
            var errorText = validator.validate(rule, value);
            if (errorText) {
                errorResult = errorText;
                break;
            }
        }
        return errorResult;
    };
    return Validator;
}());

export { Validator };
