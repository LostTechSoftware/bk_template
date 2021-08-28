import AWS from 'aws-sdk'
import { Consumer } from 'sqs-consumer'
import validatorJson from '../../validator/validatorJson'
import logs from '../../logs'

AWS.config.update({ region: 'us-east-2' })
const sqs = new AWS.SQS({ apiVersion: '2012-11-05', region: 'us-east-2' })

export default {
  backofficeConsumer: (): void => {
    const queueUrl = process.env.AWS_QUEUE

    const consumer = Consumer.create({
      queueUrl,
      sqs,
      handleMessage: async (message) => {
        logs.info(message.Body)

        const orderData = validatorJson(message.Body) && JSON.parse(message.Body)

        logs.info(orderData.event + orderData.message)

        const deleteParams = {
          QueueUrl: queueUrl,
          ReceiptHandle: message.ReceiptHandle,
        }
        sqs.deleteMessage(deleteParams, function (error, data) {
          if (error) {
            logs.info('Delete Error')
            logs.error(logs.beautify(error))
          } else {
            logs.info(`Message Deleted ${data}`)
            logs.info(logs.beautify(data))
          }
        })
      },
    })

    consumer.on('error', (err) => {
      logs.error(err.message)
    })

    consumer.on('processing_error', (err) => {
      logs.error(err.message)
    })

    consumer.on('timeout_error', (err) => {
      logs.error(err.message)
    })

    consumer.start()

    logs.info(`Queue ${queueUrl} initiated`)
  },
}
