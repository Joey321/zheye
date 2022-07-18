// 定义检查条件
export interface CheckCondition {
  // 文件格式
  format?: string[];
  // 文件大小
  size?: number;
}
// 定义返回错误类型
type ErrorType = 'format' | 'size' | null;
// 验证通用函数
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function beforeUploadCheck (file: File, condition: CheckCondition) {
  const { format, size } = condition
  console.log(file, '2222222222')
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? (file.size / 1024 / 1024 < size) : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidFormat && isValidSize,
    error
  }
}
