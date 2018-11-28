import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      isMobile: false
    },
    customColor: {
      logoBgColor: Cookies.getJSON('customColor')?Cookies.getJSON('customColor').logoBgColor:'#3B93FF',
      logoTextColor: Cookies.getJSON('customColor')?Cookies.getJSON('customColor').logoTextColor:'#FFFFFF',
      navbarBgColor: Cookies.getJSON('customColor')?Cookies.getJSON('customColor').navbarBgColor:'#FFFFFF',
      navbarTextColor: Cookies.getJSON('customColor')?Cookies.getJSON('customColor').navbarTextColor:'',
      navbarAcTextColor: Cookies.getJSON('customColor')?Cookies.getJSON('customColor').navbarAcTextColor:'',
      sidebarBgColor: Cookies.getJSON('customColor')?Cookies.getJSON('customColor').sidebarBgColor:'#1C2B36',
      sidebarTextColor: Cookies.getJSON('customColor')?Cookies.getJSON('customColor').sidebarTextColor:'#BFCBD9',
      sidebarAcTextColor: Cookies.getJSON('customColor')?Cookies.getJSON('customColor').sidebarAcTextColor:'#3B93FF'
    },
    visitedViews: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1, {expires: 365})
      } else {
        Cookies.set('sidebarStatus', 0, {expires: 365})
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    TOGGLE_ISMOBILE: (state, config) => {
      state.sidebar.isMobile = config
    },
    SET_CUSTOMCOLOR: (state,config) => {
      state.customColor = config
      Cookies.set('customColor', config,  {expires: 365})
    }
  },
  actions: {
    ToggleSideBar({commit}) {
      commit('TOGGLE_SIDEBAR')
    },
    ToggleIsMobile({commit}, config) {
      commit("TOGGLE_ISMOBILE", config)
    },
    SetCustomColor({commit}, config) {
      commit('SET_CUSTOMCOLOR', config)
    }
  }
}

export default app
