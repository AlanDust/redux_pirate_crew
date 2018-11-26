const { createStore } = Redux;

const initialState = {
  pirates: [
    {
      id: 1,
      name: 'Pirate',
    },
    {
      id: 2,
      name: 'Fake Pirate',
    }
  ]
}

const pirateReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PIRATE:
      const newPirateArray = state.pirates.concat(action.newPirate)
      return Object.assign({}, state, {
        pirates: newPirateArray
      })
    case DELETE_PIRATE:
      const filteredPirates = state.pirates.filter(function(pirate) {
        return pirate.id !== parseInt(action.deletedPirateId)
      })
      return Object.assign({}, state, {
        pirates: filteredPirates
      })
    default:
      return state;
  }
}

const newPirateForm = document.getElementById('new-pirate-form')

const createNextId = () => {
  if(store.getState().pirates.length === 0) {
    return 1
  } else {
    const currentPirates = store.getState().pirates
    const pirateIds = []
    currentPirates.forEach(function(pirate) { pirateIds.push(pirate.id) })
    return Math.max(...pirateIds) + 1
  }
}

const ADD_PIRATE = 'ADD_PIRATE'
const addPirateToList = newPirate => {
  return {
    type: ADD_PIRATE,
    newPirate: newPirate
  }
}

newPirateForm.addEventListener('submit', () => {
  event.preventDefault();
  const pirateName = document.getElementById('name').value
  document.getElementById('name').value = ''
  const newPirate = { id: createNextId(), name: pirateName }
  store.dispatch(addPirateToList(newPirate))
})

const deleteButton = document.getElementById('walk-the-plank')

const DELETE_PIRATE = 'DELETE_PIRATE'

const deletePirateFromList = deletedPirateId => {
  return {
    type: DELETE_PIRATE,
    deletedPirateId: deletedPirateId
  }
}

deleteButton.addEventListener('click', function() {
  store.dispatch(deletePirateFromList(store.getState().pirates[0].id))
})

const store = createStore(pirateReducer);

const pirateList = document.getElementById('current-crew')

const render = () => {
  let newPirateList = ''
  console.log(store.getState().pirates);
  store.getState().pirates.forEach(function(pirate) {
    newPirateList += `<li>${pirate.name}</li>`
  })
  pirateList.innerHTML = newPirateList
}

render();
store.subscribe(render);
