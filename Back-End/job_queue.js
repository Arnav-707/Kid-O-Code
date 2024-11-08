const Queue = require("bull");

const Job = require("./schema/jobs");
const { executeCpp } = require("./executor/cpp");
const { executePy } = require("./executor/python");

const jobQueue = new Queue("job-runner-queue",{
  redis:{host:"rph",password:"eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81",port:6379}
});
const NUM_WORKERS = 5;

jobQueue.process(NUM_WORKERS, async ({ data }) => {
  const jobId = data.id;
  // console.log(jobId);
  const job = await Job.findById(jobId);
  if (job === undefined) {
    throw Error(`cannot find Job with id ${jobId}`);
  }
  try {
    let output;
    job["startedAt"] = new Date();
    if (job.language === "cpp") {
      output = await executeCpp(job.filepath);
    } else if (job.language === "python") {
    output = await executePy(job.filepath);
    }
    job["completedAt"] = new Date();
    job["output"] = output;
    job["status"] = "success";
    await job.save();
    console.log(output);
    return true;
  } catch (err) {
    job["completedAt"] = new Date();
    job["output"] = JSON.stringify(err);
    job["status"] = "error";
    await job.save();
    throw Error(JSON.stringify(err));
  }
});

jobQueue.on("failed", (error) => {
  console.error(error.data.id, error.failedReason);
});
jobQueue.on("completed", (data) => {
  console.log(data);
});
const addJobToQueue = async (jobId) => {
  await jobQueue.add({
    id: jobId,
  })
  return true; 
};
module.exports = {
  addJobToQueue,
};
