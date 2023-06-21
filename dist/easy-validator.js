(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["easy-validator"] = {}));
})(this, (function (exports) { 'use strict';

    var RequiredValidationStrategy = /** @class */ (function () {
        function RequiredValidationStrategy() {
            this.type = '__required';
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
            this.type = '__regexp';
        }
        RegValidationStrategy.prototype.validate = function (rule, value) {
            if (!rule.reg.test(value)) {
                return rule.message || 'Invalid';
            }
        };
        return RegValidationStrategy;
    }());
    var ValidatorValidationStrategy = /** @class */ (function () {
        function ValidatorValidationStrategy() {
            this.type = '__custom';
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
        /**
         * Creates a new Validator instance.
         * @param rules An optional array of validation rules.
         */
        function Validator(rules) {
            this.validates = [];
            this.rules = [];
            if (!rules)
                return;
            if (!Array.isArray(rules)) {
                throw new Error('Invalid rules. Expected an array.');
            }
            for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                var rule = rules_1[_i];
                if (!('required' in rule) &&
                    !('reg' in rule) &&
                    !('validator' in rule) &&
                    !('type' in rule)) {
                    throw new Error('Invalid rule item. Must have a valid structure.');
                }
            }
            if (rules.length > 0) {
                this.add.apply(this, rules);
                this.rules = rules;
            }
        }
        Validator.getOrCreateStrategy = function (type) {
            var strategy = Validator.strategies.get(type);
            if (!strategy) {
                strategy = new Validator.defaultStrategies[type]();
                Validator.strategies.set(type, strategy);
            }
            return strategy;
        };
        /**
         * Adds more strategies to the Validator.
         * @param strategy The validation strategy object.
         */
        Validator.addStrategies = function () {
            var _this = this;
            var ValidationStrategy = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                ValidationStrategy[_i] = arguments[_i];
            }
            ValidationStrategy.forEach(function (strategy) {
                _this.strategies.set(strategy.type, strategy);
            });
        };
        Validator.getRuleStrategy = function (rule) {
            if (rule.required) {
                return Validator.getOrCreateStrategy('__required');
            }
            if (rule.reg) {
                return Validator.getOrCreateStrategy('__regexp');
            }
            if (rule.validator) {
                return Validator.getOrCreateStrategy('__custom');
            }
            var customStrategy = Validator.strategies.get(rule.type);
            if (customStrategy) {
                return customStrategy;
            }
            throw new Error('Invalid rule item');
        };
        /**
         * Adds one or more validation rules to the Validator.
         * @param rules The validation rules to add.
         */
        Validator.prototype.add = function () {
            var rules = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rules[_i] = arguments[_i];
            }
            for (var i = 0; i < rules.length; i++) {
                var rule = rules[i];
                var validationStrategy = Validator.getRuleStrategy(rule);
                this.validates.push(validationStrategy);
                this.rules.push(rule);
            }
        };
        /**
         * Runs the validation process on a given value.
         * @param value The value to validate.
         * @returns The validation error message, if any.
         */
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
        Validator.defaultStrategies = {
            __required: RequiredValidationStrategy,
            __regexp: RegValidationStrategy,
            __custom: ValidatorValidationStrategy
        };
        Validator.strategies = new Map();
        return Validator;
    }());

    exports.Validator = Validator;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
