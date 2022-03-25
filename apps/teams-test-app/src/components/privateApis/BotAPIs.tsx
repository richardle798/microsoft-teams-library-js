import { bot } from '@microsoft/teams-js';
import React from 'react';

import { ApiWithoutInput, ApiWithTextInput } from '../utils';
import { SupportButton } from '../utils/SupportButton/SupportButton';

const CheckBotCapability = (): React.ReactElement =>
  SupportButton({
    name: 'checkBotCapability',
    module: 'Bot',
    isSupported: bot.isSupported(),
  });

const SendQuery = (): React.ReactElement =>
  ApiWithTextInput<bot.QueryRequest>({
    name: 'sendQuery',
    title: 'sendQuery',
    onClick: {
      validateInput: input => {
        if (!input) {
          throw new Error('botRequest is required.');
        }
      },
      submit: input => {
        return new Promise<string>(res => {
          const callback = (result: unknown): void => {
            res(JSON.stringify(result));
          };
          bot.sendQuery(input, callback, callback);
        });
      },
    },
  });

const GetSupportedCommands = (): React.ReactElement =>
  ApiWithoutInput({
    name: 'getSupportedCommands',
    title: 'getSupportedCommands',
    onClick: () => {
      return new Promise<string>(res => {
        const callback = (result: unknown): void => {
          res(JSON.stringify(result));
        };
        bot.getSupportedCommands(callback, callback);
      });
    },
  });

const Authenticate = (): React.ReactElement =>
  ApiWithTextInput<bot.AuthQueryRequest>({
    name: 'authenticate',
    title: 'authenticate',
    onClick: {
      validateInput: input => {
        if (!input) {
          throw new Error('authRequest is required.');
        }
      },
      submit: input => {
        return new Promise<string>(res => {
          const callback = (result: unknown): void => {
            res(JSON.stringify(result));
          };
          bot.authenticate(input, callback, callback);
        });
      },
    },
  });

const BotAPIs = (): React.ReactElement => (
  <>
    <h1>bot</h1>
    <CheckBotCapability />
    <SendQuery />
    <GetSupportedCommands />
    <Authenticate />
  </>
);

export default BotAPIs;