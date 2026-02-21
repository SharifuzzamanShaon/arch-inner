import React from 'react'
import ProjectDetailsHero from '../_components/ProjectDetailsHero';
import ProjectGallery from '../_components/ProjectGallery';
import ShowcaseProject from '@/app/_components/ShowcaseProject';

const page = async ({params}) => {
    const {id} = await params
    return (
    <>
   <ProjectDetailsHero/>
   <ProjectGallery/>
   <ShowcaseProject/>
    </>
  )
}

export default page