const localState = localStorage.getItem('state')
let initialState
if (localState) {
  const state = JSON.parse(localState)
  if (state.dateStart) {
    initialState = {
      timeSpendTimer: new Date().getTime() - new Date(state.dateStart).getTime(),
      dateStart: new Date(state.dateStart),
      textFieldName: state.textFieldName,
      tabContainerValue: state.tabContainerValue,
      isRunData: true,
      isButtonState: state.isButtonState,
      isModalOpen: false,
      taskPage: state.taskPage,
      tasks: state.tasks,
      task: state.task,
    }
  } else {
    initialState = {
      timeSpendTimer: 0,
      dateStart: false,
      textFieldName: state.textFieldName,
      tabContainerValue: state.tabContainerValue,
      isRunData: false,
      isButtonState: state.isButtonState,
      isModalOpen: false,
      taskPage: state.taskPage,
      tasks: state.tasks,
      task: state.task,
    }
  }
} else {
  initialState = {
    timeSpendTimer: 0,
    dateStart: false,
    isRunData: false,
    textFieldName: '',
    tabContainerValue: 0,
    isModalOpen: false,
    isButtonState: true,
    taskPage: 1,
    task: false,
    tasks: [{
      id: 1,
      taskName: 'lorem ipsum d...',
      timeStart: new Date(2019, 0, 1, 7, 28, 14),
      timeEnd: new Date(2019, 0, 1, 8, 31, 23),
      timeSpend: new Date(2019, 0, 1, 8, 31, 23).getTime() - new Date(2019, 0, 1, 7, 28, 14).getTime(),
    },
    {
      id: 2,
      taskName: 'long task',
      timeStart: new Date(2019, 0, 1, 8, 51, 57),
      timeEnd: new Date(2019, 0, 1, 10, 53, 38),
      timeSpend: new Date(2019, 0, 1, 10, 53, 38).getTime() - new Date(2019, 0, 1, 8, 51, 57).getTime(),
    },
    {
      id: 3,
      taskName: 'some new',
      timeStart: new Date(2019, 0, 1, 12, 39, 51),
      timeEnd: new Date(2019, 0, 1, 12, 46, 19),
      timeSpend: new Date(2019, 0, 1, 12, 46, 19).getTime() - new Date(2019, 0, 1, 12, 39, 51).getTime(),
    },
    {
      id: 4,
      taskName: 'last one task',
      timeStart: new Date(2019, 0, 1, 13, 50, 20),
      timeEnd: new Date(2019, 0, 1, 14, 20, 53),
      timeSpend: new Date(2019, 0, 1, 14, 20, 53).getTime() - new Date(2019, 0, 1, 13, 50, 20).getTime(),
    }],
  }
}

export default initialState
