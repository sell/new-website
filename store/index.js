export const state = () => {
  return {
    theme: null,
  };
};

// getters
export const getters = {
  getTheme() {
    return state.theme;
  },
};

// actions
export const actions = {
  changeTheme({ commit }, theme) {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('theme', theme);
    commit('changeTheme', theme);
    return theme;
  },
};

// mutations
export const mutations = {
  changeTheme(state, theme) {
    state.theme = theme;
    localStorage.setItem('theme', theme);
    console.log(`----- Theme Changed to ${theme} -----`);
  },
};
