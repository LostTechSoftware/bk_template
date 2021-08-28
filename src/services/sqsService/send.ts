import queues from '../../constants/queues'

import AWS = require('aws-sdk')
import { v4 as uuidv4 } from 'uuid'
import getRequestId from '../../getRequestId'

AWS.config.update({ region: 'us-east-2' })

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })

const sendMessage = (event: string, data: []): void => {
  const params = {
    MessageGroupId: uuidv4(),
    MessageDeduplicationId: uuidv4(),
    MessageBody: JSON.stringify({
      request_id: getRequestId(),
      event,
      data,
    }),
    QueueUrl: queues[event],
  }

  sqs.sendMessage(params, function (err, dataMessage) {
    if (err) {
      console.log('Error', err)
      throw new Error()
    } else {
      console.log('Success', dataMessage.MessageId)
    }
  })
}

export default sendMessage
