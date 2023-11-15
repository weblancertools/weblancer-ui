import {
  ContextMap,
  IContextInfo,
  ILocalContextAction,
  ILocalContextRootState,
  LocalContextService,
} from './types';
import { Weblancer } from '@weblancer-ui/manager-registry';
import {
  IManagerWithStore,
  IStoreManagerActions,
  StoreManager,
} from '@weblancer-ui/store-manager';
import localContextSlice, {
  addContextToItem,
  removeContextFromItem,
  setInitialValue,
} from './slice/localContextSlice';
import { inject, injectable } from 'inversify';
import { importManager } from '@weblancer-ui/utils';

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
    @inject(StoreManager) private readonly storeManager: IStoreManagerActions
  ) {
    super();

    this.injectSlice(storeManager);
  }

  getItemContextIds(itemId: string): string[] {
    return this.storeManager.getState<ILocalContextRootState>()[
      LocalContextService
    ].itemContextMap[itemId];
  }

  addContextToItem(itemId: string, contextKey: string): void {
    this.storeManager.dispatch(addContextToItem({ itemId, contextKey }));
  }

  removeContextFromItem(itemId: string, contextKey: string): void {
    this.storeManager.dispatch(removeContextFromItem({ itemId, contextKey }));
  }

  getContextByKey<TValue = unknown>(contextKey: string): IContextInfo<TValue> {
    return this.contextMap[contextKey] as IContextInfo<TValue>;
  }

  updateContextInitialValue(contextKey: string, initialValue: unknown): void {
    this.storeManager.dispatch(setInitialValue({ contextKey, initialValue }));
  }

  register<TValue>(context: IContextInfo<TValue>): void {
    this.contextMap[context.key] = context;
    this.updateContextInitialValue(context.key, context.defaultValue);
  }

  public static register<TValue>(context: IContextInfo<TValue>) {
    const localContext =
      Weblancer.getManagerInstance<ILocalContextAction>(LocalContext);

    localContext.register<TValue>(context);
  }
}
