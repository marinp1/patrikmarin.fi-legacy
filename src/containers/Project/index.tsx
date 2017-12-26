import React from 'react'
import { getRouteProps } from 'react-static'
//
import { IEntry } from '../../interface/projectInterface'

const ProjectComponent: React.SFC<{project: IEntry}> = ({ project }) => (
  <div>
    {project.title}
  </div>
)

export default getRouteProps(({ project }) => (
  <ProjectComponent project={project.entry as IEntry}/>
))
