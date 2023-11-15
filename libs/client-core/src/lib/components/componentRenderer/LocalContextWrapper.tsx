import {
  LocalContextService,
  useLocalContextSelector,
} from '@weblancer-ui/local-context';
import { useWeblancerCommonManager } from '@weblancer-ui/tool-kit';
import { PropsWithChildren } from 'react';

interface ILocalContextWrapperProps extends PropsWithChildren {
  itemId: string;
}

export const LocalContextWrapper = ({
  itemId,
  children,
}: ILocalContextWrapperProps) => {
  const localContexts: string[] =
    useLocalContextSelector(
      (state) => state[LocalContextService].itemContextMap[itemId]
    ) ?? [];

  return (
    <RenderWrapper localContexts={localContexts}>{children}</RenderWrapper>
  );
};

const RenderWrapper = ({
  localContexts,
  children,
}: { localContexts: string[] } & PropsWithChildren) => {
  const { localContextManager } = useWeblancerCommonManager();

  const localContextInfo = localContextManager.getContextByKey(
    localContexts[0]
  );

  const initialValue = useLocalContextSelector(
    (state) => state[LocalContextService].initialValues[localContextInfo.key]
  );

  if (!localContexts.length) {
    return children;
  }
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
