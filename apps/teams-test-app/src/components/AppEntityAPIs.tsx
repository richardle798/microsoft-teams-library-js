import { app, appEntity, SdkError } from '@microsoft/teams-js';
import React, { ReactElement } from 'react';

import { ApiWithTextInput } from './utils';
import { SupportButton } from './utils/SupportButton/SupportButton';

const AppEntityCapability = (): React.ReactElement =>
  SupportButton({
    name: 'appEntityCapability',
    module: 'AppEntity Capability',
    isSupported: appEntity.isSupported(),
  });

interface AppEntityParams {
  threadId: string;
  categories: string[];
}

const SelectAppEntity = (): React.ReactElement =>
  ApiWithTextInput<AppEntityParams>({
    name: 'select_appEntity',
    title: 'Select AppEntity',
    onClick: {
      validateInput: ({ threadId, categories }) => {
        if (!threadId || !categories) {
          throw new Error('threadId and categories are required');
        }
        if (typeof threadId !== 'string') {
          throw new Error('threadId has to be a string');
        }
        if (!Array.isArray(categories) || categories.some(x => typeof x !== 'string')) {
          throw new Error('categories has to be a string array');
        }
      },
      submit: appEntityParams => {
        return new Promise(resolve => {
          const callback = (error?: SdkError, entity?: appEntity.AppEntity): void => {
            if (entity) {
              resolve(JSON.stringify(entity));
            } else {
              resolve(JSON.stringify(error));
            }
          };
          app.getContext().then(context => {
            appEntity.selectAppEntity(
              appEntityParams.threadId,
              appEntityParams.categories,
              context.page.subPageId ?? '',
              callback,
            );
          });
        });
      },
    },
  });

const AppEntityAPIs = (): ReactElement => (
  <>
    <h1>appEntity</h1>
    <AppEntityCapability />
    <SelectAppEntity />
  </>
);

export default AppEntityAPIs;