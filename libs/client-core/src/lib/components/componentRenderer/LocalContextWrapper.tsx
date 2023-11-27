import { useWeblancerManager } from '@weblancer-ui/editor-core';
import { IItemContext } from '@weblancer-ui/local-context';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { useWeblancerCommonManager } from '@weblancer-ui/tool-kit';
import { PropTypes } from '@weblancer-ui/types';
import { PropsWithChildren } from 'react';

interface ILocalContextWrapperProps extends PropsWithChildren {
  itemId: string;
}

export const LocalContextWrapper = ({
  itemId,
  children,
}: ILocalContextWrapperProps) => {
  const propManager = useWeblancerManager<IPropManagerActions>(PropManager);

  const localContexts =
    propManager.defineComponentProp<IItemContext[]>(itemId, {
      name: 'localContexts',
      typeInfo: {
        typeName: PropTypes.LocalContext,
      },
    }) ?? [];

  return (
    <RenderWrapper localContexts={localContexts}>{children}</RenderWrapper>
  );
};

const RenderWrapper = ({
  localContexts,
  children,
}: { localContexts: IItemContext[] } & PropsWithChildren) => {
  const { localContextManager } = useWeblancerCommonManager();

  if (!localContexts.length) {
    return children;
  }

  const localContextInfo = localContextManager.getContextByKey(
    localContexts[0].contextKey
  );

  const initialValue = localContexts[0].initialValue;

  const WrapperComponent = localContextInfo.Provider;

  return (
    <WrapperComponent
      initialValue={initialValue ?? localContextInfo.defaultValue}
    >
      <RenderWrapper localContexts={localContexts.slice(1)}>
        {children}
      </RenderWrapper>
    </WrapperComponent>
  );
};
