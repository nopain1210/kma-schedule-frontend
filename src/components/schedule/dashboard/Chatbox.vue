<template>
  <div>
    <beautiful-chat
      :participants="participants"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :icons="icons"
      :open="openChat"
      :showEmoji="false"
      :showFile="false"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
    >
      <template v-slot:header>
        <div class="d-flex align-center ml-6 subtitle-1">
          Chatbot
        </div>
      </template>
      <template v-slot:text-message-body="{ message }">
        <span v-html="message.data.text" v-if="message.author === 'bot'"> </span>
        <span v-else v-text="message.data.text"></span>
      </template>
    </beautiful-chat>
  </div>
</template>

<script>
  import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png'
  import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg'
  import FileIcon from 'vue-beautiful-chat/src/assets/file.svg'
  import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg'
  import api from '../../../utils/api'

  export default {
    name: 'app',
    data () {
      return {
        haha: 'hihi<br/> haha',
        icons: {
          open: {
            img: OpenIcon,
            name: 'default',
          },
          close: {
            img: CloseIcon,
            name: 'default',
          },
          file: {
            img: FileIcon,
            name: 'default',
          },
          closeSvg: {
            img: CloseIconSvg,
            name: 'default',
          },
        },
        participants: [
          {
            id: 'bot',
            name: 'Bot',
            imageUrl: 'https://avatars1.githubusercontent.com/u/52101938?v=4'
          }
        ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
        messageList: [
          { type: 'text', author: `bot`, data: { text: `Xin chào, bạn có thể hỏi tôi về thời khóa biểu của bạn.` } }
        ], // the list of the messages to show, can be paginated and adjusted dynamically
        newMessagesCount: 0,
        isChatOpen: false, // to determine whether the chat window should be open or closed
        showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
        colors: {
          header: {
            bg: '#3F51B5',
            text: '#ffffff'
          },
          launcher: {
            bg: '#3F51B5'
          },
          messageList: {
            bg: '#ffffff'
          },
          sentMessage: {
            bg: '#3F51B5',
            text: '#ffffff'
          },
          receivedMessage: {
            bg: '#eaeaea',
            text: '#222222'
          },
          userInput: {
            bg: '#f4f7f9',
            text: '#565867'
          }
        }, // specifies the color scheme for the component
        alwaysScrollToBottom: true, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
        messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
      }
    },
    methods: {
      sendMessage (text) {
        if (text.length > 0) {
          this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
          this.onMessageWasSent({ author: 'me', type: 'text', data: { text } })
        }
      },
      onMessageWasSent (message) {
        // called when the user sends a message
        this.messageList = [...this.messageList, message]
        this.showTypingIndicator = 'bot'
        api.get(encodeURI('/api/wit/message?q=' + message.data.text))
          .then(response => {
            this.messageList = [...this.messageList, ...response.data]
          }).catch((err) => {
            this.messageList = [...this.messageList, {
              type: 'text',
              author: 'bot',
              data: {
                text: 'Xin lỗi, dường như đã xảy ra lỗi gì đó. Vui lòng thử lại.'
              }
            }]
        }).finally(() => {
          this.showTypingIndicator = ''
        })
      },
      openChat () {
        // called when the user clicks on the fab button to open the chat
        this.isChatOpen = true
        this.newMessagesCount = 0
      },
      closeChat () {
        // called when the user clicks on the botton to close the chat
        this.isChatOpen = false
      },
      handleScrollToTop () {
        // called when the user scrolls message list to top
        // leverage pagination for loading another page of messages
      },
      handleOnType () {
        console.log('Emit typing event')
      },
      editMessage (message) {
        const m = this.messageList.find(m => m.id === message.id)
        m.isEdited = true
        m.data.text = message.data.text
      }
    }
  }
</script>

<style lang="scss">
  .sc-chat-window {
    z-index: 1000;
  }

  .sc-launcher {
    z-index: 999;
    bottom: 50px !important;

    & > * {
      bottom: 50px !important;
    }
  }
</style>
