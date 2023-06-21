declare type RuleItemField = {
    message?: string;
    type?: string;
};
declare type RuleItemRequired = {
    required: boolean;
    message?: string;
};
declare type RuleItemReg = {
    reg: RegExp;
    message?: string;
};
declare type RuleItemValidator = {
    validator: (rule: any, value: any) => string | void;
};
declare type RuleItem = RuleItemRequired | RuleItemReg | RuleItemValidator | RuleItemField;
interface ValidationStrategy {
    type: string;
    validate(rule: RuleItem, value: any): void | string;
}
declare class RequiredValidationStrategy implements ValidationStrategy {
    type: string;
    validate(rule: RuleItemRequired, value: any): string | void;
}
declare class RegValidationStrategy implements ValidationStrategy {
    type: string;
    validate(rule: RuleItemReg, value: any): void | string;
}
declare class ValidatorValidationStrategy implements ValidationStrategy {
    type: string;
    validate(rule: RuleItemValidator, value: any): void | string;
}
declare class Validator {
    protected validates: ValidationStrategy[];
    rules: RuleItem[];
    protected static defaultStrategies: {
        __required: typeof RequiredValidationStrategy;
        __regexp: typeof RegValidationStrategy;
        __custom: typeof ValidatorValidationStrategy;
    };
    protected static strategies: Map<string, ValidationStrategy>;
    protected static getOrCreateStrategy(type: keyof typeof Validator['defaultStrategies']): ValidationStrategy;
    /**
     * Adds more strategies to the Validator.
     * @param strategy The validation strategy object.
     */
    static addStrategies(...ValidationStrategy: ValidationStrategy[]): void;
    /**
     * Creates a new Validator instance.
     * @param rules An optional array of validation rules.
     */
    constructor(rules?: RuleItem[]);
    protected static getRuleStrategy(rule: RuleItem): ValidationStrategy;
    /**
     * Adds one or more validation rules to the Validator.
     * @param rules The validation rules to add.
     */
    add(...rules: RuleItem[]): void;
    /**
     * Runs the validation process on a given value.
     * @param value The value to validate.
     * @returns The validation error message, if any.
     */
    run(value: any): string;
}

export { RuleItem, ValidationStrategy, Validator };
