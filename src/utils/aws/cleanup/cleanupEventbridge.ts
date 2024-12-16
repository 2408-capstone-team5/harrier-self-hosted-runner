import {
  SchedulerClient,
  ListSchedulesCommand,
  DeleteScheduleCommand,
  ScheduleSummary,
} from "@aws-sdk/client-scheduler";
import { configHarrier } from "../../../config/configHarrier";

const client = new SchedulerClient({ region: configHarrier.region });

const getScheduleByNamePrefix = async (prefix: string) => {
  try {
    const command = new ListSchedulesCommand({});
    const response = await client.send(command);

    const harrierSchedules = (response.Schedules || []).filter((schedule) =>
      schedule.Name?.startsWith(prefix)
    );

    return harrierSchedules;
  } catch (error) {
    console.error("❌ Error: ", error, "\n");
    throw new Error("❌ Error finding Harrier Eventbridge schedules!");
  }
};

const deleteSchedules = async (schedules: ScheduleSummary[]) => {
  try {
    for (const schedule of schedules) {
      const scheduleName = schedule.Name;
      console.log("   Deleting schedule: ", scheduleName);

      const deleteParams = { Name: scheduleName };
      const deleteCommand = new DeleteScheduleCommand(deleteParams);
      await client.send(deleteCommand);
      console.log("   Successfully deleted schedule: ", scheduleName);
    }
  } catch (error) {
    console.error(
      "❌ Error deleting Harrier Eventbridge schedules!: ",
      error,
      "\n"
    );
  }
};

export const cleanupEventbridge = async () => {
  try {
    console.log("** Start Eventbridge Schedule cleanup");

    // Step 1: Find all Harrier Eventbridge schedules
    const harrierSchedules = await getScheduleByNamePrefix("harrier");

    if (harrierSchedules.length === 0) {
      console.log("   No schedules to delete.");
    } else {
      //Step 2: Delete all Harrier Eventbridge schedules
      await deleteSchedules(harrierSchedules);
    }

    console.log("✅ Successfully completed Eventbridge Schedule cleanup.\n");
  } catch (error) {
    console.error("❌ Error cleaning up Eventbridge Schedules: ", error, "\n");
  }
};
