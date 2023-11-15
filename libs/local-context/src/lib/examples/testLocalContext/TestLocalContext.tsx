import { createContext, useContext, useEffect, useState } from 'react';
import { IProviderProps } from '../../types';
import { LocalContext } from '../../local-context';
import { PropTypes } from '@weblancer-ui/types';

// Define interface of context value
interface ITestContext {
  test: string;
}

// Define default value for context
const defaultValue: ITestContext = {
  test: 'test',
};

// Define context
const TestContext = createContext<ITestContext>(defaultValue);

// Define context provider
// Also you can add any custom logics to this provider
// Also you can use different type for initialValue provided from editor
export const TestLocalContextProvider = ({
  initialValue: editorValue,
  children,
}: IProviderProps<ITestContext>) => {
  const [initialValue, setInitialValue] = useState(editorValue);

  // Only in editor
  useEffect(() => {
    setInitialValue(editorValue);
  }, [editorValue]);

  return (
    <TestContext.Provider value={initialValue}>{children}</TestContext.Provider>
  );
};

// Define context usage function
export const useTestContext = () => useContext(TestContext);

// Register it to the Weblancer local context
// Put this registration on the plugin definition file or importer of your module
LocalContext.register({
  Provider: TestLocalContextProvider,
  key: 'test-context',
  label: 'Test Context',
  defaultValue: {
    test: 'test',
  },
  typeInfo: {
    typeName: PropTypes.Object,
    isRequired: true,
    properties: {
      test: {
        typeName: PropTypes.String,
        defaultValue: 'test',
        isRequired: true,
      },
    },
  },
});
