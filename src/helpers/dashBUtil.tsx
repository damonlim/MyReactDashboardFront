
// Active Dashboard Shape
export interface CellDataShape {
  type: string;
  Lib: string;
  Cell: string;
  View: string;
  Revision: number;
  User: string;
  CO_Date: string;
  CO_Duration: number;
  Prev_CI: string;
  Prev_User: string;
}

// Project Shape
export interface ProjectShape {
  project: string;
  Lib: string;
  Cell: string;
  View: string;
  Assignee: string;
  User: string;
  Version: number;
  ERC: string;
  DRC: string;
  LVS: string;
  ANT: string;
  PILLS: string;
  LPE: string;
  EMIR: string;
  SHE: string;
  AGING: string;
}

// Json Aggregate return result object. eg: {_id: 'GT_GOBY7_MINI_TC_V1P2'}
export interface ObjectWithId {
  _id: string;
}


export const getActiveDashboardState = (data:CellDataShape[]) => {

  if (data) {

    let rows = [];

    for (const item of data) {    
      // Compile the rows state
      rows.push({
        "type": item.type,
        "Lib": item.Lib,
        "Cell": item.Cell,
        "View": item.View,
        "Revision": item.Revision,
        "User": item.User,
        "CO_Date": item.CO_Date,
        "CO_Duration": item.CO_Duration,
        "Prev_CI": item.Prev_CI,
        "Prev_User": item.Prev_User
      });
    }

    return rows;
  }
}

/**
 * Return object like this:
 * {
 *  'Schematic': [{view:'...', cell:'...', ...}, {...}]
 *  'Layout': [{view:'...', cell:'...', ...}, {...}]
 * }
 * @param viewArr 
 * @param rows 
 * @returns 
 */
export const compileActiveDbViewRows = (viewArr: string[], rows: CellDataShape[]) => {
  let viewRows:any = {};

  viewArr.map( viewValue => {
    let rowItem = rows.filter((item) => {
      return item.type === viewValue;
    })
    viewRows[viewValue] = rowItem;
  })

  return viewRows;
}

/**
 * Return aggregated projects from DB which is in the form of array of ObjectWithId
 * @param projects 
 * @returns 
 */
export const extractProjectsFromId = (projects: ObjectWithId[]) => {
  let projectArray: string[] = [];

  projects.forEach((project)=>{
    projectArray.push(project._id);
  });

  return projectArray;
}

/**
 * Extract Unique Library string array from array of projects
 * @param projects 
 * @returns 
 */
export const extractLibFromResult = (projects: ProjectShape[]) => {
  let libSet = new Set<string>();

  projects.forEach((project)=>{
    libSet.add(project.Lib);
  });

  return Array.from(libSet);
}

/**
 * Extract Unique Cell string array from array of projects
 * @param projects
 * @returns 
 */
export const extractCellFromResult = (projects: ProjectShape[]) => {
  let cellSet = new Set<string>();

  projects.forEach((project)=>{
    cellSet.add(project.Cell);
  });

  return Array.from(cellSet);
}