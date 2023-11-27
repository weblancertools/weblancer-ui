import {
  ContextMap,
  IContextInfo,
  IItemContext,
  ILocalContextAction,
  ILocalContextRootState,
  LocalContextProp,
  LocalContextService,
} from './types';
import { Weblancer } from '@weblancer-ui/manager-registry';
import {
  IManagerWithStore,
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import localContextSlice from './slice/localContextSlice';
import { inject, injectable } from 'inversify';
import { importManager } from '@weblancer-ui/utils';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';

@injectable()
@importManager([StoreManager])
export class LocalContext
  extends IManagerWithStore
  implements ILocalContextAction
{
  public sliceReducer = localContextSlice;
  public name = LocalContextService;
  private contextMap: ContextMap = {};

  constructor(
    @inject(StoreManager) private readonly storeManager: IStoreManagerActions,
    @inject(PropManager) private readonly propManager: IPropManagerActions
  ) {
    super();

    this.injectSlice(storeManager);
  }

  getItemContextIds(itemId: string): string[] {
    return (
      this.propManager.getComponentProp<string[]>(itemId, LocalContextProp)
        .value ?? []
    );
  }

  addContextToItem(itemId: string, contextKey: string): void {
    const currentLocalContexts = this.propManager.getComponentProp<
      IItemContext[]
    >(itemId, LocalContextProp);

    this.propManager.updateComponentProp<IItemContext[]>(
      itemId,
      LocalContextProp,
      [
        ...(currentLocalContexts.value ?? []),
        {
          contextKey,
          initialValue: this.contextMap[contextKey].defaultValue,
        },
      ],
      true
    );
  }

  removeContextFromItem(itemId: string, contextKey: string): void {
    const currentLocalContexts = this.propManager.getComponentProp<
      IItemContext[]
    >(itemId, LocalContextProp);

    const index = (currentLocalContexts.value ?? []).findIndex(
      (c) => c.contextKey === contextKey
    );

    if (index < 0) return;

    this.propManager.updateComponentProp(
      itemId,
      LocalContextProp,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      currentLocalContexts.value!.splice(index, 1),
      true
    );
  }

  getContextByKey<TValue = unknown>(contextKey: string): IContextInfo<TValue> {
    return this.contextMap[contextKey] as IContextInfo<TValue>;
  }

  getItemContextInitialValue(itemId: string, contextKey: string): unknown {
    return this.storeManager.getState<ILocalContextRootState>()[
      LocalContextService
    ].initialValues[itemId];
  }

  updateItemContextInitialValue(
    itemId: string,
    contextKey: string,
    initialValue: unknown
  ): void {
    const currentLocalContexts = this.propManager.getComponentProp<
      IItemContext[]
    >(itemId, LocalContextProp);

    const targetContext = (currentLocalContexts.value ?? []).find(
      (c) => c.contextKey === contextKey
    );

    if (!targetContext) return;

    targetContext.initialValue = initialValue;

    this.propManager.updateComponentProp(
      itemId,
      LocalContextProp,
      [...(currentLocalContexts.value ?? [])],
      true
    );
  }

  register<TValue>(context: IContextInfo<TValue>): void {
    this.contextMap[context.key] = context;
  }

  public static register<TValue>(context: IContextInfo<TValue>) {
    const localContext =
      Weblancer.getManagerInstance<ILocalContextAction>(LocalContext);

    localContext.register<TValue>(context);
  }
}
