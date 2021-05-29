export const ls = {

  // function to add tasks to local storage
  addToLocalStorage: function (name, item) {
    // convert the array to string and store it.
    window.localStorage.setItem(name, JSON.stringify(item));
  },


  // function to retrieve data from storage
  getFromLocalStorage: function (name) {
    const storage = window.localStorage.getItem(name);
    // if storage exists
    return (storage !== null) ? JSON.parse(storage) : [];
  }
}