declare type RuleItemMsg = {
    message: string;
};
declare type RuleItemRequired = {
    required: boolean;
} & Partial<RuleItemMsg>;
declare type RuleItemReg = {
    reg: RegExp;
} & RuleItemMsg;
declare type RuleItemValidator = {
    validator: (rule: any, value: any) => Error | void;
};
declare type RuleItem = RuleItemRequired | RuleItemReg | RuleItemValidator;
interface ValidationStrategy {
    validate(rule: RuleItem, value: any): void | string;
}
declare class Validator {
    protected validates: ValidationStrategy[];
    protected rules: RuleItem[];
    constructor(rules?: RuleItem[]);
    protected getRuleStrategy(rule: RuleItem): ValidationStrategy;
    add(...rules: RuleItem[]): void;
    run(value: any): string;
}

export { RuleItem, Validator };
