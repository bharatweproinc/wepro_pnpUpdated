import { Chip, Stack } from '@mui/material'
import React from 'react'
import { RenderStatusColor } from '../Task/Components/RederStatusColor'

export default  function RenderStatusChip({data,id}) {

    const filteredTask = data.filter((item)=>item.project_id ==id)
    const pauseCount = filteredTask?.filter((item)=>item.status ==='pause')
    const newCount = filteredTask?.filter((item)=>item.status ==='new');
    const StartedCount = filteredTask?.filter((item)=>item.status ==='started');
    const CompleteCount = filteredTask?.filter((item)=>item.status ==='complete');

    const newStatus = `new (${newCount.length})`
    const StartStatus = `Started (${StartedCount.length})`
    const PauseStatus = `Pause (${pauseCount.length})`
    const CompleteStatus = `Complete (${CompleteCount.length})`
  return (
    <div>
            <Stack direction="row" spacing={1}>
                <Chip label={newStatus} sx={{ backgroundColor:RenderStatusColor('new'),color:'white' }} />
                <Chip label={StartStatus} sx={{ backgroundColor:RenderStatusColor('started') ,color:'white'}} />
                <Chip label={PauseStatus} sx={{ backgroundColor:RenderStatusColor('pause') ,color:'white'}}  />
                <Chip label={CompleteStatus} sx={{ backgroundColor:RenderStatusColor('complete'),color:'white' }}  />
            </Stack>
    </div>
  )
}
