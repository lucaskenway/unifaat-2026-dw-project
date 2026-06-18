import { createJob } from '../../utils/job.js'
import { sleep } from '../../utils/sleep.js'

export default createJob({
    name: 'SlowHttpJob',
    handle: async (payload) => {
        await sleep(5)
        console.log('SlowHttpJob concluído após 5 segundos.')
    }
})
