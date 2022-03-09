const state = {
  user: {
    username: '', 
    fullname: '', 
    email: '', 
    role: '', 
    token: '',
    authenticated: ''
  },
  dashboard: {
    viewRows: []
  },
  viewArr: ['layout', 'others', 'schematic'],
  projectInfo: {
    projects: [],
    libs: [],
    cells: [],
    projectData: []
  }
};

export default state;