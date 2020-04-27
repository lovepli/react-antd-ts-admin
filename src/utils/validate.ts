interface IValidator {
  message: string;
  value: any;
  limit: any;
  strategy: string;
}

interface IRule {
  // 错误提示信息
  message: string;
  // 是否必填
  required?: boolean;
  // 策略类型
  type: string;
}



// 策略对象，封装校验规则
const strategies = {
  // 手机号
  mobile(value: string) {
    return /(^1[345789]\d{9}$)/.test(value);
  },
  // 电子邮箱
  email(value: string) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
  },
  // 身份证号
  IDCard(value: string) {
    return /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/.test(value);
  },
  // 最少长度
  min(value: string, limit: number) {
    return value.length >= limit;
  },
  // 最大长度
  max(value: string, limit: number) {
    return value.length <= limit;
  },
  // 是否必填
  required(value: any, limit: boolean) {
    if (!limit) {
      return true;
    };
    return value ? true : false;
  },
  // 自定义正则表达式校验
  pattern(value: string, limit: RegExp) {
    return limit.test(value);
  }
}




// 存储校验器对象
let validators: IValidator[] = [];


/**
 * 添加校验器
 * @param value{any}   要校验的值
 * @param rules{Array} 校验的规则。
 *
 */
function addValidator(value: any, rules: IRule[]) {
  rules.forEach(rule => {
    const message = rule.message;
    delete rule.message;
    let strategy = Object.keys(rule)[0];
    if (!strategy) {
      throw new Error('缺少校验类型');
    }

    if (strategy === 'type') {
      strategy = rule.type;
    }

    if (!Object.keys(strategies).includes(strategy)) {
      throw new Error(`校验器无法校验${strategy}类型`);
    }

    validators.push({
      strategy,
      value,
      message,
      limit: rule[strategy]
    })
  })
}


function validate(data: object, rules: object) {
  for (const [key, value] of Object.entries(rules)) {
    addValidator(data[key], value);
  }
  let errorMsg = '';
  validators.some(validator => {
    const { strategy, value, message, limit } = validator;
    const result = strategies[strategy](value, limit);
    if (!result) {
      errorMsg = message;
      return true;
    } else {
      return false
    }
  })
  validators = [];
  return errorMsg;
}

export default validate;
