import SlowHttpJob from "../../Jobs/SlowHttpJob.js";

export default async function SlowHttpController(request, response) {

    await SlowHttpJob.dispatch('executar-job')

    return response.status(200).json({
        response: "ok"
    });

}
