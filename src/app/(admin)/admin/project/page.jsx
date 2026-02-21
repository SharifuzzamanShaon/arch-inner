 "use client";

import React, { useState } from 'react'
import ProjectComponent from './_components/ProjectComponent'
import ProjectListByCategory from './_components/ProjectListByCategory'

const Page = () => {
  const [editingProject, setEditingProject] = useState(null)

  return (
    <>
      <ProjectComponent
        editingProject={editingProject}
        clearEditing={() => setEditingProject(null)}
      />
      <ProjectListByCategory
        onEdit={(project) => setEditingProject(project)}
      />
    </>
  )
}

export default Page