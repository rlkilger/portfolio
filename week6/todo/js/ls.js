export const ls = {

  // function to add tasks to local storage
  addToLocalStorage: function (toDoList) {
    // convert the array to string and store it.
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  },


  // function to retrieve data from storage
  getFromLocalStorage: function (toDoList) {
    const storage = localStorage.getItem('toDoList');
    // if storage exists
    if (storage) {
      // converts back to array and store it in toDoList array
      toDoList = JSON.parse(storage);
    }
  }
}