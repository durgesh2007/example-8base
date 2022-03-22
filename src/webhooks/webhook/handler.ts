/**
 * This file was generated using 8base CLI.
 *
 * To learn more about writing custom GraphQL resolver functions, visit
 * the 8base documentation at:
 *
 * https://docs.8base.com/docs/8base-console/custom-functions/webhooks/
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    webhook:
 *      ...
 *
 * Data that is sent to the function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * There are two ways to invoke this function locally:
 *
 *  (1) Explicit file mock file path using '-p' flag:
 *    8base invoke-local webhook -p src/resolvers/webhook/mocks/request.json
 *
 *  (2) Default mock file location using -m flag:
 *    8base invoke-local webhook -m request
 *
 *  Add new mocks to this function to test different input arguments. Mocks can easily be generated
 *  the following generator command:
 *    8base generate mock webhook -m [MOCK_FILE_NAME]
 */

import { FunctionContext, FunctionEvent } from '8base-cli-types';
import gql from 'graphql-tag';

type WebhookResult = {
  statusCode: number,
  body: any,
};

const POST_QUERY = gql`query{
  postsList{
    items{
      id
      title
      body
    }
  }
}
`

export default async (
  event: FunctionEvent,
  ctx: FunctionContext,
): Promise<WebhookResult> => {
  console.log("---> Called")
  console.log(event);
  try {
    console.log(event.body);
  } catch (error) {
    console.log(error);
  }
  // const { foo } = JSON.parse(event.body);
  let postList: any;
  try {
    postList = await ctx.api.gqlRequest(POST_QUERY, {});
  } catch (error) {
    console.log(error);
  }
  console.log(postList);
  console.log("---> Sending response")
  return {
    statusCode: 200,
    body: { postList }
  };
};
