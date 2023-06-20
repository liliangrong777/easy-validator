# Validator

Validator 是一个用于值验证的 JavaScript 类。它提供了一种灵活的方式来定义验证规则，并根据这些规则对值进行验证。

## 功能

Validator 类具有以下功能：

- 支持多种验证规则类型：Validator 支持三种验证规则类型：RuleItemRequired、RuleItemReg、RuleItemValidator 和 RuleItemEmail。每种规则类型都有不同的验证策略和属性。

- 可自定义验证规则：可以根据需求定义自己的验证规则，并使用自定义的验证策略函数进行验证。

- 添加和执行验证规则：可以通过 add 方法向验证器添加验证规则，并使用 run 方法执行验证过程。验证器将根据添加的规则顺序依次验证值，并返回第一个不满足规则的错误消息。

- 高度可扩展性：Validator 的设计允许轻松添加新的验证规则和验证策略，以满足不同的验证需求。

## 使用示例

下面是一些使用 Validator 的示例：

```javascript
import { Validator, RuleItemRequired, RuleItemReg, RuleItemValidator, RuleItemEmail } from 'validator';

// 创建一个验证器实例
const validator = new Validator();

// 定义验证规则
const rules = [
  { required: true, message: '请输入姓名' } as RuleItemRequired,
  { reg: /^\d{4}$/, message: '请输入四位数字' } as RuleItemReg,
  { validator: (rule, value) => {
      if (value !== 'hello') {
        throw new Error('Value must be "hello"');
      }
    },
    message: 'Value validation failed'
  } as RuleItemValidator,
  { email: true, message: '请输入有效的邮箱' } as RuleItemEmail,
];

// 将规则添加到验证器
validator.add(...rules);

// 需要验证的值
const value = '12345';

// 执行验证
const error = validator.run(value);

if (error) {
  console.log('验证未通过:', error);
} else {
  console.log('验证通过');
}
```

安装
可以使用 npm 或 yarn 安装 Validator：
npm install validator
或者
yarn add validator
API
Validator
Validator 类是主要的验证器类，用于创建和执行验证过程。

构造函数
new Validator(rules?: RuleItem[])
创建一个 Validator 实例。

rules (可选)：初始的验证规则数组。
方法
add(...rules: RuleItem[]): void
向验证器添加验证规则。

rules：要添加的验证规则。
run(value: any): string | void
执行验证过程，对给定的值进行验证。

value：要验证的值。
返回第一个不满足规则的错误消息，如果所有规则都通过验证，则返回 undefined。

Contributing
欢迎贡献代码、提出问题和建议
