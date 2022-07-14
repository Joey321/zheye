import { createApp } from 'vue'
import Message from './Message.vue'
export type MessageType = 'success' | 'error' | 'default'
// 封装函数式组件

const createMessage = (message: string, type: MessageType, timeout = 2000): void => {
  // 1.创建组件实例：createApp接收三个参数：组件对象(必须),组件的props(可选),children(可选)
  const messageInstance = createApp(Message, {
    message,
    type
  })
  // 2.组件挂载节点，时间到了卸载
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)
  setTimeout(() => {
    messageInstance.unmount()
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage
