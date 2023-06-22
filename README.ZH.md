[English](https://github.com/liliangrong777/easy-validator/blob/main/README.md) | 简体中文

# Validator

`Validator` 是一个 npm 包，提供了一个灵活且可扩展的验证框架，用于根据一组规则验证数据。它允许您使用各种策略定义验证规则，并对不同类型的数据进行验证。

## 安装

要安装 `Validator` 包，您可以使用 npm 或 yarn：

```shell
npm install js-easy-validator -S
```

或者

```shell
yarn add js-easy-validator
```

## 功能

- 使用一组预定义策略定义验证规则。
- 可扩展的架构允许添加自定义验证策略。
- 支持必填字段验证、正则表达式匹配和自定义验证函数。
- 提供简单一致的 API 用于添加规则和运行验证。

## 使用方法

### 创建 Validator

要开始使用 `Validator`，您需要通过提供一个验证规则数组来创建一个实例。每个规则使用 `RuleItem` 类型进行定义，可以是以下类型之一：

- `RuleItemRequired`：指定字段为必填项。
- `RuleItemReg`：指定字段应匹配的正则表达式模式。
- `RuleItemValidator`：指定自定义验证函数。
- `RuleItemField`：指定附加字段属性（例如消息、类型）。

示例：

```typescript
import { Validator } from "js-easy-validator";

const rules = [
  { required: true, message: "字段不能为空" },
  { reg: /^[A-Z]+$/, message: "字段应只包含大写字母" },
  {
    validator: (rule, value) =>
      value.length >= 3 ? undefined : "字段长度应至少为 3 个字符",
  },
];

const validator = new Validator(rules);
validator.run(""); //字段不能为空
validator.run("test"); //字段应只包含大写字母
validator.run("S"); //字段长度应至少为 3 个字符
validator.run("VALIDATOR"); // 校验通过返回空字符串
```

### 添加规则

您可以使用 `add` 方法将附加的规则添加到 `Validator` 实例中。这些规则将追加到现有的规则集中。

```typescript
validator.add({ required: true, message: "另一个字段是必填项" });
```

### 运行验证

要对某个值进行验证，使用 `run` 方法在 `Validator` 实例上运行验证过程。它接受一个值作为参数，并返回验证失败时的错误消息，或者在值有效时返回空字符串。

```typescript
const value = "ABC";
const errorMessage = validator.run(value);

if (errorMessage) {
  console.error(errorMessage);
} else {
  console.log("值是有效的");
}
```

### 自定义验证策略

`Validator` 支持自定义验证策略。您可以通过实现 `ValidationStrategy` 接口并提供一个唯一的 `type` 属性来创建自己的策略。然后，在创建 `Validator` 实例之前，使用 `addStrategies` 方法注册策略。

```typescript
import { ValidationStrategy, Validator } from "js-easy-validator";

class MyCustomValidationStrategy implements ValidationStrategy {
  type = "myCustomValidation";

  validate(rule, value) {
    // 自定义验证逻辑
  }
}

Validator.addStrategies(new MyCustomValidationStrategy());
```

### 可用的默认默认策略

`Validator` 提供了一组默认的验证策略，可以直接在规则中使用。以下是默认策略及其对应的类型和说明：

- `__required`: 必填字段验证策略。规则类型为 `RuleItemRequired`。如果字段的值为空字符串，则验证失败。
- `__regexp`: 正则表达式验证策略。规则类型为 `RuleItemReg`。如果字段的值不满足正则表达式模式，则验证失败。
- `__custom`: 自定义验证函数策略。规则类型为 `RuleItemValidator`。可以使用自定义的验证函数进行复杂的验证逻辑。

要使用这些默认策略，只需在规则中指定相应的类型即可。

```typescript
const rules = [
  { type: "__required", message: "字段是必填项" },
  { type: "__regexp", reg: /^[A-Z]+$/, message: "字段应只包含大写字母" },
  {
    type: "__custom",
    validator: (rule, value) =>
      value.length >= 5 ? undefined : "字段长度应至少为 5 个字符",
  },
];
```

### 添加自定义策略

除了默认策略，您还可以添加自定义的验证策略。要添加自定义策略，需要实现 `ValidationStrategy` 接口，并在创建 `Validator` 实例之前使用 `addStrategies` 方法将其注册到 `Validator` 中。

```typescript
import { ValidationStrategy, Validator } from "js-easy-validator";

class MyCustomValidationStrategy implements ValidationStrategy {
  type = "myCustomValidation";

  validate(rule, value) {
    // 自定义验证逻辑
  }
}

Validator.addStrategies(new MyCustomValidationStrategy());
```

然后，在规则中使用自定义策略的类型进行验证：

```typescript
const rules = [{ type: "myCustomValidation", message: "自定义验证失败" }];
```

## 许可证

该项目基于 MIT 许可证进行许可 - 详细信息请参阅 [LICENSE](LICENSE) 文件。

---

根据您的特定要求，随时更新 README.md 文件中的软件包名称、组织和许可证信息。
