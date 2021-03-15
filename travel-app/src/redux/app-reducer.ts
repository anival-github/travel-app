const TEST_VARIABLE = 'travel-app/app/TEST_VARIABLE';

const InitialState = {
  test: 'testData',
};

type InitialStateType = typeof InitialState;

type ActionsType = TestActionCreatorType;

const appReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case TEST_VARIABLE:
      return {
        ...state,
        test: action.test,
      };
    default:
      return state;
  }
};

type TestActionCreatorType = {
  type: typeof TEST_VARIABLE,
  test: string,
};

export const testActionCreator = (): TestActionCreatorType => ({
  type: TEST_VARIABLE,
  test: 'newTestData',
});

export default appReducer;
